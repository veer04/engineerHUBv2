import { TURN_MANAGER_CONFIG, TURN_STATES } from "../config/turnManagerConfig.js";

/**
 * Sanitizes transcript text to prevent exact duplicate sentence blocks
 */
export function sanitizeTranscriptText(text) {
  if (!text || !text.trim()) return "";
  const trimmed = text.trim();

  // Detect and resolve exact duplicated half strings e.g. "Text Text"
  const len = trimmed.length;
  if (len >= 10) {
    const halfLen = Math.floor(len / 2);
    for (let offset = -3; offset <= 3; offset++) {
      const idx = halfLen + offset;
      if (idx > 0 && idx < len) {
        const part1 = trimmed.slice(0, idx).trim();
        const part2 = trimmed.slice(idx).trim();
        if (part1 && part2 && part1.toLowerCase() === part2.toLowerCase()) {
          return part1;
        }
      }
    }
  }

  return trimmed;
}

/**
 * Candidate Turn Manager
 * Manages speech turn lifecycle, pause detection, incompleteness heuristics,
 * candidate resumption after pauses, and turn completion emission.
 */
export class TurnManager {
  constructor(options = {}) {
    this.config = { ...TURN_MANAGER_CONFIG, ...options.config };

    this.onStateChange = options.onStateChange || (() => {});
    this.onSpeechStart = options.onSpeechStart || (() => {});
    this.onSpeechStop = options.onSpeechStop || (() => {});
    this.onTurnComplete = options.onTurnComplete || (() => {});
    this.onInactivity = options.onInactivity || (() => {});

    // State & Metrics
    this.turnState = TURN_STATES.LISTENING;
    this.candidateSpeaking = false;
    this.speechStartedAt = null;
    this.lastVoiceActivityAt = null;
    this.speechStoppedAt = null;
    this.silenceDuration = 0;

    // Transcript Chunks for Current Turn
    this.completedChunks = [];
    this.activeSessionFinal = "";
    this.activeSessionInterim = "";
    this.currentTranscript = "";

    // Internal Timers & Flags
    this.silenceTimer = null;
    this.inactivityTimer = null;
    this.isTurnProcessing = false;
  }

  /**
   * Helper to update turn state and trigger listener callback
   */
  _setState(newState) {
    if (this.turnState === newState) return;
    const oldState = this.turnState;
    this.turnState = newState;
    console.log(`[TurnManager] State: ${oldState} → ${newState}`);
    this.onStateChange(newState, oldState);
  }

  /**
   * Check if transcript text appears to end with an incomplete thought indicator
   */
  checkTranscriptCompleteness(text) {
    if (!text || !text.trim()) {
      return { isLikelyIncomplete: false, trailingWord: null };
    }

    const cleanText = text.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const words = cleanText.split(/\s+/);
    if (!words.length) return { isLikelyIncomplete: false, trailingWord: null };

    const lastWord = words[words.length - 1];
    const lastTwoWords = words.length >= 2 ? `${words[words.length - 2]} ${lastWord}` : "";
    const lastThreeWords = words.length >= 3 ? `${words[words.length - 3]} ${words[words.length - 2]} ${lastWord}` : "";

    for (const phrase of this.config.INCOMPLETE_TRAILING_WORDS || []) {
      if (
        lastWord === phrase ||
        lastTwoWords === phrase ||
        lastThreeWords === phrase
      ) {
        return { isLikelyIncomplete: true, trailingWord: phrase };
      }
    }

    return { isLikelyIncomplete: false, trailingWord: null };
  }

  /**
   * Handle VAD Speech Start event
   */
  handleSpeechStart(eventData = {}) {
    const now = eventData.timestamp || Date.now();
    this.lastVoiceActivityAt = now;

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
      console.log("[TurnManager] Candidate resumed speaking - continuing current turn");
    }

    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }

    if (!this.candidateSpeaking) {
      this.candidateSpeaking = true;
      if (!this.speechStartedAt) {
        this.speechStartedAt = now;
      }
      console.log("[TurnManager] Speech started");
    }

    this._setState(TURN_STATES.CANDIDATE_SPEAKING);
    this.onSpeechStart({ timestamp: now, turnState: this.turnState });
  }

  /**
   * Save prior session transcript chunk before speech recognition restarts on speech pause
   */
  savePriorSessionText() {
    const activeText = (this.activeSessionFinal || "").trim();
    if (activeText) {
      const exists = this.completedChunks.some(
        (chunk) => chunk.toLowerCase() === activeText.toLowerCase()
      );
      if (!exists) {
        this.completedChunks.push(activeText);
      }
    }
    this.activeSessionFinal = "";
    this.activeSessionInterim = "";
  }

  /**
   * Handle VAD Speech Stop event
   */
  handleSpeechStop(eventData = {}) {
    const now = eventData.timestamp || Date.now();
    this.speechStoppedAt = now;
    this.candidateSpeaking = false;
    this.silenceDuration = eventData.silenceDuration || 0;

    console.log("[TurnManager] Speech stopped");
    this._setState(TURN_STATES.POSSIBLE_END_OF_TURN);
    this.onSpeechStop({ timestamp: now, silenceDuration: this.silenceDuration });

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    const fullText = this.getFullTranscriptText();
    const completeness = this.checkTranscriptCompleteness(fullText);

    let silenceWaitMs = this.config.END_OF_TURN_SILENCE_MS;
    if (completeness.isLikelyIncomplete) {
      silenceWaitMs += this.config.INCOMPLETE_HEURISTIC_EXTRA_MS;
      console.log(
        `[TurnManager] Transcript appears incomplete (ends with "${completeness.trailingWord}") - waiting ${silenceWaitMs}ms`
      );
    } else {
      console.log(`[TurnManager] Silence check - scheduling turn completion in ${silenceWaitMs}ms`);
    }

    this.silenceTimer = setTimeout(() => {
      this._attemptTurnCompletion();
    }, silenceWaitMs);
  }

  /**
   * Process updated transcript results (interim or final) from STT engine
   */
  handleSTTResult({ interimText = "", finalText = "" }) {
    const now = Date.now();
    this.lastVoiceActivityAt = now;

    if (finalText && finalText.trim()) {
      this.activeSessionFinal = finalText.trim();
      this.activeSessionInterim = "";
    } else if (interimText && interimText.trim()) {
      this.activeSessionInterim = interimText.trim();
    }

    this.currentTranscript = this.getFullTranscriptText();

    if (this.turnState === TURN_STATES.POSSIBLE_END_OF_TURN && (interimText || finalText)) {
      const completeness = this.checkTranscriptCompleteness(this.currentTranscript);
      if (completeness.isLikelyIncomplete && this.silenceTimer) {
        console.log(`[TurnManager] STT updated incomplete thought ("${completeness.trailingWord}") - resetting timer`);
        clearTimeout(this.silenceTimer);
        const extendedWait = this.config.END_OF_TURN_SILENCE_MS + this.config.INCOMPLETE_HEURISTIC_EXTRA_MS;
        this.silenceTimer = setTimeout(() => {
          this._attemptTurnCompletion();
        }, extendedWait);
      }
    }
  }

  /**
   * Finalize and complete candidate turn if conditions are satisfied
   */
  _attemptTurnCompletion() {
    this.silenceTimer = null;

    if (this.candidateSpeaking) {
      console.log("[TurnManager] Candidate is still speaking - postponing turn completion.");
      return;
    }

    if (this.isTurnProcessing) {
      console.warn("[TurnManager] Turn completion already in progress - ignoring duplicate call.");
      return;
    }

    if (this.activeSessionInterim && this.activeSessionInterim.trim()) {
      const trimmedInterim = this.activeSessionInterim.trim();
      if (!this.activeSessionFinal.toLowerCase().includes(trimmedInterim.toLowerCase())) {
        this.activeSessionFinal = `${this.activeSessionFinal} ${trimmedInterim}`.trim();
      }
      this.activeSessionInterim = "";
    }

    const transcriptToCommit = this.getFullTranscriptText();
    const silenceDur = this.speechStoppedAt ? Date.now() - this.speechStoppedAt : this.config.END_OF_TURN_SILENCE_MS;

    console.log(`[TurnManager] Silence duration: ${silenceDur}ms | Submitting: "${transcriptToCommit}"`);

    if (!transcriptToCommit) {
      console.log("[TurnManager] Candidate inactive - waiting");
      this._setState(TURN_STATES.CANDIDATE_INACTIVE);
      this.onInactivity();
      return;
    }

    console.log("[TurnManager] Transcript complete - completing turn and emitting answer");
    this.isTurnProcessing = true;
    this._setState(TURN_STATES.TURN_COMPLETED);

    const turnDuration = this.speechStartedAt ? Date.now() - this.speechStartedAt : 0;

    this.onTurnComplete({
      transcript: transcriptToCommit,
      turnDuration,
      silenceDuration: silenceDur,
      speechStartedAt: this.speechStartedAt,
      speechStoppedAt: this.speechStoppedAt,
    });

    this.resetTurnBuffer();
  }

  /**
   * Get combined transcript text for current turn cleanly without duplication
   */
  getFullTranscriptText() {
    const parts = [...this.completedChunks];
    if (this.activeSessionFinal && this.activeSessionFinal.trim()) {
      const finalClean = this.activeSessionFinal.trim();
      const lastPart = (parts[parts.length - 1] || "").toLowerCase();
      if (lastPart !== finalClean.toLowerCase()) {
        parts.push(finalClean);
      }
    }
    if (this.activeSessionInterim && this.activeSessionInterim.trim()) {
      const interimClean = this.activeSessionInterim.trim();
      const lastPart = (parts[parts.length - 1] || "").toLowerCase();
      if (!lastPart.includes(interimClean.toLowerCase())) {
        parts.push(interimClean);
      }
    }

    const rawCombined = parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    return sanitizeTranscriptText(rawCombined);
  }

  /**
   * Reset internal turn buffers for next turn
   */
  resetTurnBuffer() {
    this.completedChunks = [];
    this.activeSessionFinal = "";
    this.activeSessionInterim = "";
    this.currentTranscript = "";
    this.speechStartedAt = null;
    this.speechStoppedAt = null;
    this.candidateSpeaking = false;
    this.isTurnProcessing = false;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    this._setState(TURN_STATES.LISTENING);
  }

  /**
   * Force manual turn submit (e.g. candidate clicked Send button or pressed Enter)
   */
  forceSubmitTurn(manualText = "") {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    const rawText = manualText || this.getFullTranscriptText();
    const text = sanitizeTranscriptText(rawText);

    if (!text || !text.trim() || this.isTurnProcessing) return;

    this.isTurnProcessing = true;
    console.log(`[TurnManager] Manual turn submission forced: "${text.trim()}"`);
    this._setState(TURN_STATES.TURN_COMPLETED);

    this.onTurnComplete({
      transcript: text.trim(),
      isManual: true,
      turnDuration: this.speechStartedAt ? Date.now() - this.speechStartedAt : 0,
    });

    this.resetTurnBuffer();
  }

  /**
   * Destroy TurnManager and clear active timers
   */
  destroy() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    this.completedChunks = [];
    this.activeSessionFinal = "";
    this.activeSessionInterim = "";
    this.currentTranscript = "";
    this.isTurnProcessing = false;
    this.candidateSpeaking = false;
    this.onStateChange = () => {};
    this.onSpeechStart = () => {};
    this.onSpeechStop = () => {};
    this.onTurnComplete = () => {};
    this.onInactivity = () => {};
  }
}

export default TurnManager;
