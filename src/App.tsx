import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const hoverRef = (ref: any) => {
    if(ref.current) {
      ref.current.addEventListener("mouseover", () => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - ref.current.offsetWidth));
        const randomY = Math.floor(Math.random() * (window.innerHeight - ref.current.offsetHeight));

        ref.current.style.position = 'absolute';
        ref.current.style.left = `${randomX}px`;
        ref.current.style.top = `${randomY}px`;
      });
    }
  };

  useEffect(() => {
    /*hoverRef(nameRef);
    hoverRef(emailRef);
    hoverRef(passwordRef);*/
    hoverRef(buttonRef);
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div id = "name" ref = {nameRef}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div id = "email" ref = {emailRef}>
            <label htmlFor="name">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div id = "password" ref = {passwordRef}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" ref = {buttonRef}>Enter</button>
        </form>
      )}
    </div>
  );
};

export default App;
