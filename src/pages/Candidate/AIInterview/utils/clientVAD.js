import { TURN_MANAGER_CONFIG } from "../config/turnManagerConfig.js";

/**
 * Lightweight Browser-side Voice Activity Detector (VAD)
 * Analyzes audio energy from microphone stream using Web Audio API
 */
export class ClientVAD {
  constructor(options = {}) {
    this.rmsThreshold = options.rmsThreshold || TURN_MANAGER_CONFIG.VAD_NOISE_FLOOR_RMS;
    this.debounceMs = options.debounceMs || TURN_MANAGER_CONFIG.VAD_DEBOUNCE_MS;
    this.onSpeechStart = options.onSpeechStart || (() => {});
    this.onSpeechStop = options.onSpeechStop || (() => {});
    this.onAudioLevel = options.onAudioLevel || null;

    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.javascriptNode = null;
    this.animFrameId = null;

    this.speaking = false;
    this.speechStartTime = null;
    this.silenceStartTime = null;
    this.debounceTimer = null;
    this.isListening = false;
  }

  /**
   * Start VAD monitoring on a MediaStream
   * @param {MediaStream} stream 
   */
  start(stream) {
    if (!stream || !stream.getAudioTracks().length) {
      console.warn("[ClientVAD] Cannot start VAD: No active audio track found in stream.");
      return;
    }

    try {
      this.stop(); // Clean up any existing instances

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("[ClientVAD] Web Audio API is not supported in this browser.");
        return;
      }

      this.audioContext = new AudioContextClass();

      // Ensure AudioContext is running
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.4;

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      this.isListening = true;
      this._monitorAudio();

      console.log("[ClientVAD] Voice Activity Detector started successfully.");
    } catch (err) {
      console.error("[ClientVAD] Failed to initialize AudioContext / Analyser:", err);
    }
  }

  /**
   * Internal loop to calculate RMS and evaluate speech state
   */
  _monitorAudio() {
    if (!this.isListening || !this.analyser) return;

    const bufferLength = this.analyser.fftSize;
    const timeData = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(timeData);

    // Compute Root Mean Square (RMS) audio energy
    let sumSquares = 0;
    for (let i = 0; i < timeData.length; i++) {
      sumSquares += timeData[i] * timeData[i];
    }
    const rms = Math.sqrt(sumSquares / timeData.length);

    if (typeof this.onAudioLevel === "function") {
      this.onAudioLevel(rms);
    }

    const speechActive = rms >= this.rmsThreshold;
    const now = Date.now();

    if (speechActive) {
      this.silenceStartTime = null;
      if (!this.speaking) {
        if (!this.debounceTimer) {
          this.debounceTimer = setTimeout(() => {
            this.speaking = true;
            this.speechStartTime = now;
            this.debounceTimer = null;
            console.log("[ClientVAD] Speech started");
            this.onSpeechStart({ timestamp: now, rms });
          }, this.debounceMs);
        }
      } else {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
      }
    } else {
      if (this.speaking) {
        if (!this.silenceStartTime) {
          this.silenceStartTime = now;
        }
        if (!this.debounceTimer) {
          this.debounceTimer = setTimeout(() => {
            this.speaking = false;
            const silenceDuration = Date.now() - (this.silenceStartTime || now);
            this.debounceTimer = null;
            console.log(`[ClientVAD] Speech stopped (Silence duration: ${silenceDuration}ms)`);
            this.onSpeechStop({ timestamp: now, silenceDuration });
          }, this.debounceMs);
        }
      } else {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
      }
    }

    this.animFrameId = requestAnimationFrame(() => this._monitorAudio());
  }

  /**
   * Stop VAD monitoring
   */
  stop() {
    this.isListening = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    if (this.microphone) {
      try { this.microphone.disconnect(); } catch (_) {}
      this.microphone = null;
    }
    if (this.analyser) {
      try { this.analyser.disconnect(); } catch (_) {}
      this.analyser = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (_) {}
      this.audioContext = null;
    }
    this.speaking = false;
    this.speechStartTime = null;
    this.silenceStartTime = null;
  }

  destroy() {
    this.stop();
    this.onSpeechStart = () => {};
    this.onSpeechStop = () => {};
    this.onAudioLevel = null;
  }

  isSpeaking() {
    return this.speaking;
  }
}

export default ClientVAD;
