import React, { useState } from "react";
import Quiz from "./Quiz";
import Tips from "./Tips";
import Examples from "./Examples";

const Learn = () => {
  const [activeTab, setActiveTab] = useState("tips");

  return (
    <div className="learn-container">
      <div className="tabs">
        <button
          className={activeTab === "tips" ? "active" : ""}
          onClick={() => setActiveTab("tips")}
        >
          Tips
        </button>
        <button
          className={activeTab === "examples" ? "active" : ""}
          onClick={() => setActiveTab("examples")}
        >
          Examples
        </button>
        <button
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          Quiz
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "tips" && <Tips />}
        {activeTab === "examples" && <Examples />}
        {activeTab === "quiz" && <Quiz />}
      </div>
    </div>
  );
};

export default Learn;
