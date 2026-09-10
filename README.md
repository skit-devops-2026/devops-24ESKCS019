# 🏠 RealEstate – Property Discovery Platform

[![CI Pipeline](https://github.com/skit-devops-2026/devops-24ESKCS019/actions/workflows/ci.yml/badge.svg)](https://github.com/skit-devops-2026/devops-24ESKCS019/actions/workflows/ci.yml)
[![Repository Status](https://img.shields.io/badge/DevOps-MT1%20Completed-brightgreen)](https://github.com/skit-devops-2026/devops-24ESKCS019)

A modern and responsive **Real Estate Property Discovery Platform** developed as part of the DevOps Course (Modules 1–4). The application provides an intuitive interface for users to discover properties, apply filters, save favourite properties, view detailed property cards, and list new properties.

---

## 🌐 Live Repository

- **Repository URL**: [https://github.com/skit-devops-2026/devops-24ESKCS019](https://github.com/skit-devops-2026/devops-24ESKCS019)
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
│       └── ci.yml          # GitHub Actions CI Workflow
├── tests/
│   ├── __init__.py
│   ├── test_properties.py # Unit tests for application logic & data
│   └── test_html_structure.py # Unit tests for DOM & HTML metadata
├── index.html              # Main frontend HTML markup
├── style.css               # Application stylesheet
├── script.js               # Interactive JavaScript logic
├── Jenkinsfile             # Jenkins Declarative CI/CD Pipeline
├── .gitignore              # Ignored files and build artifacts
└── README.md               # Project documentation
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
- **Assignment**: MT1 (Modules 1–4)

---

## 📄 License

Developed for academic and educational evaluation.
