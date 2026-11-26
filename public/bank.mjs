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
