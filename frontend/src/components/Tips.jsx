import React from "react";

const Tips = () => {
  return (
    <div className="tips-card card">
      <p className="card-title">Tips 💡</p>
      <div className="card-body">
        <p className="card-subtitle">Phishing Preventive Tips</p>
        <ul>
          <li>Always check the sender's email address</li>
          <li>Do not click suspicious links</li>
          <li>Enable 2-factor authentication (2FA) for all your accounts.</li>
          <li>
            Ensure websites use HTTPS before entering any sensitive information.
          </li>
          <li>
            ❌ Don’t download attachments from unknown or suspicious sources.
          </li>
          <li>Educate yourself regularly on new phishing methods and scams.</li>
        </ul>
      </div>
    </div>
  );
};

export default Tips;
