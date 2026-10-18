# 🏠 RealEstate – Property Discovery Platform

[![CI Pipeline](https://github.com/skit-devops-2026/devops-24ESKCS019/actions/workflows/ci.yml/badge.svg)](https://github.com/skit-devops-2026/devops-24ESKCS019/actions/workflows/ci.yml)
[![Repository Status](https://img.shields.io/badge/DevOps-MT1%20Completed-brightgreen)](https://github.com/skit-devops-2026/devops-24ESKCS019)

A modern and responsive **Real Estate Property Discovery Platform** developed as part of the DevOps Course (Modules 1–4). The application provides an intuitive interface for users to discover properties, apply filters, save favourite properties, view detailed property cards, and list new properties.

---

## 🚀 Live Demo

**Primary Live URL**: [https://devops-24eskcs019.onrender.com](https://devops-24eskcs019.onrender.com)

| Endpoint | URL |
|---|---|
| Live Application (Render) | https://devops-24eskcs019.onrender.com |
| Live Application (Vercel) | https://devops-24eskcs019.vercel.app |
| GitHub Pages (Static) | https://skit-devops-2026.github.io/devops-24ESKCS019/ |
| Health Check | https://devops-24eskcs019.onrender.com/health |
| Prometheus Metrics | https://devops-24eskcs019.onrender.com/metrics |

---

## 🌐 Live Repository & Container Registry

- **Repository URL**: [https://github.com/skit-devops-2026/devops-24ESKCS019](https://github.com/skit-devops-2026/devops-24ESKCS019)
- **GitHub Container Registry (GHCR) Package**: [https://github.com/skit-devops-2026/devops-24ESKCS019/pkgs/container/devops-24eskcs019](https://github.com/skit-devops-2026/devops-24ESKCS019/pkgs/container/devops-24eskcs019)
- **Container Registry Image Tag**: `ghcr.io/skit-devops-2026/devops-24eskcs019:latest`
- **Docker Hub Repository**: `adityajoshi/devops-24eskcs019:latest`
- **Course**: DevOps (24ESKCS019)

---

## 📌 Project Overview

**RealEstate** is a web-based property discovery platform designed to simplify searching and exploring residential and commercial properties.

Key Features:
- 🔍 **Search Properties** by location, keyword, or title.
- 🏢 **Filter Properties** by type (Apartments, Villas, Penthouses, Commercial).
- 💰 **Filter by Price Range** and bedroom count (BHK).
- 🛋️ **Furnishing Status Filters** (Furnished, Semi-Furnished, Unfurnished).
- ❤️ **Wishlist Integration** to save favourite properties.
- 📋 **Property Details View** with complete metadata.
- 🏡 **Submit Property Listings** through an interactive modal.
- 🔐 **Authentication UI** for Sign In, Account Creation, and Password Reset.
- 📱 **Multiple Layout Views** (Grid View, List View, and Map View).
- 🎥 **Virtual Property Tours** modal support.

---

## 🛠️ Technologies Used

| Technology / Tool | Purpose |
| ----------------- | ------- |
| **HTML5 & CSS3**  | Structured markups, responsive styling, flex/grid layouts |
| **JavaScript (ES6+)** | Frontend application logic, DOM manipulation, state management |
| **Python & unittest** | Automated unit testing framework for project validation |
| **GitHub Actions** | Automated CI pipeline for continuous integration testing |
| **Jenkins**       | Declarative Jenkinsfile pipeline automation |
| **Font Awesome & Google Fonts** | UI icons and modern typography |

---

## 📂 Project Structure

```text
devops-24ESKCS019/
├── .github/
│   └── workflows/
│       ├── ci.yml              # GitHub Actions CI Workflow
│       ├── docker-ci.yml       # Docker build & push to GHCR/Docker Hub
│       └── deploy-pages.yml    # GitHub Pages deployment
├── k8s/
│   ├── deployment.yaml         # Kubernetes Deployment (GHCR image, 2 replicas)
│   ├── service.yaml            # Kubernetes NodePort Service (port 30005)
│   └── mongo.yaml              # MongoDB Deployment + PVC + ClusterIP Service
├── monitoring/
│   ├── prometheus.yml          # Prometheus scrape config for /metrics endpoint
│   ├── dashboard.json          # Grafana dashboard (7 panels: status, CPU, memory, requests)
│   └── grafana-provisioning/   # Auto-provisioned datasource & dashboard for Grafana
├── docs/
│   ├── deployment.png          # Screenshot: live deployment proof
│   └── kubernetes-pods.png     # Screenshot: kubectl get pods output
├── tests/
│   ├── test_properties.py      # Unit tests for application logic
│   └── test_html_structure.py  # Unit tests for HTML metadata
├── Dockerfile                  # Production Node.js Docker image (node:20-alpine)
├── docker-compose.yml          # Multi-service compose: app + MongoDB + Prometheus + Grafana
├── index.html                  # Main frontend HTML
├── style.css                   # Application stylesheet
├── script.js                   # Frontend JavaScript logic
├── server.js                   # Express backend server
├── Jenkinsfile                 # Jenkins Declarative CI/CD Pipeline
├── package.json                # Node.js dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/skit-devops-2026/devops-24ESKCS019.git
cd devops-24ESKCS019
```

### 2. Run the Web Application

Since this is a client-side frontend project, open `index.html` in any modern web browser or run using VS Code Live Server / Python HTTP server:

```bash
# Using Python builtin HTTP server
python -m http.server 8000
```

Then visit `http://localhost:8000` in your web browser.

---

## 🧪 Running Automated Tests

The repository includes an automated Python test suite under the `tests/` directory:

```bash
# Run unit tests locally
python -m unittest discover -s tests -p "test_*.py" -v
```

All tests execute automatically on every push and pull request via **GitHub Actions CI**.

---

## ⚙️ CI/CD & Automation Pipelines

### GitHub Actions CI Pipeline (`.github/workflows/ci.yml`)
- Triggers automatically on `push` and `pull_request` to `main` and feature branches.
- Sets up Python environment, verifies dependencies, and executes unit test suite.

### Jenkins Pipeline (`Jenkinsfile`)
- Declarative pipeline with standard stages:
  1. **Checkout**: Retrieves source code.
  2. **Environment & Setup**: Verifies tool versions and workspace setup.
  3. **Lint & Validation**: Validates file integrity and HTML structure.
  4. **Automated Unit Tests**: Runs the test suite via `python -m unittest`.
  5. **Build Artifacts**: Prepares build bundle summary.

---

## 👨‍💻 Author & Course Information

- **Student / Author**: Aditya Joshi
- **Repository Owner**: `skit-devops-2026`
- **Course**: DevOps (24ESKCS019)
- **Assignment**: Mid-Term 2 (Modules 5–7: Containerization & Kubernetes Orchestration)

---

## 🐳 Mid-Term 2 Deployment & Kubernetes Guide

### 1. Docker Image Build & Push (GHCR & Docker Hub)
```powershell
# Build Docker Image
docker build -t devops-24eskcs019:latest .

# Tag & Push to GitHub Container Registry (GHCR)
docker tag devops-24eskcs019:latest ghcr.io/skit-devops-2026/devops-24eskcs019:latest
docker push ghcr.io/skit-devops-2026/devops-24eskcs019:latest

# Tag & Push to Docker Hub
docker tag devops-24eskcs019:latest adityajoshi/devops-24eskcs019:latest
docker push adityajoshi/devops-24eskcs019:latest
```

### 2. Deploy to Kubernetes
```powershell
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 3. Verify Cluster & Live Endpoint
```powershell
kubectl get pods
kubectl get deployments
kubectl get services
curl http://localhost:5000/health
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

