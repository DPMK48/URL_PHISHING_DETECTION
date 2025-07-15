import pandas as pd
from models import URLLog, db
import os

def export_logs_to_csv(filename='url_logs.csv'):
    logs = URLLog.query.all()
    data = [{
        'URL': log.url,
        'Result': log.result,
        'Reasons': log.reasons,
        'Timestamp': log.timestamp
    } for log in logs]

    df = pd.DataFrame(data)
    filepath = os.path.join(os.getcwd(), filename)
    df.to_csv(filepath, index=False)
    return filepath
