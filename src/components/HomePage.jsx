import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  waleed
  return (
    <div className="home-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <h1>Cyber Security Awareness Game</h1>
        <p>Learn about cyber security through interactive quizzes and puzzles</p>
      </motion.div>

      <div className="features-grid">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <h2>Phishing Quiz</h2>
          <p>Test your ability to spot phishing attempts</p>
          <Link to="/phishing-quiz" className="cta-button">Start Quiz</Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <h2>Security Puzzles</h2>
          <p>Solve puzzles to learn about cyber security</p>
          <Link to="/security-puzzles" className="cta-button">Start Puzzles</Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <h2>More Quizzes</h2>
          <p>Test your knowledge on various security topics</p>
          <Link to="/additional-quizzes" className="cta-button">Start Learning</Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="stats-section"
      >
        <div className="stat-item">
          <h3>100+</h3>
          <p>Scenarios</p>
        </div>
        <div className="stat-item">
          <h3>Interactive</h3>
          <p>Learning</p>
        </div>
        <div className="stat-item">
          <h3>Real-world</h3>
          <p>Examples</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage; 