/**
 * Centralized Configuration & Constants for VAD + Turn Manager
 */
export const TURN_MANAGER_CONFIG = {
  // Pause duration thresholds (in ms)
  SHORT_PAUSE_MS: 1000,
  MEDIUM_PAUSE_MS: 2500,
  END_OF_TURN_SILENCE_MS: 2500,

  // Extra grace period added to silence timeout when a transcript ends with an incomplete word/phrase
  INCOMPLETE_HEURISTIC_EXTRA_MS: 1500,

  // Maximum allowed silence before forced turn completion (hard upper limit)
  MAX_SILENCE_BEFORE_FORCE_COMPLETE_MS: 5000,

  // Voice Activity Detection (VAD) audio parameters
  VAD_NOISE_FLOOR_RMS: 0.015,
  VAD_DEBOUNCE_MS: 200,

  // List of trailing words/phrases indicating candidate's thought is likely incomplete
  INCOMPLETE_TRAILING_WORDS: [
    "because",
    "and",
    "but",
    "so",
    "which",
    "that",
    "when",
    "if",
    "such as",
    "for example",
    "to",
    "or",
    "like",
    "with",
    "because of",
    "as well as",
    "in order to",
    "since",
    "although",
    "where",
  ],
};

/**
 * Candidate Speech Turn States
 */
export const TURN_STATES = {
  LISTENING: "LISTENING",
  CANDIDATE_SPEAKING: "CANDIDATE_SPEAKING",
  POSSIBLE_END_OF_TURN: "POSSIBLE_END_OF_TURN",
  TURN_COMPLETED: "TURN_COMPLETED",
  CANDIDATE_INACTIVE: "CANDIDATE_INACTIVE",
};

export default {
  TURN_MANAGER_CONFIG,
  TURN_STATES,
};
