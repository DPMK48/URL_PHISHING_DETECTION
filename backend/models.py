from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime

db = SQLAlchemy()

class URLLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    result = db.Column(db.String(20), nullable=False)
    reasons = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<URLLog {self.url} - {self.result}>"
