🛡️ Web-Based URL Phishing Detection & Cyber Security Awareness
This project is a full-stack web application that detects phishing URLs using rule-based heuristics, stores logs in a database, and allows users to download logs as a CSV. Built with Flask (backend) and React (frontend).

🧩 Project Structure
graphql
Copy
Edit
web_url_phishing_detection/
├── backend/
│   ├── app.py               # Flask entry point
│   ├── rules.py             # Heuristic phishing detection logic
│   ├── models.py            # SQLAlchemy model for URL logs
│   ├── database.db          # SQLite database (auto-generated)
│   ├── export.py       # CSV export utility
│   └── requirements.txt     # Backend dependencies (optional)
├── frontend/
│   ├── public/
│   ├── src/
│   │   │── main.jsx        # Main React UI
|   |   |── App.jsx 
│   │   ├── App.css
│   │   └── index.css        # CSS styles
|   |── index.html
├── README.md
🚀 Features
🔍 Phishing URL Detection — Based on a rule-based engine

💾 Log History — Automatically logs all checks to a local SQLite database

📤 Export as CSV — Download all past logs easily

⚛️ React Frontend — Clean one-page interface

🧠 Cybersecurity Awareness — Displays rules triggered in each URL

🔧 Setup Instructions
1. ✅ Requirements
Python 3.8+

Node.js + npm

SQLite (default, no setup needed)

2. 🔙 Backend Setup (Flask API)
📦 Install Python dependencies
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install flask flask-cors flask-sqlalchemy
▶️ Run Flask
bash
Copy
Edit
python app.py
The backend will run at: http://127.0.0.1:5000

3. 🌐 Frontend Setup (React + CSS)
Create Vite App & Install
bash
Copy
Edit
cd frontend
npm install
npm run dev
Visit: http://localhost:5173

📤 Export Logs (CSV)
Visit http://127.0.0.1:5000/export to download past checks as a .csv file.

📡 API Routes
Method	Route	Description
POST	/predict	Checks if a URL is safe
GET	/export	Exports logs as CSV file
