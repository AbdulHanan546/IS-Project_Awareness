import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import '../styles/SecurityPuzzles.css';

const puzzles = [
  {
    id: 1,
    type: 'password-strength',
    question: 'Arrange these passwords from weakest to strongest:',
    options: [
      { id: 'p1', text: 'password123' },
      { id: 'p2', text: 'P@ssw0rd!' },
      { id: 'p3', text: 'MyDogName2023' },
      { id: 'p4', text: 'Xk9#mP2$vL5@nQ8' }
    ],
    correctOrder: ['p1', 'p3', 'p2', 'p4'],
    explanation: 'Strong passwords should: 1) Be at least 12 characters long, 2) Include uppercase and lowercase letters, 3) Include numbers and special characters, 4) Not contain common words or patterns'
  },
  {
    id: 2,
    type: 'network-security',
    question: 'Which of these network security measures are most effective?',
    options: [
      'Using public WiFi without VPN',
      'Enabling two-factor authentication',
      'Sharing passwords with colleagues',
      'Regular software updates'
    ],
    correctAnswers: ['Enabling two-factor authentication', 'Regular software updates'],
    explanation: 'Effective network security requires multiple layers: 1) Two-factor authentication adds an extra security layer, 2) Regular updates patch security vulnerabilities, 3) Public WiFi should be avoided or used with VPN, 4) Passwords should never be shared'
  },
  {
    id: 3,
    type: 'social-engineering',
    question: 'Identify the social engineering tactics in this scenario:',
    scenario: 'A caller claiming to be from IT support asks for your password to fix a "critical system issue"',
    redFlags: [
      'Requesting password over phone',
      'Creating sense of urgency',
      'Claiming to be from IT without verification',
      'Asking for sensitive information'
    ],
    explanation: 'Common social engineering tactics include: 1) Impersonating authority figures, 2) Creating false urgency, 3) Requesting sensitive information, 4) Using fear or pressure tactics'
  }
];

const SecurityPuzzles = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [passwordOrder, setPasswordOrder] = useState(puzzles[0].options);

  const handlePasswordOrder = () => {
    const currentOrder = passwordOrder.map(item => item.id);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(puzzles[currentPuzzle].correctOrder);
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleMultipleChoice = (selected) => {
    const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(puzzles[currentPuzzle].correctAnswers.sort());
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleSocialEngineering = (selected) => {
    setSelectedAnswers(selected);
    const isCorrect = selected.length === puzzles[currentPuzzle].redFlags.length && 
                     selected.every(flag => puzzles[currentPuzzle].redFlags.includes(flag));
    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextPuzzle = () => {
    setShowExplanation(false);
    setSelectedAnswers([]);
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setPasswordOrder(puzzles[currentPuzzle + 1].options);
    }
  };

  const renderPuzzle = () => {
    const puzzle = puzzles[currentPuzzle];
    
    switch (puzzle.type) {
      case 'password-strength':
        return (
          <div className="password-puzzle">
            <h3>{puzzle.question}</h3>
            <div className="password-options">
              <Reorder.Group values={passwordOrder} onReorder={setPasswordOrder}>
                {passwordOrder.map((option) => (
                  <Reorder.Item key={option.id} value={option}>
                    <div className="password-option">
                      {option.text}
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            <button onClick={handlePasswordOrder}>Check Answer</button>
          </div>
        );
      
      case 'network-security':
        return (
          <div className="network-puzzle">
            <h3>{puzzle.question}</h3>
            <div className="network-options">
              {puzzle.options.map((option, index) => (
                <label key={index} className="network-option">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const newSelected = e.target.checked
                        ? [...selectedAnswers, option]
                        : selectedAnswers.filter(item => item !== option);
                      setSelectedAnswers(newSelected);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={() => handleMultipleChoice(selectedAnswers)}>Submit</button>
          </div>
        );
      
      case 'social-engineering':
        return (
          <div className="social-puzzle">
            <h3>{puzzle.question}</h3>
            <p className="scenario">{puzzle.scenario}</p>
            <div className="red-flags">
              {puzzle.redFlags.map((flag, index) => (
                <label key={index} className="red-flag">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const newSelected = e.target.checked
                        ? [...selectedAnswers, flag]
                        : selectedAnswers.filter(item => item !== flag);
                      setSelectedAnswers(newSelected);
                    }}
                  />
                  {flag}
                </label>
              ))}
            </div>
            <button onClick={() => handleSocialEngineering(selectedAnswers)}>Submit</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="puzzles-container">
      <h2>Security Puzzles</h2>
      <div className="score">Score: {score}/{puzzles.length}</div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPuzzle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="puzzle-card"
        >
          {renderPuzzle()}
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="explanation"
            >
              <h4>Explanation:</h4>
              <p>{puzzles[currentPuzzle].explanation}</p>
              {currentPuzzle < puzzles.length - 1 && (
                <button onClick={nextPuzzle}>Next Puzzle</button>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SecurityPuzzles; 