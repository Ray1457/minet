Setup (Frontend + Backend)

This repo has a React frontend (client) and a Flask backend (backend). Follow these steps to run both locally on Windows (PowerShell).

## Prerequisites
- Node.js LTS (includes npm)
- Python 3.11+ (with pip)

## 1) Start the Backend (Flask)
```powershell
# From the repo root
cd .\backend

# Create & activate virtual environment (recommended)
python -m venv .venv
. .\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the API (http://127.0.0.1:5000)
python .\app.py
```
Health check: http://127.0.0.1:5000/api/health

Uploads are served from: http://127.0.0.1:5000/uploads/<filename>

## 2) Start the Frontend (React + Vite)
```powershell
# In a new PowerShell window, from the repo root
cd .\client
npm install
npm run dev
```
The dev server prints a local URL (usually http://127.0.0.1:5173 or http://localhost:5173).

## Dev Proxy (no CORS needed)
Vite is configured to proxy API and uploads to Flask during development:
- /api -> http://127.0.0.1:5000
- /uploads -> http://127.0.0.1:5000

So the frontend can call `fetch('/api/...')` and use image URLs like `/uploads/<file>` without extra CORS config.

## Production (brief)
- Frontend: build static assets
```powershell
cd .\client
npm run build
```
This produces `client/dist`. Serve it with any static server or behind a reverse proxy (e.g., Nginx).

- Backend: run with a production WSGI server (e.g., gunicorn/uvicorn via `pip install gunicorn`/`uvicorn`), and reverse proxy `/api` and `/uploads` from your web server to the backend. Keep `backend/uploads/` on persistent storage.

## Notes
- If Flask imports fail, ensure the venv is activated before running `python .\app.py`.
- If ports are busy, either close the process using the port or change the port (Vite supports `--port`, Flask via env `PORT`).
