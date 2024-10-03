import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Counter to track the number of times the button has moved
  const buttonMoveCount = useRef<number>(0);

  useEffect(() => {
    generateNewCaptcha();
    // Apply hover effect to the button
    hoverRef(buttonRef);
  }, []);

  const handleUsernameClick = () => {
    const randomNames = [
      "CoolDude123",
      "SparklyUnicorn47",
      "NinjaWarrior89",
      "SilentSinger",
      "MysteryFox304",
      "HappyPuppy",
      "CleverCat",
      "WiseOwl987",
      "EagerElephant",
      "JollyGiraffe",
    ];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    setName(randomNames[randomIndex]);
  };

  const generateNewCaptcha = () => {
    const randomNumber1 = Math.floor(Math.random() * 10000) + 1;
    const randomNumber2 = 0; // Always dividing by zero for an impossible answer
    setCaptchaQuestion(`What is ${randomNumber1} / ${randomNumber2}?`);
  };

  const hoverRef = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", () => {
        if (ref.current && buttonMoveCount.current < 3) {
          const randomX = Math.floor(Math.random() * (window.innerWidth - ref.current.offsetWidth));
          const randomY = Math.floor(Math.random() * (window.innerHeight - ref.current.offsetHeight));

          ref.current.style.position = 'absolute';
          ref.current.style.left = `${randomX}px`;
          ref.current.style.top = `${randomY}px`;

          buttonMoveCount.current += 1; // Increment the move count
        }
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password && captcha.toLowerCase() === 'undefined') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect captcha! Hint: dividing by zero is impossible.');
      setCaptcha(''); // Clear captcha input for retry
      generateNewCaptcha();
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
              onClick={handleUsernameClick}
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
            <label htmlFor="captcha">{captchaQuestion}</label>
            <input
              type="text"
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
            />
          </div>
          <button type="submit" ref={buttonRef}>Enter</button>
        </form>
      )}
    </div>
  );
};

export default App;
