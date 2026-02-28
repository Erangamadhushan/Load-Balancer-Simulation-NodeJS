# 🚀 Node.js Load Balancer Simulator

A custom-built reverse proxy and load balancing engine built from scratch in Node.js.

![Node](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- Round Robin Load Balancing
- Request Forwarding Proxy
- Stress Testing Support

---

## 📋 Pull Request Description

### Summary

This pull request introduces a complete Node.js Load Balancer Simulation that distributes incoming HTTP requests across multiple backend servers using the **Round Robin** algorithm.

### 🔀 Changes Introduced

#### New Files

| File | Description |
|------|-------------|
| `load-balancer/index.js` | Core load balancer that listens on port `3000` and forwards requests to backend servers in round-robin order using `axios` |
| `server1/index.js` | Backend server 1 listening on port `3001` — responds with server identity and timestamp |
| `server2/index.js` | Backend server 2 listening on port `3002` — responds with server identity and timestamp |
| `server3/index.js` | Backend server 3 listening on port `3003` — responds with server identity and timestamp |
| `package.json` | Project manifest declaring `express` and `axios` as dependencies |
| `package-lock.json` | Locked dependency tree for reproducible installs |
| `.gitignore` | Excludes `node_modules/` from version control |

### 🏗️ Architecture

```
Client
  │
  ▼
Load Balancer (port 3000)  ──── Round Robin ────►  Server 1 (port 3001)
                                                 ├─► Server 2 (port 3002)
                                                 └─► Server 3 (port 3003)
```

The load balancer maintains a simple counter (`current`) that cycles through the list of registered backend servers on every incoming request.

### ⚙️ How It Works

1. The load balancer receives a `GET /` request on port `3000`.
2. It selects the next backend server using round-robin (`current = (current + 1) % servers.length`).
3. It forwards the request to the chosen server via `axios.get()`.
4. It returns a JSON response to the client containing the target server URL and the server's own response payload.

### 🚀 How to Run

#### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

#### Installation

```bash
npm install
```

#### Start the Backend Servers

Open three separate terminal windows and run each server:

```bash
# Terminal 1
node server1/index.js

# Terminal 2
node server2/index.js

# Terminal 3
node server3/index.js
```

#### Start the Load Balancer

```bash
# Terminal 4
node load-balancer/index.js
```

#### Test the Load Balancer

```bash
curl http://localhost:3000/
```

Each successive request will be routed to the next backend server in rotation.

### 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | `^5.2.1` | HTTP server framework for load balancer and backend servers |
| `axios` | `^1.13.6` | HTTP client used by the load balancer to forward requests |

### ✅ Testing

Send multiple requests to observe round-robin routing:

```bash
for i in 1 2 3 4 5 6; do curl -s http://localhost:3000/ | python3 -m json.tool; done
```

Expected output cycles through `Server 1`, `Server 2`, `Server 3` in order.