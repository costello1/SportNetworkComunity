// src/components/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1>Grazie per aver completato il questionario!</h1>
        <p>La tua partecipazione è molto apprezzata.</p>
        <div class="powered-by">Powered by T&I - AI Department</div>
      </div>
    </div>
  );
};

export default ThankYou;
