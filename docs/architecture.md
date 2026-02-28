# Architecture Q&A

## 1) What is load balancing?
Load balancing is the process of distributing incoming client requests across multiple backend servers instead of sending all traffic to a single server.

In this project, the load balancer receives the request first, selects one healthy backend using a chosen algorithm, forwards the request, then returns the backend response to the client.

### Why it matters
- Prevents one server from becoming a bottleneck.
- Improves availability because traffic can continue if one instance fails.
- Improves scalability by adding more backend instances as demand grows.

---

## 2) Why use a reverse proxy here?
A reverse proxy sits between clients and backend services. Clients only talk to the load balancer endpoint, not directly to individual backend servers.

### Benefits in this simulator
- Centralized routing logic in one place.
- Backends are hidden behind a single public entry point.
- Easier to add cross-cutting concerns (logging, metrics, health-based filtering).
- Enables consistent behavior regardless of which backend serves a request.

In this repository, the reverse proxy behavior is implemented by the load balancer service that receives requests and forwards them to backend servers.

---

## 3) Why health checks?
Health checks determine which backend servers are currently available. If a server is down or unhealthy, it should be excluded from selection.

### Why this is critical
- Prevents forwarding requests to known-failing nodes.
- Reduces client-facing errors during partial outages.
- Allows automatic recovery when a server becomes healthy again.

In practice, health status is used as a filter step before the load-balancing algorithm chooses a target server.

---

## 4) Why separate algorithms into their own modules?
Separating algorithms from request forwarding and server lifecycle code keeps concerns clean and makes the system easier to evolve.

### Advantages of separation
- **Extensibility:** add new strategies without rewriting forwarding logic.
- **Testability:** each algorithm can be tested independently.
- **Maintainability:** changes in selection logic do not affect networking or middleware.
- **Comparability:** easy to switch and benchmark strategies like Round Robin vs Least Connections.

This project follows that pattern by placing algorithm implementations in a dedicated `load-balancer/src/algorithms` directory.

---

## Request flow in this project (mental model)
Client → Load Balancer Route → Algorithm Selection → Healthy Server Filter → Request Forwarder → Backend Server → Response → Metrics Update → Client