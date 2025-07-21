import React from 'react';
import Learn from './Learn';
import Examples from './Examples';
import Tips from './Tips';
import Quiz from './Quiz';

const LearnSection = () => (
      <div className="learning-section" id="learn">
      <h2>Phishing Awareness</h2>
      <p className="subtext">Learn to identify and avoid phishing scams</p>
        <Learn />
      
    </div>
);

export default LearnSection;
