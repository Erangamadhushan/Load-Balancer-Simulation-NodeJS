# 🚀 Node.js Load Balancer Simulator

A custom-built reverse proxy and load balancing engine built from scratch in Node.js.

![Node](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Axios](https://img.shields.io/badge/Axios-1.13.x-yellow)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Quick Pitch (60 seconds)

This project demonstrates a **production-style load balancer built from the ground up in Node.js** without relying on nginx or cloud services. It intercepts client traffic, checks backend health, applies pluggable algorithms (Round Robin, Least Connections), and forwards requests to available servers. Perfect for learning distributed systems, interview prep, or prototyping custom routing logic.

**Key takeaway:** I'll see how real load balancers work internally—health checks, metrics tracking, algorithm selection, and transparent proxying—all implemented in clean, readable JavaScript.

---

## ✨ Features

- **Round Robin & Least Connections** algorithms
- **Health-based filtering** to avoid dead nodes
- **Request forwarding proxy** with full HTTP pass-through
- **Metrics tracking** for connections and response times
- **Stress testing support** via Artillery
- **Docker-ready** for isolated multi-server setup

---

## 📂 Project Structure

```
load-balancer/src/
  ├── algorithms/        # Round Robin, Least Connections
  ├── services/          # Health checks, metrics, forwarding
  ├── config/            # Backend server definitions
  └── app.js             # Main entry point

backend-servers/         # Three mock Express servers
stress-test/             # Artillery load test configs
docker/                  # Compose + Dockerfiles
docs/                    # Architecture & algorithm explanations
```

---

## 🚀 Request Flow

Client → Load Balancer Route → Algorithm Selection → Healthy Server Filter → Request Forwarder → Backend Server → Response → Metrics Update → Client