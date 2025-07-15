import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url) return;

    setLoading(true);
    setResult('');
    setReasons([]);

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data.result);
      setReasons(data.reasons);
    } catch (err) {
      console.error('Error:', err);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    window.open('http://127.0.0.1:5000/export', '_blank');
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🛡️ URL Phishing Detector</h1>

        <input
          type="text"
          placeholder="Enter URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />

        <button
          onClick={handleCheck}
          className="check-btn"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check URL'}
        </button>

        {result && (
          <div className={`result ${result === 'Phishing' ? 'red' : 'green'}`}>
            Result: {result}
          </div>
        )}

        {reasons.length > 0 && (
          <div className="reasons">
            <h3>Triggered Rules:</h3>
            <ul>
              {reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleDownload}
          className="download-btn"
        >
          Download Logs as CSV
        </button>
      </div>
    </div>
  );
};

export default App;
