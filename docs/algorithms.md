# Load Balancing Algorithms Q&A

## 1) What is Round Robin?
Round Robin is a cyclic distribution strategy. Each new request is sent to the next server in order, then the pointer wraps back to the first server.

Example with 3 servers:
- Request 1 → Server A
- Request 2 → Server B
- Request 3 → Server C
- Request 4 → Server A (cycle repeats)

### Pros
- Very simple and predictable.
- Even request distribution when servers are similar.
- Low runtime overhead.

### Cons
- Does not account for active load or request duration.
- Can be suboptimal if server capacities differ.

---

## 2) What is Least Connections?
Least Connections sends the next request to the server with the fewest active (in-flight) connections at that moment.

### Why it helps
- Better adapts to variable request durations.
- Reduces imbalance when one server is busier than others.
- Useful when requests are not uniform in processing cost.

### Trade-off
- Slightly more bookkeeping compared with Round Robin because active connection counts must be tracked accurately.

---

## 3) Time complexity comparison
Assume `n` healthy backend servers.

- **Round Robin selection:** `O(1)`
  - Uses an index and modulo-style rotation.
- **Least Connections selection:** usually `O(n)`
  - Scans servers to find the minimum active-connection count.

### Note
Least Connections can be optimized to near `O(log n)` using advanced data structures (e.g., a min-heap), but a straightforward implementation is typically linear scan.

---

## 4) When should each algorithm be used?
### Prefer Round Robin when:
- Backend instances are homogeneous (same capacity).
- Request cost is relatively uniform.
- You need minimal complexity and high throughput.

### Prefer Least Connections when:
- Request duration varies significantly.
- Some servers can get temporarily overloaded.
- You want better real-time balancing under uneven load.

---

## Practical guidance for this project
- Use **Round Robin** as a clean baseline for demonstration and deterministic behavior.
- Use **Least Connections** when running stress tests with mixed or uneven request workloads.
- Keep health-check filtering enabled so both algorithms only select healthy targets.