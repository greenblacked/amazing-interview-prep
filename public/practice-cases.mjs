// Original exercises inspired by entries in perixtar/Tech-OA-Interview-Questions.
export const practiceCases = {
  coding: [
    {
      id: "tree-round-trip",
      title: "Round-trip an ordered binary tree",
      prompt: "Implement encode(root) and decode(data) for an ordered binary tree of signed integers. Preserve missing children and duplicate values. For example, a root of 4 with a right child of 4 must survive the round trip with its left child empty. Define what happens on malformed input.",
      rubric: "Preserves shape and values, validates the encoding, and explains time and space complexity.",
      answer: [
        "Emit preorder tokens with an explicit # for each missing child. The example becomes 4,#,4,#,#. Decode with a shared cursor. A # returns an empty node. An integer creates a node, then recursively consumes its left and right subtrees.",
        "Reject invalid integers, missing tokens and trailing tokens. A tree of n nodes emits 2n+1 tokens. Both passes take O(n) time and O(h) traversal stack space, plus input or output storage. Use an explicit stack if depth is unbounded.",
      ],
    },
    {
      id: "topic-hops",
      title: "Find the shortest topic trail",
      prompt: "Implement shortestTrail(graph, start, target) for a directed unweighted graph. Return the path including both endpoints, or an empty list if unreachable. Given A → B, A → C, B → D and C → E → D, return A, B, D.",
      rubric: "Finds a shortest path, reconstructs it correctly, and handles cycles and unreachable nodes.",
      answer: [
        "Run breadth-first search from start. Mark each node visited when you enqueue it and record its predecessor. Once target is discovered, walk the predecessor chain back to start and reverse it.",
        "Return [start] when start equals target. Return [] if the queue empties first. Use a queue with a read index so dequeues are O(1). Runtime is O(V+E) and auxiliary space is O(V).",
      ],
    },
  ],
  sql: [
    {
      id: "salary-self-join",
      title: "Compare employee and manager pay",
      prompt: "Write a PostgreSQL query over employees(id, manager_id, salary) to return employees whose salary is strictly higher than their direct manager’s. Missing managers and unknown salaries should be excluded. With rows (1, NULL, 100), (2, 1, 120), and (3, 1, 100), return only 2.",
      rubric: "Uses a direct self-join, handles NULL and ties, and explains the lookup path.",
      answer: [
        "Join each employee to their manager by primary key. The inner join drops missing managers, while the strict greater-than comparison drops equal salaries and NULL comparisons.",
        "SELECT e.id FROM employees AS e JOIN employees AS m ON m.id = e.manager_id WHERE e.salary > m.salary;",
      ],
    },
    {
      id: "effective-rates",
      title: "Convert payments using effective rates",
      prompt: "In PostgreSQL, use payments(id, paid_on, currency, amount) and fx_rates(currency, effective_on, usd_per_unit). The rate key is (currency, effective_on). Return each day’s USD total and the count of payments missing a rate. Use the latest rate on or before payment day. A missing rate must never contribute an assumed value.",
      rubric: "Chooses one historical rate per payment and reports missing rates without dropping payments.",
      answer: [
        "Use a LEFT JOIN LATERAL that orders eligible rates newest-first and takes one row. Group by paid_on. SUM ignores missing rates and returns NULL when a day has no priced payments. An index on (currency, effective_on) supports the lookup.",
        "SELECT p.paid_on, SUM(p.amount * r.usd_per_unit) AS usd_total, COUNT(*) FILTER (WHERE r.usd_per_unit IS NULL) AS missing_rates FROM payments AS p LEFT JOIN LATERAL (SELECT usd_per_unit FROM fx_rates WHERE currency = p.currency AND effective_on <= p.paid_on ORDER BY effective_on DESC LIMIT 1) AS r ON true GROUP BY p.paid_on ORDER BY p.paid_on;",
      ],
    },
  ],
  "system-design": [
    {
      id: "fair-typing-race",
      title: "Run a fair typing race",
      prompt: "Design a real-time typing race for rooms of up to 20 players. Players can reconnect, and network latency varies. Sketch the event protocol, start and finish rules, and how the UI recovers after a dropped connection.",
      rubric: "Makes the server authoritative and distinguishes reconnect recovery from fairness guarantees.",
      answer: [
        "Assign each room to one coordinator. Send a server start time, validate progress against the assigned text, and deduplicate updates by player and sequence number. Broadcast snapshots and derive reconnect state from the latest accepted sequence.",
        "Rank by server-validated completion and define ties and disconnect timeouts explicitly. Server arrival times still favor lower latency, so measure the gap and disclose it. Track reconnect recovery and update lag per region.",
      ],
    },
    {
      id: "durable-job-leases",
      title: "Recover interrupted background work",
      prompt: "Design a work scheduler where a worker may crash after applying an external side effect but before acknowledging the job. Define the job lifecycle, what triggers retries, and how operators identify stuck work.",
      rubric: "Explains lease expiration, stale workers, duplicate effects, and operational signals.",
      answer: [
        "Persist jobs and grant renewable leases. Each lease carries a generation so a stale worker cannot mark a retried job complete. Retry expired leases with bounded backoff and move jobs to a terminal failure state after the retry budget.",
        "Pass a stable idempotency key to the downstream API. When it cannot deduplicate, reconcile unknown outcomes before retrying. Monitor oldest runnable job age, expired leases and terminal failures.",
      ],
    },
  ],
  "low-level-design": [
    {
      id: "configurable-pizza-order",
      title: "Model a configurable pizza order",
      prompt: "Model pizzas by size, crust, and toppings, with topping prices that vary by size. Support quantities and quote an order in integer cents. A menu update must leave an already confirmed order total intact.",
      rubric: "Separates menu rules from order state and preserves confirmed prices.",
      answer: [
        "Represent a selection as an immutable configuration and validate it against a versioned menu. The pricing service calculates a unit price in cents. The order line snapshots menu version, configuration, quantity and unit price at confirmation.",
        "Test unsupported crusts, duplicate toppings, zero quantity and a menu price change after checkout. Keep quoting and confirmation on the same menu version or require a new quote.",
      ],
    },
    {
      id: "expiring-lru-contract",
      title: "Define an expiring LRU cache",
      prompt: "Specify get, put and remove for a capacity-limited LRU cache with per-entry TTL. An expired item is a miss and must never be refreshed by reading it. Describe how insertion handles expired entries before evicting live items.",
      rubric: "Defines expiry and recency independently, with explicit cleanup and testable time.",
      answer: [
        "Inject a monotonic clock. Keep a key-to-node map and a doubly linked recency list. A get removes an expired node or moves a live node to the front. A put replaces the value and expiry and moves the node to the front.",
        "For a simple bounded cache, scan expired entries only when at capacity before evicting the tail. For large caches, maintain an expiration index with generation checks on replacement. Test exact expiry, replacement before expiry, and a full cache with an expired recently used entry.",
      ],
    },
  ],
  "ai-coding": [
    {
      id: "repair-rating-aggregate",
      title: "Review a generated ratings fix",
      prompt: "An assistant proposes updating a film’s average with (oldAverage + newRating) / 2 on every submission. Reviews can be created, edited, and deleted. Write the implementation brief and fixtures you would use to evaluate the next patch.",
      rubric: "Identifies the weighting bug and independently validates every review lifecycle operation.",
      answer: [
        "Require one rating per reviewer and film and compute AVG from persisted reviews, or update sum and count transactionally. Editing replaces one contribution, deletion removes one, and a film with no reviews has a null average.",
        "Create ratings 2, 4 and 5, then edit 2 to 5 and delete the original 5. The successive averages are 11/3, 14/3 and 9/2. Test the last deletion and confirm a retried create cannot inflate the count.",
      ],
    },
    {
      id: "refund-retry-repair",
      title: "Review a generated refund retry",
      prompt: "A refund endpoint times out after the processor accepts a refund. An assistant adds an unconditional retry with a new request ID. Write an implementation brief and test plan that prevents duplicate refunds while preserving legitimate retries.",
      rubric: "Separates unknown from failed outcomes and uses a repeatable test for the timeout window.",
      answer: [
        "Persist a refund intent keyed by the business operation and reuse its processor idempotency key on every attempt. Keep timeouts in a pending state and reconcile against the processor. Reject a different amount reusing the same intent.",
        "Use a fake processor that records the first refund and drops its response. Retry concurrently and restart the application. Assert one processor effect, one terminal refund, and a clear conflict for an incompatible amount.",
      ],
    },
  ],
};
