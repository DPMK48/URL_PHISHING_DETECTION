import React, { useState } from "react";
import "./index.css";
import "./App.css";
import Header from "./components/header";
import LearnSection from "./components/LearnSection";

const App = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault(); 
    if (!url) return;

    setLoading(true);
    setResult("");
    setReasons([]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data.result);
      setReasons(data.reasons);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/export`, "_blank");
  };

  return (
    <>
      <Header />
      <div className="hero-section">
        <div className="wrapper">
          <h1 className="title">Protect Your Data in A More Effective Way</h1>
          <p>Detect phishing URLs in real-time</p>

          <form action="" onSubmit={handleCheck} className="input-area">
            <input
              type="text"
              placeholder="Enter URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />

            <button type="submit" className="btn" disabled={loading}>
              {/* {loading ? "Scan" : "Scan"} */}
              scan
            </button>
          </form>
          {loading && (
            <div className="load">
              <div className="ring"></div>
              <span>Scanning...</span>
            </div>
          )}

          {result && (
            <div
              className={`result ${result === "Phishing" ? "red" : "green"}`}
            >
              Result: {result}
            </div>
            
          )}

          {reasons.length > 0 && (
            <table className="reasons-table">
              <thead>
                <tr>
                  <th>Triggered Rules</th>
                </tr>
              </thead>
              <tbody>
                {reasons.map((reason, index) => (
                  <tr key={index}>
                    <td>{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {result && (
  <button onClick={handleDownload} className="download-btn">
    Download Logs as CSV
  </button>
)}
          
        </div>
      </div>
      <LearnSection />
    </>
  );
};

export default App;
