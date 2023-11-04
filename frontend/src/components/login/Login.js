import React, { useState, useRef } from 'react';
import './style.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email)
  }

  const handlePasswordChange = (p) => {
      setPassword(p.target.value);
  }

  const handleNameChange = (n) => {
    setName(n.target.value);
    // console.log(name);
  }

  async function handleSignIn(){
    if(email && password){
      const user = {email, password};
      await axios.post("http://localhost:5001/login", user)
      .then(res => {
        alert("dgsdfgdfg");
        if(res.data === "User not found"){
          alert("User not registered!");
          // navigate('/login')
        }
        else{
          console.log('good here');
          alert("You have succesfully logged in");
          navigate('/home');        
      }
        // else if(res.data){alert(res.data);}
      })
    }
    else{
      alert("Invalid Input");
    }
  }

  async function handleSignUp(){
    const user = {name , email, password};
    // console.log(user);
    if(name && email && password){
      await axios.post("http://localhost:5001/register", user)
      .then(res => {
        alert("You have successfully registered");
        setIsSignUp(!isSignUp);
      })
    }
    else{
      alert("Invalid Input");
    }
  }

  const toggleForm = () => {
      if(isSignUp){containerRef.current.classList.add('active');}
      else{containerRef.current.classList.remove('active');}
      setIsSignUp(!isSignUp);
    }

  return (
    <div ref={containerRef} className="container">
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        <form>
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <div className="social-icons">
            <a href="/" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="/" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="/" className="icon"><i className="fab fa-github"></i></a>
            <a href="/" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          {!isSignUp && <span>or use your email for registration</span>}
          {isSignUp && <input type="text" onChange={handleNameChange} placeholder="Name" />}
          <input type="email" onChange={handleEmailChange} placeholder="Email" />
          <input type="password" onChange={handlePasswordChange} placeholder="Password" />
          {!isSignUp && <a href="/">Forget Your Password?</a>}
          <input type="submit" value={isSignUp ? 'Sign Up' : 'Sign In'} onClick={isSignUp? handleSignUp : handleSignIn} className="button" />
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>Sign Up</button>
          </div>
          <div className={`toggle-panel toggle-right ${!isSignUp ? 'active' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
