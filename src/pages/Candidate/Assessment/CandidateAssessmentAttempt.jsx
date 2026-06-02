import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiHelpCircle,
  FiLifeBuoy,
  FiLogOut,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import useGlobalSnackbar from "../../../hooks/useGlobalSnackbar";
import { API_URL } from "../../../services/APIUtils";
import "./CandidateAssessmentAttempt.css";

function formatTimer(remainingSeconds) {
  const seconds = Math.max(0, remainingSeconds);
  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = seconds % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(secondsPart).padStart(2, "0")}`;
}

function getSavedLabel(savedAgoSeconds) {
  if (savedAgoSeconds <= 1) return "Saved just now";
  return `Saved ${savedAgoSeconds}s ago`;
}

function toMilliseconds(value) {
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

export default function CandidateAssessmentAttempt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { inviteToken } = useParams();
  const [searchParams] = useSearchParams();
  const startAtOverride = searchParams.get("startAt");

  const {
    setSnackbarDuration,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
  } = useGlobalSnackbar();

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responsesByQuestionId, setResponsesByQuestionId] = useState({});
  const [markedForReviewQuestionIds, setMarkedForReviewQuestionIds] = useState([]);
  const [visitedQuestionIds, setVisitedQuestionIds] = useState([]);
  const [lastSavedAtMs, setLastSavedAtMs] = useState(Date.now());
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [isSessionHydrated, setIsSessionHydrated] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);

  const submittedRoutePath = useMemo(
    () =>
      startAtOverride
        ? `/assessment/${inviteToken}/submitted?startAt=${encodeURIComponent(startAtOverride)}`
        : `/assessment/${inviteToken}/submitted`,
    [inviteToken, startAtOverride]
  );

  const bootstrapSession = location.state?.attemptSession || null;
  const attemptSessionQuery = useQuery({
    queryKey: ["candidate-assessment-attempt", inviteToken],
    enabled: Boolean(inviteToken),
    retry: 1,
    initialData: bootstrapSession
      ? { success: true, data: { autoSubmitted: false, session: bootstrapSession } }
      : undefined,
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/api/v1/candidate-assessment/${inviteToken}/attempt`
      );
      return response.data;
    },
  });

  const attemptData = attemptSessionQuery.data?.data?.session || null;

  useEffect(() => {
    if (
      attemptSessionQuery.data?.data?.autoSubmitted &&
      attemptSessionQuery.data?.data?.submissionSummary
    ) {
      navigate(submittedRoutePath, {
        replace: true,
        state: { submissionSummary: attemptSessionQuery.data.data.submissionSummary },
      });
    }
  }, [attemptSessionQuery.data, navigate, submittedRoutePath]);

  useEffect(() => {
    if (
      attemptSessionQuery.data?.data?.alreadySubmitted &&
      attemptSessionQuery.data?.data?.submissionSummary
    ) {
      navigate(submittedRoutePath, {
        replace: true,
        state: { submissionSummary: attemptSessionQuery.data.data.submissionSummary },
      });
    }
  }, [attemptSessionQuery.data, navigate, submittedRoutePath]);

  useEffect(() => {
    if (!attemptData || isSessionHydrated) return;
    setRemainingSeconds(Number(attemptData.initialRemainingSeconds || 0));
    setCurrentQuestionIndex(Number(attemptData.initialCurrentQuestionIndex || 0));
    setResponsesByQuestionId(attemptData.initialResponsesByQuestionId || {});
    setMarkedForReviewQuestionIds(attemptData.initialMarkedForReviewQuestionIds || []);
    setVisitedQuestionIds(attemptData.initialVisitedQuestionIds || []);
    setLastSavedAtMs(toMilliseconds(attemptData.initialLastSavedAtIso));
    setCurrentTimeMs(Date.now());
    setIsSessionHydrated(true);
  }, [attemptData, isSessionHydrated]);

  const questions = attemptData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.id || "";
  const answeredCount = Object.keys(responsesByQuestionId).length;
  const isCurrentQuestionMarked = markedForReviewQuestionIds.includes(currentQuestionId);
  const selectedOptionId = responsesByQuestionId[currentQuestionId] || "";
  const questionProgressPercent = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;
  const savedAgoSeconds = Math.max(0, Math.floor((currentTimeMs - lastSavedAtMs) / 1000));
  const isLastQuestion = questions.length
    ? currentQuestionIndex === questions.length - 1
    : false;

  const notify = useCallback(
    (message, severity = "info", duration = 2600) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarDuration(duration);
      setSnackbarOpen(true);
    },
    [setSnackbarDuration, setSnackbarMessage, setSnackbarOpen, setSnackbarSeverity]
  );

  const persistProgressSnapshot = useCallback(
    async (overrides = {}, options = {}) => {
      if (!inviteToken || !isSessionHydrated) return;

      const payload = {
        currentQuestionIndex:
          overrides.currentQuestionIndex !== undefined
            ? overrides.currentQuestionIndex
            : currentQuestionIndex,
        responsesByQuestionId: overrides.responsesByQuestionId || responsesByQuestionId,
        markedForReviewQuestionIds:
          overrides.markedForReviewQuestionIds || markedForReviewQuestionIds,
        visitedQuestionIds: overrides.visitedQuestionIds || visitedQuestionIds,
        lastSavedAtIso: new Date().toISOString(),
      };

      if (!options?.silent) {
        setIsSavingProgress(true);
      }

      try {
        const response = await axios.patch(
          `${API_URL}/api/v1/candidate-assessment/${inviteToken}/attempt`,
          payload
        );
        const data = response?.data?.data;
        if (data?.autoSubmitted && data?.submissionSummary) {
          navigate(submittedRoutePath, {
            replace: true,
            state: { submissionSummary: data.submissionSummary },
          });
          return;
        }
        if (data?.savedAtIso) {
          setLastSavedAtMs(toMilliseconds(data.savedAtIso));
        } else {
          setLastSavedAtMs(Date.now());
        }
        if (typeof data?.remainingSeconds === "number") {
          setRemainingSeconds(Math.max(0, data.remainingSeconds));
        }
      } catch (error) {
        if (!options?.silent) {
          notify(
            error?.response?.data?.message || "Failed to save progress. Try again.",
            "warning"
          );
        }
      } finally {
        if (!options?.silent) {
          setIsSavingProgress(false);
        }
      }
    },
    [
      currentQuestionIndex,
      inviteToken,
      isSessionHydrated,
      markedForReviewQuestionIds,
      navigate,
      notify,
      responsesByQuestionId,
      submittedRoutePath,
      visitedQuestionIds,
    ]
  );

  const submitAssessment = useCallback(
    async (source = "manual") => {
      if (!inviteToken || isSubmittingAssessment) return;
      setIsSubmittingAssessment(true);

      try {
        const response = await axios.post(
          `${API_URL}/api/v1/candidate-assessment/${inviteToken}/submit`,
          {
            source,
            currentQuestionIndex,
            responsesByQuestionId,
            markedForReviewQuestionIds,
            visitedQuestionIds,
          }
        );
        const submissionSummary = response?.data?.data?.submissionSummary;
        navigate(submittedRoutePath, {
          replace: true,
          state: { submissionSummary },
        });
      } catch (error) {
        notify(
          error?.response?.data?.message || "Failed to submit assessment. Please retry.",
          "error"
        );
        if (source === "auto") {
          setHasAutoSubmitted(false);
        }
      } finally {
        setIsSubmittingAssessment(false);
      }
    },
    [
      currentQuestionIndex,
      inviteToken,
      isSubmittingAssessment,
      markedForReviewQuestionIds,
      navigate,
      notify,
      responsesByQuestionId,
      submittedRoutePath,
      visitedQuestionIds,
    ]
  );

  useEffect(() => {
    if (!isSessionHydrated || hasAutoSubmitted) return undefined;
    const intervalId = setInterval(() => {
      setCurrentTimeMs(Date.now());
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isSessionHydrated, hasAutoSubmitted]);

  useEffect(() => {
    if (!isSessionHydrated || !currentQuestionId) return;
    if (visitedQuestionIds.includes(currentQuestionId)) return;

    const nextVisited = [...visitedQuestionIds, currentQuestionId];
    setVisitedQuestionIds(nextVisited);
    persistProgressSnapshot(
      {
        visitedQuestionIds: nextVisited,
      },
      { silent: true }
    );
  }, [currentQuestionId, isSessionHydrated, persistProgressSnapshot, visitedQuestionIds]);

  useEffect(() => {
    if (!isSessionHydrated) return;
    if (remainingSeconds === 0 && !hasAutoSubmitted) {
      setHasAutoSubmitted(true);
      submitAssessment("auto");
    }
  }, [remainingSeconds, hasAutoSubmitted, isSessionHydrated, submitAssessment]);

  const goToQuestionIndex = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= questions.length) return;

    const nextQuestionId = questions[nextIndex]?.id;
    const nextVisited = nextQuestionId
      ? visitedQuestionIds.includes(nextQuestionId)
        ? visitedQuestionIds
        : [...visitedQuestionIds, nextQuestionId]
      : visitedQuestionIds;

    setCurrentQuestionIndex(nextIndex);
    setVisitedQuestionIds(nextVisited);
    setLastSavedAtMs(Date.now());
    persistProgressSnapshot(
      {
        currentQuestionIndex: nextIndex,
        visitedQuestionIds: nextVisited,
      },
      { silent: true }
    );
  };

  const getQuestionState = (questionId, index) => {
    if (index === currentQuestionIndex) return "current";
    if (markedForReviewQuestionIds.includes(questionId)) return "review";
    if (responsesByQuestionId[questionId]) return "answered";
    if (visitedQuestionIds.includes(questionId)) return "visited";
    return "not-visited";
  };

  const handleSelectAnswer = (optionId) => {
    if (!currentQuestionId) return;
    const nextResponses = { ...responsesByQuestionId, [currentQuestionId]: optionId };
    setResponsesByQuestionId(nextResponses);
    setLastSavedAtMs(Date.now());
    persistProgressSnapshot(
      {
        responsesByQuestionId: nextResponses,
      },
      { silent: true }
    );
  };

  const handleClearResponse = () => {
    if (!currentQuestionId) return;
    const nextResponses = { ...responsesByQuestionId };
    delete nextResponses[currentQuestionId];
    setResponsesByQuestionId(nextResponses);
    setLastSavedAtMs(Date.now());
    persistProgressSnapshot({ responsesByQuestionId: nextResponses });
  };

  const handleToggleMarkForReview = () => {
    if (!currentQuestionId) return;

    const nextMarked = markedForReviewQuestionIds.includes(currentQuestionId)
      ? markedForReviewQuestionIds.filter((questionId) => questionId !== currentQuestionId)
      : [...markedForReviewQuestionIds, currentQuestionId];

    setMarkedForReviewQuestionIds(nextMarked);
    setLastSavedAtMs(Date.now());
    persistProgressSnapshot(
      {
        markedForReviewQuestionIds: nextMarked,
      },
      { silent: true }
    );
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) return;
    goToQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSaveAndNext = () => {
    setLastSavedAtMs(Date.now());
    if (isLastQuestion) {
      notify("You are on the last question.", "info");
      persistProgressSnapshot();
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    const nextQuestionId = questions[nextIndex]?.id;
    const nextVisited = nextQuestionId
      ? visitedQuestionIds.includes(nextQuestionId)
        ? visitedQuestionIds
        : [...visitedQuestionIds, nextQuestionId]
      : visitedQuestionIds;

    setCurrentQuestionIndex(nextIndex);
    setVisitedQuestionIds(nextVisited);
    persistProgressSnapshot({
      currentQuestionIndex: nextIndex,
      visitedQuestionIds: nextVisited,
    });
  };

  const handleSubmitAssessment = () => {
    submitAssessment("manual");
  };

  const handleHelpDesk = () => {
    notify("Help desk flow will be connected in next iteration.");
  };

  const handleExitAssessment = () => {
    notify("Exit confirmation and resume rules will be backend-driven.", "warning");
  };

  if (attemptSessionQuery.isError) {
    return (
      <div className="candidate-assessment-attempt-page">
        <main className="candidate-attempt-main">
          <section className="candidate-attempt-workspace">
            <div className="candidate-attempt-workspace-scroll">
              <div className="candidate-attempt-workspace-inner">
                <article className="candidate-attempt-question-card">
                  <h2>Unable to load assessment attempt</h2>
                  <p>
                    {attemptSessionQuery.error?.response?.data?.message ||
                      "This attempt session may be locked, expired, or invalid."}
                  </p>
                </article>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (attemptSessionQuery.isLoading || !attemptData || !isSessionHydrated) {
    return (
      <div className="candidate-assessment-attempt-page">
        <main className="candidate-attempt-main">
          <section className="candidate-attempt-workspace">
            <div className="candidate-attempt-workspace-scroll">
              <div className="candidate-attempt-workspace-inner">
                <article className="candidate-attempt-question-card">
                  <h2>Loading assessment session...</h2>
                  <p>Please wait while your attempt environment is initialized.</p>
                </article>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="candidate-assessment-attempt-page">
        <main className="candidate-attempt-main">
          <section className="candidate-attempt-workspace">
            <div className="candidate-attempt-workspace-scroll">
              <div className="candidate-attempt-workspace-inner">
                <article className="candidate-attempt-question-card">
                  <h2>No questions available</h2>
                  <p>The assessment session does not have questions configured yet.</p>
                </article>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="candidate-assessment-attempt-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{`engineerHUB | ${attemptData?.assessmentTitle || "Assessment Attempt"}`}</title>
      </Helmet>

      <div className="candidate-attempt-progress-track">
        <div
          className="candidate-attempt-progress-fill"
          style={{ width: `${questionProgressPercent}%` }}
        />
      </div>

      <header className="candidate-attempt-header">
        <div className="candidate-attempt-brand-wrap">
          <p className="candidate-attempt-brand">engineerHUB</p>
          <div className="divider" />
          <span>{attemptData?.assessmentTitle}</span>
        </div>

        <div className="candidate-attempt-question-indicator">
          {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
        </div>

        <div className="candidate-attempt-header-actions">
          <div
            className={
              remainingSeconds <= 300
                ? "candidate-attempt-timer is-warning"
                : "candidate-attempt-timer"
            }
          >
            <FiClock />
            <strong>{formatTimer(remainingSeconds)}</strong>
            <p>Remaining</p>
          </div>
          <button type="button" className="candidate-attempt-help-btn" aria-label="Assessment help">
            <FiHelpCircle />
          </button>
        </div>
      </header>

      <main className="candidate-attempt-main">
        <aside className="candidate-attempt-sidebar">
          <div className="candidate-attempt-sidebar-head">
            <h3>Question Navigator</h3>
            <p>{attemptData?.questionPhaseLabel || "Technical Assessment Phase"}</p>
          </div>

          <div className="candidate-attempt-sidebar-body candidate-attempt-scrollbar">
            <div className="candidate-attempt-grid">
              {questions.map((question, index) => {
                const state = getQuestionState(question.id, index);
                return (
                  <button
                    key={question.id}
                    type="button"
                    className={`candidate-attempt-grid-btn is-${state}`}
                    onClick={() => goToQuestionIndex(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="candidate-attempt-legend">
              <div>
                <span className="dot is-not-visited" />
                <p>Not Visited</p>
              </div>
              <div>
                <span className="dot is-answered" />
                <p>Answered</p>
              </div>
              <div>
                <span className="dot is-current" />
                <p>Current</p>
              </div>
              <div>
                <span className="dot is-review" />
                <p>Marked for Review</p>
              </div>
            </div>
          </div>

          <div className="candidate-attempt-sidebar-footer">
            <button
              type="button"
              className="submit-btn"
              onClick={handleSubmitAssessment}
              disabled={isSubmittingAssessment}
            >
              {isSubmittingAssessment ? "Submitting..." : "Submit Final Assessment"}
            </button>
            <div className="candidate-attempt-sidebar-links">
              <button type="button" onClick={handleHelpDesk}>
                <FiLifeBuoy />
                Help Desk
              </button>
              <button type="button" onClick={handleExitAssessment}>
                <FiLogOut />
                Exit
              </button>
            </div>
          </div>
        </aside>

        <section className="candidate-attempt-workspace">
          <div className="candidate-attempt-workspace-scroll candidate-attempt-scrollbar">
            <div className="candidate-attempt-workspace-inner">
              <article className="candidate-attempt-question-card">
                <div className="candidate-attempt-question-head">
                  <div>
                    <span className="question-section-chip">{currentQuestion.sectionLabel}</span>
                    <h2>{currentQuestion.prompt}</h2>
                  </div>
                  <span className="question-points-chip">{`${currentQuestion.points} Points`}</span>
                </div>

                <div className="candidate-attempt-options-wrap">
                  {currentQuestion.options.map((option) => {
                    const isSelected = option.id === selectedOptionId;
                    return (
                      <label
                        key={option.id}
                        className={
                          isSelected
                            ? "candidate-attempt-option is-selected"
                            : "candidate-attempt-option"
                        }
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option.id}
                          checked={isSelected}
                          onChange={() => handleSelectAnswer(option.id)}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="candidate-attempt-hint-box">
                  {currentQuestion.codeHintLines?.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="candidate-attempt-bottom-bar">
        <div className="candidate-attempt-bottom-inner">
          <div className="candidate-attempt-bottom-left">
            <button
              type="button"
              className="secondary-btn"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <FiChevronLeft />
              Previous
            </button>
            <button
              type="button"
              className={isCurrentQuestionMarked ? "review-btn is-marked" : "review-btn"}
              onClick={handleToggleMarkForReview}
            >
              <FiBookmark />
              {isCurrentQuestionMarked ? "Unmark Review" : "Mark for Review"}
            </button>
          </div>

          <div className="candidate-attempt-bottom-right">
            <div className="save-indicator">
              <FiUploadCloud />
              <span>{isSavingProgress ? "Saving..." : getSavedLabel(savedAgoSeconds)}</span>
            </div>
            <button type="button" className="ghost-btn" onClick={handleClearResponse}>
              <FiX />
              Clear Response
            </button>
            <button type="button" className="primary-btn" onClick={handleSaveAndNext}>
              Save & Next
              <FiChevronRight />
            </button>
          </div>
        </div>
      </footer>

      <div className="candidate-attempt-mobile-status">
        <span>{`Q${currentQuestionIndex + 1} of ${questions.length}`}</span>
        <strong>{`Answered: ${answeredCount}`}</strong>
      </div>
    </div>
  );
}
