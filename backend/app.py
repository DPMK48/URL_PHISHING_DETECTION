from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from models import db, URLLog
from rules import check_url
import os
from export import export_logs_to_csv

app = Flask(__name__)
CORS(app)  # Optional: Allow cross-origin for frontend

# Configure SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "🛡️ Phishing Detection API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    result, reasons = check_url(url)

    # Save to database
    log = URLLog(url=url, result=result, reasons=', '.join(reasons))
    db.session.add(log)
    db.session.commit()

    return jsonify({
        'result': result,
        'reasons': reasons
    })

@app.route('/export', methods=['GET'])
def export():
    filepath = export_logs_to_csv()
    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
