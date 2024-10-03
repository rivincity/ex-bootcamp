import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <a
                href="https://www.youtube.com/watch?v=oHg5SJYRHA0&list=PL8dZXjD8meS_WZzEKSReIBPLzKaW3HboH&index=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot Password?
            </a>
          </div>
          <button type="submit">Enter</button>
        </form>
      )}
    </div>
  );
};

export default App;
