import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AdditionalQuizzes.css';

const quizzes = [
  {
    id: 1,
    type: 'password-security',
    title: 'Password Security Quiz',
    questions: [
      {
        question: 'Which of these is the strongest password?',
        options: [
          'Password123!',
          'MyDogName2023',
          'Xk9#mP2$vL5@nQ8',
          'ILoveMyCat123'
        ],
        correctAnswer: 'Xk9#mP2$vL5@nQ8',
        explanation: 'A strong password should be at least 12 characters long, include uppercase and lowercase letters, numbers, and special characters, and not contain common words or patterns.'
      },
      {
        question: 'How often should you change your passwords?',
        options: [
          'Every week',
          'Every month',
          'Every 3 months',
          'Only when you suspect a breach'
        ],
        correctAnswer: 'Only when you suspect a breach',
        explanation: 'Modern security best practices recommend changing passwords only when you suspect a breach. Instead, focus on using strong, unique passwords and enabling two-factor authentication.'
      }
    ]
  },
  {
    id: 2,
    type: '2fa',
    title: 'Two-Factor Authentication Quiz',
    questions: [
      {
        question: 'Which of these is NOT a valid 2FA method?',
        options: [
          'SMS code',
          'Authenticator app',
          'Security questions',
          'Biometric verification'
        ],
        correctAnswer: 'Security questions',
        explanation: 'Security questions are not considered a true 2FA method as they are something you know, just like your password. 2FA requires two different types of authentication factors.'
      },
      {
        question: 'What should you do if you lose your 2FA device?',
        options: [
          'Create a new account',
          'Use backup codes',
          'Contact customer support',
          'Both B and C'
        ],
        correctAnswer: 'Both B and C',
        explanation: 'Always keep your backup codes in a safe place. If you lose your 2FA device, you can use these codes or contact customer support for account recovery.'
      }
    ]
  },
  {
    id: 3,
    type: 'social-media',
    title: 'Social Media Security Quiz',
    questions: [
      {
        question: 'What information should you never share on social media?',
        options: [
          'Your pet\'s name',
          'Your mother\'s maiden name',
          'Your favorite color',
          'Your current location'
        ],
        correctAnswer: 'Your mother\'s maiden name',
        explanation: 'Your mother\'s maiden name is often used as a security question for account recovery. Sharing it publicly could compromise your account security.'
      },
      {
        question: 'How can you verify if a social media account is legitimate?',
        options: [
          'Check the number of followers',
          'Look for the verified badge',
          'Check the account creation date',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'While no single factor guarantees legitimacy, checking multiple indicators like verification badges, follower count, and account age can help identify fake accounts.'
      }
    ]
  }
];

const AdditionalQuizzes = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizzes[currentQuiz].questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    if (currentQuestion < quizzes[currentQuiz].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setCurrentQuestion(0);
    }
  };

  return (
    <div className="quizzes-container">
      <h2>Security Quizzes</h2>
      <div className="score">Score: {score}</div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuiz}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="quiz-card"
        >
          <h3>{quizzes[currentQuiz].title}</h3>
          <div className="question-container">
            <p className="question">
              {quizzes[currentQuiz].questions[currentQuestion].question}
            </p>
            <div className="options">
              {quizzes[currentQuiz].questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option)}
                  disabled={showExplanation}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="explanation"
            >
              <h4>Explanation:</h4>
              <p>{quizzes[currentQuiz].questions[currentQuestion].explanation}</p>
              <button onClick={nextQuestion}>
                {currentQuestion < quizzes[currentQuiz].questions.length - 1 ? 'Next Question' : 'Next Quiz'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdditionalQuizzes; 