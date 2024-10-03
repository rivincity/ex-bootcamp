import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  let counter = 0;

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    generateNewCaptcha();
    hoverRef(buttonRef);
    // hoverRef(nameRef);
    // hoverRef(passwordRef);
    // hoverRef(captchaRef);
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

  const hoverRef = (ref: React.RefObject<HTMLDivElement | HTMLButtonElement | HTMLInputElement>) => {
    if (ref.current && counter < 4) {
      ref.current.addEventListener("mouseover", () => {
        if (ref.current) { // Adding this check to ensure ref.current is not null inside the event listener
          const randomX = Math.floor(Math.random() * (window.innerWidth - ref.current.offsetWidth));
          const randomY = Math.floor(Math.random() * (window.innerHeight - ref.current.offsetHeight));

          ref.current.style.position = 'absolute';
          ref.current.style.left = `${randomX}px`;
          ref.current.style.top = `${randomY}px`;
        }
      });
      counter++;
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
          <div id="name" ref={nameRef}>
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
          <div id="password" ref={passwordRef}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div id="captcha" ref={captchaRef}>
            <label htmlFor="captcha">{captchaQuestion}</label>
            <input
              type="text"
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
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
          <button type="submit" ref={buttonRef}>Enter</button>
        </form>
      )}
    </div>
  );
};

export default App;
