import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/PhishingQuiz.css';

const phishingScenarios = [
  {
    id: 1,
    type: 'email',
    content: {
      subject: 'Urgent: Your Account Security Alert',
      sender: 'security@yourbank.com',
      message: 'We detected unusual activity on your account. Click here to verify your identity: http://fake-bank-security.com',
      attachments: []
    },
    isPhishing: true,
    explanation: "This is a phishing attempt because: 1) The URL doesn't match the bank's official domain, 2) The email creates a sense of urgency, 3) It asks for sensitive information through a link"
  },
  {
    id: 2,
    type: 'email',
    content: {
      subject: 'Your Monthly Statement',
      sender: 'statements@legitimatebank.com',
      message: 'Your monthly statement is ready. Please log in to your secure account to view it.',
      attachments: []
    },
    isPhishing: false,
    explanation: "This is legitimate because: 1) It doesn't contain any suspicious links, 2) It doesn't ask for sensitive information, 3) The sender domain matches the bank's official domain"
  },
  {
    id: 3,
    type: 'website',
    content: {
      url: 'https://www.paypa1.com/login',
      design: 'PayPal-like interface',
      elements: [
        'PayPal logo and header',
        'Login form with email and password fields',
        'Security badge with "Verified by PayPal" text',
        'Remember me checkbox',
        'Forgot password link',
        'Create account button',
        'Footer with copyright and links',
        'SSL certificate indicator'
      ]
    },
    isPhishing: true,
    explanation: "This is a phishing attempt because: 1) The URL contains a typo (paypa1 instead of paypal), 2) The website is trying to mimic PayPal's interface to steal credentials, 3) The security badge is fake, 4) The SSL certificate is likely invalid or self-signed"
  }
];

const PhishingQuiz = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (isPhishing) => {
    if (isPhishing === phishingScenarios[currentScenario].isPhishing) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextScenario = () => {
    setShowExplanation(false);
    if (currentScenario < phishingScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    }
  };

  return (
    <div className="quiz-container">
      <h2>Phishing Quiz</h2>
      <div className="score">Score: {score}/{phishingScenarios.length}</div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="scenario-card"
        >
          {phishingScenarios[currentScenario].type === 'email' ? (
            <div className="email-container">
              <div className="email-header">
                <div className="email-sender">
                  <span className="sender-name">From: {phishingScenarios[currentScenario].content.sender}</span>
                  <span className="sender-email">{phishingScenarios[currentScenario].content.sender}</span>
                </div>
                <div className="email-time">
                  <span>Today</span>
                  <span>2:30 PM</span>
                </div>
              </div>
              <div className="email-subject">
                {phishingScenarios[currentScenario].content.subject}
              </div>
              <div className="email-body">
                <p>{phishingScenarios[currentScenario].content.message}</p>
                {phishingScenarios[currentScenario].content.attachments?.length > 0 && (
                  <div className="email-attachments">
                    {phishingScenarios[currentScenario].content.attachments.map((attachment, index) => (
                      <div key={index} className="attachment">
                        <span className="attachment-icon">📎</span>
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="website-container">
              <div className="website-url">
                {phishingScenarios[currentScenario].content.url}
              </div>
              <div className="website-preview">
                <div className="website-header">
                  <div className="paypal-logo">PayPal</div>
                  <div className="login-tab active">Log In</div>
                  <div className="login-tab">Sign Up</div>
                </div>
                <div className="login-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" />
                  </div>
                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <a href="#" className="forgot-password">Forgot password?</a>
                  </div>
                  <button className="login-button">Log In</button>
                </div>
                <div className="security-badge">
                  <span className="lock-icon">🔒</span>
                  <span>Verified by PayPal</span>
                </div>
                <div className="website-footer">
                  <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Legal</a>
                    <a href="#">Contact</a>
                  </div>
                  <div className="copyright">© 2024 PayPal. All rights reserved.</div>
                </div>
              </div>
            </div>
          )}

          {!showExplanation ? (
            <div className="answer-buttons">
              <button onClick={() => handleAnswer(true)}>Phishing</button>
              <button onClick={() => handleAnswer(false)}>Legitimate</button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="explanation"
            >
              <h4>Explanation:</h4>
              <p>{phishingScenarios[currentScenario].explanation}</p>
              {currentScenario < phishingScenarios.length - 1 && (
                <button onClick={nextScenario}>Next Scenario</button>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PhishingQuiz; 