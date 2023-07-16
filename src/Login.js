import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainlogo from './assets/SignInImages/mainlogo.svg';
import kaninilogo from './assets/SignInImages/kanini logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    modal.style.display = "none";
    const backdrop = document.querySelector(".modal-backdrop");
    backdrop.remove();
  };

  const togglePassword = () => {
    const passwordField = document.getElementById("password");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a JSON payload with the email and password
    const payload = {
      User_Email: email,
      User_Password: password
    };

    // Send a POST request to the API endpoint
    fetch('https://localhost:7198/api/Token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.text())
      .then(token => {
        // Print the generated token in the console
        console.log(token);

        // Store the userEmail in local storage
        localStorage.setItem('userEmail', email);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <img src={mainlogo} alt="mainlogo" style={{ width: '1200px', marginLeft: '-433px', marginTop: '-149px', height: '920px' }} />
        </div>
        <div className="col-lg-4" id="maincontainer">
          <div className="form-container">
            <div id="image2">
              <img src={kaninilogo} alt="kaninilogo" />
            </div>
            <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            <p style={{ paddingBottom: '2%' }}>Welcome back! Please enter your email and password</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email ID</label>
              <input type="text" id="username" name="username" placeholder="name@kanini.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
              <i>
                <img src="assets/SignInImages/eye.svg" id="togglePassword" onClick={togglePassword} alt="Toggle Password" />
              </i>
              <br />

              <div style={{ cursor: 'pointer', marginLeft: '55%', marginBottom: '20px' }}>
                <button type="button" className="border-0 bg-transparent" data-toggle="modal" data-target="#exampleModalCenter">
                  Forgot Your Password?
                </button>
              </div>

              <div></div>
              <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <img style={{ float: 'right' }} src="assets/SignInImages/closebutton.svg" onClick={closeModal} alt="Close Modal" />

                          <img src="assets/SignInImages/forgotlogo.svg" className="center" alt="Forgot Password" />
                          <div style={{ margin: 'auto' }}>
                            <h5 className="modal-title" id="exampleModalLabel" style={{ textAlign: 'center' }}>Forgot Password?</h5>
                            <p style={{ textAlign: 'center' }}>No worries, we'll send you reset instructions</p>
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '30px', outline: 'none', boxShadow: 'none' }}>Sign In</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" value="SIGN IN" className="button1" style={{ color: 'white' }} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
