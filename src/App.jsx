import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PhishingQuiz from './components/PhishingQuiz';
import SecurityPuzzles from './components/SecurityPuzzles';
import './App.css';
import './styles/HomePage.css';
import './styles/PhishingQuiz.css';
import './styles/SecurityPuzzles.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-brand">Cyber Security Game</Link>
        <div className="nav-links">
          <Link to="/phishing-quiz">Phishing Quiz</Link>
          <Link to="/security-puzzles">Security Puzzles</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phishing-quiz" element={<PhishingQuiz />} />
          <Route path="/security-puzzles" element={<SecurityPuzzles />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
