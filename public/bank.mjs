export const levels = ["Junior", "Mid-level", "Senior"];

export const tracks = [
  {
    slug: "engineering-management",
    name: "Engineering management",
    description:
      "Practice coaching, delivery decisions, and incident leadership.",
  },
  {
    slug: "coding",
    name: "Coding",
    description:
      "Implement algorithms, reason about cost, and test edge cases.",
  },
  {
    slug: "system-design",
    name: "System design",
    description:
      "Design services under real capacity and reliability constraints.",
  },
  {
    slug: "sql",
    name: "SQL",
    description: "Write queries and defend their behavior on difficult data.",
  },
  {
    slug: "low-level-design",
    name: "Low-level design",
    description:
      "Model interfaces, invariants, and changes in application behavior.",
  },
  {
    slug: "ai-coding",
    name: "AI coding",
    description:
      "Guide an assistant through implementation and verify its work.",
  },
];

// Rows contain an original scenario, observable review criteria, and optional related practice.
const bank = {
  "engineering-management": [
    [
      "The release nobody owns",
      "A mobile launch has a fixed marketing date. Two teams each believe the other owns rollback. Plan the conversation and the launch decision.",
      "Names a decision owner, a rollback signal, and a rehearsal before launch.",
    ],
    [
      "Feedback after an outage",
      "A capable engineer skipped a rollout step during an incident. They now avoid deployments. Open a private feedback conversation.",
      "Separates observed behavior from intent, asks what made the step hard, and offers a supported next rollout.",
    ],
    [
      "The interrupt queue",
      "Support interrupts consume two days per engineer each week. Product wants the same roadmap. Negotiate an operating change.",
      "Quantifies lost capacity, creates a triage owner, and checks whether urgent customer work still gets served.",
    ],
    [
      "Promotion evidence",
      "An engineer wants promotion after leading a migration. Peers report that key decisions were hard to follow. Prepare the review conversation.",
      "Uses level criteria, gives specific evidence, and agrees on observable opportunities for growth.",
    ],
    [
      "An inherited pager",
      "A departing team hands over a service with no runbook and three noisy alerts. Decide when your team can accept on-call ownership.",
      "Defines acceptance criteria, shadow coverage, alert quality, and a named owner during transition.",
    ],
    [
      "A divided design review",
      "Two senior engineers disagree on whether to standardize deployments. The discussion has stalled delivery for a week. Facilitate a decision.",
      "Surfaces constraints, time-boxes evidence gathering, assigns a decider, and records revisit criteria.",
    ],
    [
      "Hiring with a gap",
      "You can hire once. The team needs better incident response and also needs a future technical lead. Write the hiring brief and scorecard.",
      "Identifies the most urgent gap, builds measurable criteria, and calibrates interviewers on evidence.",
    ],
    [
      "A missed commitment",
      "A dependency arrived late and a promised launch slipped. Product asks for a new date today. Prepare your response.",
      "Communicates impact, separates facts from uncertainty, and offers options with an explicit confidence check.",
    ],
    [
      "Invisible work",
      "One engineer quietly handles nearly every onboarding question. Their feature output has fallen. How do you assess and redistribute the work?",
      "Counts mentoring as work, checks the engineer’s preferences, and builds shared ownership.",
    ],
    [
      "A migration with no sponsor",
      "A platform migration promises simpler operations but product teams see only adoption cost. Secure a testable first commitment.",
      "Frames the benefit in adopter terms, funds migration effort, and agrees on a pilot exit criterion.",
    ],
    [
      "The quiet retrospective",
      "The same two voices dominate retros. Three engineers privately mention release pressure. Design the next retro and its follow-up.",
      "Offers safe input channels, protects confidentiality, and assigns one measurable improvement.",
    ],
    [
      "Budget reduction",
      "Your infrastructure budget drops 15 percent while the availability target stays fixed. Decide where the team investigates first.",
      "Measures cost by workload, protects critical paths, and defines rollback and customer-impact thresholds.",
    ],
  ],
  coding: [
    [
      "Distinct deployment suffix",
      "Given two build identifiers, return the shortest contiguous substring of the first that never occurs in the second. Break ties by earliest index.",
      "Handles identical inputs and empty strings, tests ties, and states substring comparison cost.",
      "problems/airbnb-shortest-uncommon-substring",
    ],
    [
      "Snapshot a service tree",
      "Encode and decode an ordered binary ownership tree whose node labels may repeat or contain delimiters.",
      "Preserves empty children and label boundaries and demonstrates a round trip.",
      "problems/amazon-serialize-deserialize-binary-tree",
    ],
    [
      "Concurrent builds",
      "Each build emits Q, R, and D in order. An interleaved log lacks build IDs. Return the smallest number of simultaneous build slots needed, or reject an impossible log.",
      "Tracks counts at each stage, rejects impossible prefixes or unfinished builds, and tests overlap.",
      "problems/cerebras-minimum-number-of-frogs-croaking",
    ],
    [
      "Maintenance union",
      "Combine overlapping half-open maintenance windows and report total downtime. Input order is arbitrary.",
      "Defines touching intervals, handles duplicates, and explains sorting complexity.",
    ],
    [
      "The quietest shard",
      "Partition a sequence of positive request counts into at most k contiguous shards to minimize the largest shard total.",
      "Bounds the answer, proves a feasibility check, and tests k equal to one.",
    ],
    [
      "Cyclic prerequisites",
      "Given tasks and directed prerequisites, return a valid execution order or a concrete dependency cycle.",
      "Includes isolated nodes and disconnected cycles and verifies the reported cycle.",
    ],
    [
      "Bounded event deduplication",
      "For timestamp-ordered events, suppress an ID seen in the preceding sixty seconds. Suppressed arrivals also count as sightings.",
      "Specifies the boundary and expires stale sightings without deleting newer ones.",
    ],
    [
      "Merge audit streams",
      "Merge k timestamp-sorted iterators lazily. Break timestamp ties by stream index and preserve order within streams.",
      "Uses bounded memory and handles empty iterators and repeated timestamps.",
    ],
    [
      "Minimum repair window",
      "Find the shortest contiguous sequence of log entries containing all required error codes with their required multiplicities.",
      "Tracks repeated requirements, shrinks the window correctly, and defines no-match behavior.",
    ],
    [
      "Replica reachability",
      "A grid marks healthy and unavailable zones. Return the shortest four-direction path between two healthy coordinates.",
      "Tracks visited cells and predecessors and handles unreachable and identical endpoints.",
    ],
    [
      "Fair retry order",
      "Given job IDs and a cooldown of k slots between identical IDs, construct a minimum-length schedule allowing idle slots.",
      "Respects cooldown after idle periods and demonstrates why the schedule is minimal.",
    ],
    [
      "Streaming latency median",
      "Maintain the median of a stream of integer latencies after every insert. For even counts return the average of the two middle observations.",
      "States balancing invariants, handles duplicates, and justifies update and query costs.",
    ],
  ],
  sql: [
    [
      "Manager pay gaps",
      "Using staff(id, manager_id, salary), list direct reports earning more than their own manager and the difference.",
      "Uses the correct self-join, excludes missing managers, and defines null salary behavior.",
      "problems/nykaa-employees-earning-more-than-their-managers",
    ],
    [
      "Daily currency exposure",
      "Given sales(id, currency, booked_at, amount) and rates(currency, valid_from, usd_per_unit), total UTC daily sales in USD using the last applicable rate.",
      "Selects exactly one applicable rate per sale and surfaces missing rates.",
      "problems/microsoft-daily-usd-totals-effective-rates",
    ],
    [
      "Coupon income",
      "Using holdings(account, bond, principal) and bonds(id, annual_rate), report annual coupon income per account for bonds yielding above 3 percent.",
      "States rate units, uses strict threshold, and preserves decimal precision.",
      "problems/wellsfargo-bond-interest-summary",
    ],
    [
      "First successful deployment",
      "Given deploys(id, service, finished_at, status), return the first success per service and its immediately preceding deployment status.",
      "Computes predecessor before filtering and uses id to resolve timestamp ties.",
    ],
    [
      "Seven-day error ratio",
      "Given daily(service, day, requests, errors), calculate a trailing seven-calendar-day error ratio across days with missing observations.",
      "Weights by requests and explains missing days and zero denominators.",
    ],
    [
      "Overlapping subscriptions",
      "For plans(account, start_at, end_at), find accounts with overlapping half-open periods. Null end means still active.",
      "Handles nested intervals, avoids self-pairs, and distinguishes overlap from adjacency.",
    ],
    [
      "Retention cohort",
      "Using events(user_id, at, kind), calculate day-seven return rate by UTC signup date, counting distinct users.",
      "Defines cohort eligibility, handles duplicate events, and excludes incomplete observation windows.",
    ],
    [
      "Reconcile two ledgers",
      "Compare billing(id, amount) with settlements(id, amount). Return missing IDs and unequal amounts in either direction.",
      "Includes records unique to both sides and states assumptions about null amounts and key uniqueness.",
    ],
    [
      "Longest green streak",
      "Given one check result per service per UTC date, return the longest streak of consecutive passing calendar days for each service.",
      "Breaks streaks at missing days and failures and handles services with no passing day.",
    ],
    [
      "Concurrent incidents",
      "For incidents(id, opened, resolved), determine maximum simultaneous incidents before a given cutoff. Null resolution means still open.",
      "Orders simultaneous boundaries consistently, clips open incidents, and avoids duplicate counts.",
    ],
    [
      "Top spending teams",
      "Given costs(team, month, amount), return the three highest distinct monthly totals and every team tied at those totals.",
      "Aggregates before ranking, partitions by month, and includes ties at the cutoff.",
    ],
    [
      "The latest device state",
      "Given changes(device, field, value, at, seq), reconstruct each field as of a cutoff. A null value represents an explicit clear.",
      "Orders by time and sequence, filters before ranking, and retains explicit null values.",
    ],
  ],
  "system-design": [
    [
      "Short links for tickets",
      "Design expiring short links for support tickets. A revoked link must stop redirecting within one minute.",
      "Balances cache TTL against revocation, sizes keys, and handles missing destinations.",
      "system-design/url-shortening-service",
    ],
    [
      "Notification preferences",
      "Design delivery for email and in-app alerts with per-user quiet hours. A retry must respect a recently changed preference.",
      "Separates durable intent from delivery and defines when preferences are evaluated.",
      "system-design/event-driven-notification-system",
    ],
    [
      "Restartable work",
      "Design a job runner that resumes multi-step imports after worker crashes. Some steps call an external billing service.",
      "Defines persisted state transitions, leases, and a way to reconcile ambiguous external results.",
      "system-design/durable-work-orchestration-platform",
    ],
    [
      "Artifacts near developers",
      "Design a build artifact service serving large immutable files to teams on three continents.",
      "Separates metadata from blobs, protects private artifacts, and models cold-cache transfer cost.",
    ],
    [
      "Telemetry under overload",
      "Design ingestion for bursty device measurements. Operators need recent trends and must see when data was dropped.",
      "Quantifies ingestion, bounds buffers, and makes sampling or loss observable.",
    ],
    [
      "Rules at the edge",
      "Design distribution of feature flags to intermittently connected clients. A bad update must be reversible.",
      "Versions snapshots, defines safe defaults, and monitors adoption of rollback.",
    ],
    [
      "Reliable webhooks",
      "Design event delivery to customer endpoints that can be down for hours. Customers need replay after recovery.",
      "Specifies retry scheduling, tenant fairness, deduplication, and replay bounds.",
    ],
    [
      "Search permissions",
      "Design search across internal documents. A user removed from a team must quickly lose access to indexed content.",
      "Identifies stale authorization risks, enforces access at read time, and measures revocation delay.",
    ],
    [
      "Reservation expiry",
      "Design a limited-seat reservation service where holds expire after five minutes and payment can arrive late.",
      "Defines hold ownership, atomic transitions, expiry races, and compensation.",
    ],
    [
      "Fleet configuration",
      "Distribute configuration to ten thousand agents that reconnect in bursts. Operators need per-version rollout visibility.",
      "Addresses reconnect load, rollout cohorts, validation, and recovery from a bad configuration.",
    ],
    [
      "Customer usage meters",
      "Design daily usage totals for invoicing. Input events arrive out of order and may be duplicated.",
      "Defines event identity, accounting windows, correction policy, and reconciliation.",
    ],
    [
      "Regional failover",
      "Design failover for a write-heavy account service. The business accepts five minutes of data loss and one hour of downtime.",
      "Connects replication and recovery choices to both objectives and describes a restore drill.",
    ],
  ],
  "low-level-design": [
    [
      "A safe file walker",
      "Design a file traversal API with optional symbolic-link following. Callers need deterministic output and bounded traversal.",
      "Models traversal policy explicitly, detects cycles, and reports partial read failures.",
      "low-level-design/filesystem-search-with-symlink-safety",
    ],
    [
      "Eviction without coupling",
      "Design a fixed-size cache whose eviction policy can change between LRU and FIFO.",
      "Preserves cache-policy invariants, specifies update semantics, and tests replacement.",
      "low-level-design/extensible-cache-eviction-policies",
    ],
    [
      "Orders with modifiers",
      "Design an order model with optional toppings and time-limited prices. Completed orders must retain historical totals.",
      "Separates catalog from order snapshots, represents money precisely, and validates modifiers.",
      "low-level-design/pizza-order-domain",
    ],
    [
      "Notification channels",
      "Define an API for email and SMS delivery supporting retryable and permanent outcomes.",
      "Encodes outcome types, isolates provider adapters, and tests retry classification.",
    ],
    [
      "A clock for leases",
      "Design an in-process lease manager with acquisition, renewal, and expiry. A stale holder must not release a newer lease.",
      "Uses ownership tokens, an injectable clock, and expiration boundary tests.",
    ],
    [
      "Reversible commands",
      "Design undo and redo for a text editor with grouped edits and redo invalidation after a new edit.",
      "Defines command state, group atomicity, and failure behavior.",
    ],
    [
      "Policy evaluation",
      "Design a rule evaluator with allow, deny, and abstain outcomes. Callers need explanations of the winning decision.",
      "Defines precedence, preserves rule identity, and tests conflicting rules.",
    ],
    [
      "Chunked downloads",
      "Model a resumable download with cancellation, checksums, and storage that may run out of space.",
      "Separates transfer state from persistence, verifies chunks, and models terminal states.",
    ],
    [
      "Fair resource pool",
      "Design a connection pool API supporting timeouts, checkout, and return. Clients may cancel while waiting.",
      "Protects capacity invariants, handles cancellation races, and specifies shutdown.",
    ],
    [
      "Composable discounts",
      "Model discounts that can stack, exclude each other, or have a maximum value. Explain how you select a valid combination.",
      "Defines deterministic precedence and rounding and tests a conflicting pair.",
    ],
    [
      "Immutable revisions",
      "Design a document revision API supporting historical reads and optimistic writes from two editors.",
      "Defines version tokens, conflict outcomes, and immutable revision storage.",
    ],
    [
      "Streaming parser",
      "Design an incremental parser for newline-delimited records. Records can span chunks and malformed input must be reported.",
      "Models buffering, limits maximum record size, and defines recovery and end-of-input behavior.",
    ],
  ],
  "ai-coding": [
    [
      "Repair rating edits",
      "An assistant updates a cached average by adding each edited score again. Specify the failing test and guide the repair.",
      "Reproduces a second edit, checks count and sum invariants, and independently verifies deletion.",
      "project-coding/amazon-repair-moviedb-reviews",
    ],
    [
      "Retry a refund",
      "A generated refund handler repeats a successful external transfer when its local save fails. Write an acceptance test and revise the design.",
      "Models the ambiguous outcome, requires an idempotency key or reconciliation, and tests a retry.",
      "project-coding/doordash-refund-dag-local-services",
    ],
    [
      "Partial workflow creation",
      "A generated client creates a parent ticket and five children. It times out after child three. Plan a safe resume.",
      "Tests partial completion, identifies stable child identities, and verifies a second run.",
      "project-coding/amazon-repair-workflow-issues",
    ],
    [
      "Timezone surprise",
      "A generated reminder fires twice when local clocks move backward. Give the assistant a precise product contract and failing fixtures.",
      "Specifies ambiguous local times and uses reproducible timezone fixtures.",
    ],
    [
      "A misleading benchmark",
      "An assistant claims a parser is twice as fast. Its benchmark repeatedly parses the same warmed input. Design a representative performance comparison.",
      "Controls inputs, separates warmup, measures variance, and checks correctness before timing.",
    ],
    [
      "A leaky migration",
      "A suggested schema migration makes an optional field mandatory before old writers stop sending null. Design a compatible rollout.",
      "Checks old and new clients, proposes staged migration, and verifies backfill completion.",
    ],
    [
      "Review a CSV import",
      "Generated code splits input on commas and newlines. Ask for a fix that handles quoted fields, malformed rows, and large files.",
      "Includes embedded newline and escaped quote fixtures, bounds memory, and defines error reporting.",
    ],
    [
      "Prove a pagination fix",
      "An assistant replaced offset pagination with a timestamp cursor. Records sharing a timestamp now disappear. Direct a minimal repair.",
      "Builds a tie fixture, uses stable compound ordering, and tests consecutive pages.",
    ],
    [
      "A flaky clock test",
      "A generated timeout test sleeps for one second and sometimes fails on CI. Guide a deterministic replacement.",
      "Controls the clock and scheduler, covers the boundary, and keeps one integration check.",
    ],
    [
      "Unbounded parallelism",
      "A generated importer starts one request per row. At ten thousand rows the downstream API throttles it. Specify the patch and checks.",
      "Bounds concurrency, respects retry delay, and tests ordering and partial failure.",
    ],
    [
      "Logs with sensitive fields",
      "A generated logging change serializes an entire request. Design tests and a revision that preserve debugging context.",
      "Uses an allowlist, verifies nested sensitive fields stay out, and preserves correlation identifiers.",
    ],
    [
      "Incomplete cancellation",
      "A generated search component can show a stale result after a newer request completes. Reproduce the race and propose a patch.",
      "Controls response order, verifies the latest request wins, and handles teardown.",
    ],
  ],
};

const expectations = {
  "engineering-management": [
    "You are a first-time lead. Role-play the opening conversation, ask one clarifying question, and agree on a next step within your authority.",
    "You manage one team. Present a two-week intervention, name decision owners, and define evidence that would change your approach.",
    "You manage several teams with competing incentives. Negotiate the trade-off, explain escalation thresholds, and define a thirty-day outcome review.",
  ],
  coding: [
    "Work through a small example by hand, implement a clear baseline, and test one boundary case.",
    "Implement your solution, give a counterexample to a tempting shortcut, and derive time and auxiliary space costs.",
    "Prove your invariant, identify the limiting resource at ten million input elements, and adapt the algorithm or explain a lower bound.",
  ],
  sql: [
    "Write the query, construct a three-row example, and predict the result before running it.",
    "Write the query and test it against duplicate values, ties, or missing data. State the schema constraints you rely on.",
    "Show the query and expected plan for a billion-row input. Select an index or partition strategy, then explain how to validate it under skew.",
  ],
  "system-design": [
    "Sketch the smallest working deployment, trace one request, and show what the caller sees when a dependency fails.",
    "State an expected traffic profile, size the bottleneck, and walk through one failure and its recovery.",
    "Model a regional failure during a tenfold traffic spike. Quantify acceptable loss and recovery time, and identify the signal that triggers rollback.",
  ],
  "low-level-design": [
    "Write public method signatures and trace one successful use and one invalid input.",
    "Sketch interfaces and a minimal implementation, state the core invariant, and test a state transition that could violate it.",
    "Show a safe evolution of the API with existing callers. Identify concurrency or reentrancy hazards and test a failure interleaving.",
  ],
  "ai-coding": [
    "Write the instruction and a minimal failing example. Inspect the proposed patch and verify one accepted and one rejected input.",
    "Draft a bounded implementation request, write independent regression checks, and identify an assistant change you would reject in review.",
    "Define an evaluation set that the assistant never sees, include an operational failure, and set release and rollback criteria.",
  ],
};

export function questions(slug, level) {
  const tier = levels.indexOf(level);
  if (!Object.hasOwn(bank, slug) || tier < 0)
    throw new RangeError("Unknown interview track or level");
  return bank[slug].map(([title, scenario, rubric, related]) => ({
    title,
    prompt: scenario + " " + expectations[slug][tier],
    rubric,
    ...(related ? { source: "https://www.fastprep.io/" + related } : {}),
  }));
}

// Original interviewer questions and follow-ups grouped by track.
const oralRounds = {
  "coding": [
    [
      "Window counts",
      "When can a sliding window replace a nested scan?",
      "Give an input where shrinking the window greedily loses the answer.",
      "Distinguishes monotonic state from arbitrary signed sums."
    ],
    [
      "Cache eviction",
      "Which operations must an LRU cache support efficiently?",
      "What changes if frequency breaks ties before recency?",
      "Separates lookup, ordering and bookkeeping costs."
    ],
    [
      "Versioned arrays",
      "How can a client read an older array value without copying every snapshot?",
      "What if one index receives almost every write?",
      "Tracks per-index history and compares read and write costs."
    ],
    [
      "Linked cycles",
      "How could two pointers detect a cycle using constant memory?",
      "Why does resetting one pointer help locate the entry?",
      "Reasons about distance and meeting points."
    ],
    [
      "Interval boundaries",
      "When do two booking intervals overlap?",
      "How does your answer change if a booking may start when another ends?",
      "States the boundary convention and tests equality."
    ],
    [
      "Prefix searches",
      "How would you count matching prefixes in sorted words?",
      "What determines the upper boundary when words contain arbitrary characters?",
      "Explains ordering assumptions and avoids an unsafe sentinel."
    ],
    [
      "Top-k ties",
      "When would you choose a heap over sorting all frequency counts?",
      "How would a secondary ordering affect which item gets evicted?",
      "Explains heap size, ordering and ties."
    ],
    [
      "Connected components",
      "How can you tell whether a connected component is complete?",
      "Which part of that argument breaks with duplicate edges?",
      "Connects vertex and distinct edge counts."
    ],
    [
      "Graph traversal",
      "When does breadth-first search find the cheapest route?",
      "What changes when one edge costs zero?",
      "Distinguishes hop count from weighted cost."
    ],
    [
      "Binary search",
      "Which property lets you discard half the search space?",
      "How would you find the first matching value among duplicates?",
      "States a monotone predicate and stopping condition."
    ],
    [
      "Stream processing",
      "How would you sample a record from a stream of unknown size?",
      "How can you show each record has equal probability?",
      "Explains replacement probability."
    ],
    [
      "Prefix sums",
      "When would you precompute running totals?",
      "What if point updates become frequent?",
      "Balances query and update costs."
    ]
  ],
  "sql": [
    [
      "Counting people",
      "What is the difference between counting orders and counting paying customers?",
      "What happens when you join an order to three line items?",
      "Defines grain before aggregation."
    ],
    [
      "Tied ranks",
      "When do rank and dense rank give different results?",
      "Who appears in the top two ranks for scores 9, 9 and 8?",
      "Works through ties explicitly."
    ],
    [
      "Missing events",
      "How would you identify customers who never completed checkout?",
      "What happens if the exclusion set contains NULL?",
      "Explains anti-join and null semantics."
    ],
    [
      "Running balances",
      "Which ordering makes a running balance reproducible?",
      "What if two transactions share the same timestamp?",
      "Uses a stable tie-breaker and explicit window frame."
    ],
    [
      "Retention cohorts",
      "How would you define week-one retention?",
      "How do you treat customers whose first week has not ended?",
      "Defines denominator, time boundary and observation window."
    ],
    [
      "Latest status",
      "How would you choose the latest status for each shipment?",
      "What if an old event arrives after the latest status?",
      "Separates event time from ingestion time."
    ],
    [
      "Weighted averages",
      "Why can averaging daily conversion rates distort monthly conversion?",
      "Construct two days where the unweighted result is misleading.",
      "Recomputes the ratio from totals."
    ],
    [
      "Index selection",
      "Which columns matter in an index for a tenant and time-range query?",
      "How would a single very large tenant affect the plan?",
      "Relates selectivity and observed plan to data distribution."
    ],
    [
      "Transaction isolation",
      "How could two reads in one transaction disagree?",
      "Which guarantee would make a monthly report reproducible?",
      "Distinguishes snapshots and statement visibility."
    ],
    [
      "Session windows",
      "What event gap should start a new visit?",
      "How would you handle two events at exactly the cutoff?",
      "Defines ordering and interval boundaries."
    ],
    [
      "Join semantics",
      "How can a WHERE clause change a left join?",
      "Which rows disappear when a right-side predicate filters NULL?",
      "Explains unmatched rows."
    ],
    [
      "Data correction",
      "How would you backfill a metric after correcting duplicate records?",
      "How could you make rerunning the backfill safe?",
      "Uses deterministic keys and reconciliation."
    ]
  ],
  "system-design": [
    [
      "Webhook delivery",
      "When can a producer safely acknowledge an accepted webhook?",
      "How does a consumer recognize a delivery repeated after a timeout?",
      "Distinguishes durable acceptance and idempotent consumption."
    ],
    [
      "Booking inventory",
      "What invariant prevents two buyers from taking the final seat?",
      "What happens when payment succeeds just after a hold expires?",
      "Defines ownership, atomic transitions and compensation."
    ],
    [
      "Feed fan-out",
      "When is a feed cheaper to assemble on read?",
      "What changes when one author has ten million followers?",
      "Connects skew, fan-out and freshness."
    ],
    [
      "Hot keys",
      "Why can a distributed cache overload even when total capacity looks healthy?",
      "How would you tell a hot key from a cold-cache restart?",
      "Uses per-key or shard traffic and hit-rate evidence."
    ],
    [
      "Pagination",
      "Why can offset pagination skip records in a changing feed?",
      "What does a stable cursor need besides a timestamp?",
      "Uses stable ordering and explicit consistency semantics."
    ],
    [
      "Backpressure",
      "How should a queue consumer react when its dependency slows down?",
      "Which signal distinguishes absorbing a burst from falling permanently behind?",
      "Uses queue age, drain rate and bounded concurrency."
    ],
    [
      "Regional recovery",
      "What determines whether a service can fail over safely?",
      "What state would you reconcile before allowing writes again?",
      "States recovery targets and ownership of writes."
    ],
    [
      "Rate limits",
      "Where would you enforce limits shared by multiple API servers?",
      "What happens if the shared counter becomes unavailable?",
      "Explains accuracy, availability and failure policy."
    ],
    [
      "Blob storage",
      "How should a service expose large user uploads?",
      "What if storage succeeds and the metadata commit fails?",
      "Reconciles orphaned objects."
    ],
    [
      "Search indexing",
      "How fresh must a search index be after an edit?",
      "How can a delayed update resurrect a deleted item?",
      "Uses versions and tombstones."
    ],
    [
      "Capacity planning",
      "Which traffic number determines peak write capacity?",
      "How would a burst affect the queue drain time?",
      "Relates arrival and service rates."
    ],
    [
      "Schema migrations",
      "How would two service versions share a changing schema?",
      "When can you remove the old column safely?",
      "Explains compatibility and observable cutover."
    ]
  ],
  "low-level-design": [
    [
      "Reservation states",
      "What operations should a ticket hold expose?",
      "Which transition must be atomic when confirmation races expiry?",
      "Defines valid transitions and concurrent outcomes."
    ],
    [
      "Pricing rules",
      "How would you let clients combine pricing rules?",
      "How do you express two discounts that cannot both apply?",
      "Makes rule ordering and conflicts explicit."
    ],
    [
      "Notification fan-out",
      "Which interface separates delivery from subscription tracking?",
      "Can a subscriber unsubscribe during delivery?",
      "Defines iteration and ownership semantics."
    ],
    [
      "Undo history",
      "What must an undoable command record?",
      "What happens to redo history after a new command?",
      "Explains reversible state and history boundaries."
    ],
    [
      "Resource ownership",
      "Who closes a resource borrowed by a component?",
      "How would a test catch a double close after initialization fails?",
      "Defines ownership across exceptional paths."
    ],
    [
      "Payment retries",
      "How should a payment interface represent an unknown result?",
      "How would callers retry safely after a timeout?",
      "Separates uncertain outcome from definitive failure."
    ],
    [
      "Clock boundaries",
      "Why pass a clock to an expiring cache?",
      "What if the system clock moves backward?",
      "Separates elapsed time and wall time."
    ],
    [
      "Extensible dispatch",
      "When would you introduce a strategy interface for routing?",
      "Which behavior belongs in the caller when a strategy fails?",
      "Defines a narrow contract and fallback policy."
    ],
    [
      "Versioned interfaces",
      "How can an interface evolve without breaking callers?",
      "How would you test an older consumer?",
      "Defines compatibility contracts."
    ],
    [
      "Immutable state",
      "When should a value object be immutable?",
      "How would you prevent mutation through an exposed collection?",
      "Handles nested mutability."
    ],
    [
      "Batch operations",
      "How should a batch API describe partial success?",
      "What should retrying a single failed item do?",
      "Defines per-item outcomes."
    ],
    [
      "Scheduling",
      "How would you model dependencies between scheduled jobs?",
      "Who rejects a cycle introduced during an update?",
      "Protects graph invariants."
    ]
  ],
  "ai-coding": [
    [
      "Reproducing a bug",
      "What evidence would you give a coding assistant before asking for a fix?",
      "How do you prove its patch addresses the original failure?",
      "Uses a minimal case and an independent regression check."
    ],
    [
      "Refund workflows",
      "How would you review generated retry logic for a refund step?",
      "What if the refund succeeds but the response is lost?",
      "Checks idempotency and durable state."
    ],
    [
      "Rating aggregates",
      "An assistant changes how ratings are averaged. What would you verify first?",
      "How do an edited review and a deleted review change your fixtures?",
      "Defines aggregate semantics and mutation cases."
    ],
    [
      "Notification repair",
      "How would you test a generated fix for duplicate notifications?",
      "Which test separates a duplicate event from two legitimate events?",
      "Defines event identity and delivery expectations."
    ],
    [
      "API compatibility",
      "What contract would you give an assistant repairing an existing API?",
      "Which consumer behavior might pass unit tests and still break?",
      "Pins observable behavior and exercises a real caller."
    ],
    [
      "Route selection",
      "How would you assess an assistant-generated consistent hashing change?",
      "What measurement would show excessive key movement?",
      "Compares assignment distributions before and after membership changes."
    ],
    [
      "Evaluation leakage",
      "Why keep examples out of the implementation prompt?",
      "What would convince you a passing score reflects memorization?",
      "Uses held-out cases and distribution shifts."
    ],
    [
      "Reconciliation",
      "Which invariants would you give an assistant reconciling two ledgers?",
      "How should it handle unmatched records that arrive tomorrow?",
      "Preserves totals and distinguishes pending from incorrect."
    ],
    [
      "Dependency changes",
      "What would make you reject a generated dependency upgrade?",
      "What fixture would detect a behavior change with identical types?",
      "Tests observable contracts."
    ],
    [
      "Test oracles",
      "How can you validate an implementation without copying its logic into the test?",
      "When is a slower reference implementation useful?",
      "Uses an independent oracle."
    ],
    [
      "Scope control",
      "How would you split a large assistant-generated refactor?",
      "Which checkpoint can you verify independently?",
      "Defines reversible increments."
    ],
    [
      "Flaky tests",
      "What evidence would you collect before accepting a generated timeout increase?",
      "How would you reproduce the timing issue deterministically?",
      "Controls clocks and scheduling."
    ]
  ],
  "engineering-management": [
    [
      "Feedback",
      "Tell me about difficult feedback you delivered. What did you actually say?",
      "What did the other person do next, and how did you follow up?",
      "Uses observed behavior and a specific follow-up."
    ],
    [
      "Delivery trade-offs",
      "Describe a commitment you renegotiated. Who needed to know first?",
      "Which option did you reject, and what evidence ruled it out?",
      "Explains constraints, alternatives and communication."
    ],
    [
      "Delegation",
      "Tell me about a decision you handed to another engineer.",
      "When did you step in or deliberately stay out?",
      "Defines authority and a concrete escalation boundary."
    ],
    [
      "Incident leadership",
      "Describe a difficult decision you made during an incident.",
      "What information available at the time would have changed your call?",
      "Separates contemporaneous evidence from hindsight."
    ],
    [
      "Developing people",
      "How did you help someone take on unfamiliar responsibility?",
      "How did you distinguish independent progress from your own involvement?",
      "Gives an observable growth signal."
    ],
    [
      "Conflict",
      "Tell me about two teams that disagreed on an implementation.",
      "How did you get commitment from the team whose proposal lost?",
      "Identifies decision rights and follow-through."
    ],
    [
      "Hiring",
      "Which evidence would you collect before opening a new role?",
      "What would change your mind about hiring versus developing someone internally?",
      "Connects the role to a specific capability gap."
    ],
    [
      "Prioritization",
      "Describe an initiative you stopped before it was complete.",
      "What did you tell the engineers who had invested in it?",
      "Explains opportunity cost and acknowledges the work."
    ],
    [
      "Career growth",
      "How have you scoped a stretch assignment for an engineer?",
      "What evidence showed the scope was appropriate?",
      "Defines ownership and support."
    ],
    [
      "Team health",
      "How would you detect burnout before someone resigns?",
      "What would you change if the team distrusts surveys?",
      "Uses qualitative evidence and sustainable workload."
    ],
    [
      "Onboarding",
      "Describe how you shortened time to independent ownership.",
      "Which signal distinguished familiarity from readiness?",
      "Measures independent execution."
    ],
    [
      "Strategy",
      "When have you declined a technically sound investment?",
      "What would justify revisiting that decision?",
      "Links opportunity cost to explicit criteria."
    ]
  ]
};

export function discussionRounds(track) {
  return oralRounds[track];
}
