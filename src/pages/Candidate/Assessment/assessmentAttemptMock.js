import { buildMockAssessmentInvite } from "./assessmentEntryMock";

const QUESTION_BANK = [
  {
    id: "q-1",
    sectionLabel: "Database Fundamentals",
    points: 3,
    prompt:
      "Which SQL indexing strategy typically provides the best lookup performance for exact-match queries on large transactional tables?",
    options: [
      { id: "A", label: "Clustered B-Tree index on the frequently queried column." },
      { id: "B", label: "Hash index with periodic full table vacuuming." },
      { id: "C", label: "Bitmap index on all low-cardinality columns." },
      { id: "D", label: "No index and rely on table partition pruning only." },
    ],
    codeHintLines: [
      "// Tip: index type should align with read pattern",
      "CREATE INDEX idx_email ON users(email);",
    ],
  },
  {
    id: "q-2",
    sectionLabel: "Node.js Runtime",
    points: 3,
    prompt:
      "In Node.js, what is the primary reason to avoid CPU-bound loops on the main thread in API services?",
    options: [
      { id: "A", label: "They block the event loop and delay all incoming requests." },
      { id: "B", label: "They immediately crash V8 if loop duration exceeds 100ms." },
      { id: "C", label: "They disable async/await execution in child modules." },
      { id: "D", label: "They reduce TLS handshake throughput only." },
    ],
    codeHintLines: [
      "// Consider worker_threads for heavy compute",
      "await queue.add({ jobType: 'aggregation' });",
    ],
  },
  {
    id: "q-3",
    sectionLabel: "System Reliability",
    points: 3,
    prompt:
      "Which approach is best for ensuring idempotent payment processing in a distributed service architecture?",
    options: [
      { id: "A", label: "Retry requests indefinitely until upstream confirms success." },
      { id: "B", label: "Store unique idempotency keys with operation state in durable storage." },
      { id: "C", label: "Use client-side timestamps as global unique transaction IDs." },
      { id: "D", label: "Disable retries and fail fast on all timeout scenarios." },
    ],
    codeHintLines: [
      "// Duplicate request check",
      "if (existingKey) return existingResult;",
    ],
  },
  {
    id: "q-4",
    sectionLabel: "API Design",
    points: 3,
    prompt:
      "For a public REST API consumed by multiple clients, which versioning strategy is generally the most maintainable?",
    options: [
      { id: "A", label: "Version through custom response headers only." },
      { id: "B", label: "Embed semantic version in URL path (e.g., /v1/orders)." },
      { id: "C", label: "Version by response body flags without documentation updates." },
      { id: "D", label: "Create a separate domain for every endpoint revision." },
    ],
    codeHintLines: [
      "// Backward compatibility matters",
      "GET /api/v1/orders/:orderId",
    ],
  },
  {
    id: "q-5",
    sectionLabel: "System Design",
    points: 4,
    prompt:
      'Which of the following database sharding strategies is most resilient to "hotspot" issues when access patterns are predominantly based on a range of chronological primary keys?',
    options: [
      {
        id: "A",
        label: "Range-based sharding where each shard handles a contiguous segment of the key space.",
      },
      {
        id: "B",
        label: "Hash-based sharding applying a consistent hashing algorithm to the primary key.",
      },
      {
        id: "C",
        label: "Directory-based sharding utilizing a lookup service to map keys to specific shards.",
      },
      {
        id: "D",
        label:
          "Vertical partitioning by moving frequently accessed columns to a dedicated high-performance shard.",
      },
    ],
    codeHintLines: [
      "// Consideration: Hotspots often occur when the latest data is frequently queried",
      "shard_id = hash(timestamp_pk) % total_shards;",
    ],
  },
  {
    id: "q-6",
    sectionLabel: "Caching Strategy",
    points: 3,
    prompt:
      "Which cache invalidation model best suits a product catalog where reads are high and updates are infrequent?",
    options: [
      { id: "A", label: "Write-around cache with short TTL and lazy cache fill." },
      { id: "B", label: "Cache-aside with event-driven invalidation on update." },
      { id: "C", label: "Disable cache for consistency-critical entities." },
      { id: "D", label: "Full cache flush after every product update." },
    ],
    codeHintLines: [
      "// Event bus invalidation sample",
      "publish('catalog.updated', { productId });",
    ],
  },
  {
    id: "q-7",
    sectionLabel: "Debugging",
    points: 4,
    prompt:
      "A sudden spike in P95 latency appears only for one region. Which first action yields the highest diagnostic value?",
    options: [
      { id: "A", label: "Restart all pods to reset CPU and memory metrics." },
      { id: "B", label: "Compare regional traces, dependency latency, and error rates side by side." },
      { id: "C", label: "Immediately downscale traffic to that region by 90%." },
      { id: "D", label: "Switch database primary to a new cluster before analysis." },
    ],
    codeHintLines: [
      "// Correlate request IDs across services",
      "traceId -> gateway -> service -> datastore",
    ],
  },
  {
    id: "q-8",
    sectionLabel: "Security",
    points: 3,
    prompt:
      "For service-to-service authentication in microservices, which pattern is most robust for zero-trust environments?",
    options: [
      { id: "A", label: "Long-lived shared API key stored in each service config." },
      { id: "B", label: "Mutual TLS with short-lived certificates issued by a trusted CA." },
      { id: "C", label: "IP whitelisting without identity-level cryptographic verification." },
      { id: "D", label: "Basic auth over private network only." },
    ],
    codeHintLines: [
      "// mTLS verifies both client and server identity",
      "spiffe://service.namespace",
    ],
  },
  {
    id: "q-9",
    sectionLabel: "Scalability",
    points: 3,
    prompt:
      "What is the most effective way to prevent thundering herd issues during cache expiry for hot keys?",
    options: [
      { id: "A", label: "Use jittered TTL and request coalescing (single-flight)." },
      { id: "B", label: "Expire all keys at the top of every hour." },
      { id: "C", label: "Disable cache for top 1% traffic keys." },
      { id: "D", label: "Increase DB connection pool by 10x." },
    ],
    codeHintLines: [
      "// Randomized TTL prevents synchronized expiry",
      "ttl = baseTtl + random(0, jitterWindow)",
    ],
  },
  {
    id: "q-10",
    sectionLabel: "Messaging",
    points: 3,
    prompt:
      "When designing an event-driven order pipeline, what guarantees are required to avoid duplicate fulfillment?",
    options: [
      { id: "A", label: "At-most-once delivery with no retries." },
      { id: "B", label: "At-least-once delivery plus idempotent consumer logic." },
      { id: "C", label: "Exactly-once transport guarantees only." },
      { id: "D", label: "FIFO queue ordering without deduplication keys." },
    ],
    codeHintLines: [
      "// Consumer should dedupe using orderId + step",
      "if (processed.has(eventKey)) return;",
    ],
  },
  {
    id: "q-11",
    sectionLabel: "Observability",
    points: 3,
    prompt:
      "Which telemetry combination gives the best root-cause coverage for backend latency regressions?",
    options: [
      { id: "A", label: "Logs only, sampled every 5 minutes." },
      { id: "B", label: "Metrics + distributed traces + structured logs with correlation IDs." },
      { id: "C", label: "Error rate dashboard only." },
      { id: "D", label: "Per-request screenshots and browser snapshots." },
    ],
    codeHintLines: [
      "// Correlated telemetry shortens MTTR",
      "requestId, spanId, userId",
    ],
  },
  {
    id: "q-12",
    sectionLabel: "Data Modeling",
    points: 3,
    prompt:
      "For immutable event history with periodic query summaries, which storage strategy is typically preferred?",
    options: [
      { id: "A", label: "Overwrite latest state in a single mutable row." },
      { id: "B", label: "Append-only event log with downstream materialized views." },
      { id: "C", label: "Store everything in browser local storage." },
      { id: "D", label: "Use CSV snapshots generated on every write." },
    ],
    codeHintLines: [
      "// Event sourcing pattern",
      "events -> projector -> read model",
    ],
  },
  {
    id: "q-13",
    sectionLabel: "Performance",
    points: 3,
    prompt:
      "What first optimization is recommended when a single endpoint shows high DB round-trip count per request?",
    options: [
      { id: "A", label: "Batch queries and remove N+1 access patterns." },
      { id: "B", label: "Increase API timeout limit to 60 seconds." },
      { id: "C", label: "Disable all input validation." },
      { id: "D", label: "Send duplicate requests in parallel and race results." },
    ],
    codeHintLines: [
      "// Profile query count per request",
      "SELECT ... WHERE id IN (...)",
    ],
  },
  {
    id: "q-14",
    sectionLabel: "Resilience",
    points: 3,
    prompt:
      "Circuit breakers are primarily used in backend systems to achieve which objective?",
    options: [
      { id: "A", label: "Encrypt all traffic at rest." },
      { id: "B", label: "Prevent cascading failures during downstream outages." },
      { id: "C", label: "Guarantee zero packet loss over the network." },
      { id: "D", label: "Increase CPU throughput for synchronous tasks." },
    ],
    codeHintLines: [
      "// Open -> Half-open -> Closed",
      "if (failureRate > threshold) openCircuit();",
    ],
  },
  {
    id: "q-15",
    sectionLabel: "Release Engineering",
    points: 3,
    prompt:
      "What deployment approach best reduces risk when shipping major backend changes?",
    options: [
      { id: "A", label: "Big-bang deploy to all regions simultaneously." },
      { id: "B", label: "Canary rollout with progressive traffic ramp and rollback triggers." },
      { id: "C", label: "Manual file copy directly on production nodes." },
      { id: "D", label: "Disable monitoring during rollout to reduce noise." },
    ],
    codeHintLines: [
      "// Canary gates",
      "errorRate < 1% && p95Latency < threshold",
    ],
  },
];

export function buildMockAssessmentAttempt(inviteToken, startAtOverride) {
  const invite = buildMockAssessmentInvite(inviteToken, startAtOverride);

  return {
    inviteToken: invite.inviteToken,
    candidateName: invite.candidateName,
    companyName: "engineerHUB",
    assessmentTitle: invite.assessmentTitle,
    durationMinutes: invite.durationMinutes,
    totalQuestions: QUESTION_BANK.length,
    questionPhaseLabel: "Technical Assessment Phase",
    initialRemainingSeconds: 42 * 60 + 18,
    initialCurrentQuestionIndex: 4,
    questions: QUESTION_BANK,
    initialResponsesByQuestionId: {
      "q-1": "B",
      "q-2": "A",
      "q-3": "C",
      "q-4": "B",
      "q-5": "C",
    },
    initialMarkedForReviewQuestionIds: ["q-7"],
    initialVisitedQuestionIds: ["q-1", "q-2", "q-3", "q-4", "q-5", "q-7"],
    initialLastSavedAtIso: new Date(Date.now() - 12 * 1000).toISOString(),
  };
}
