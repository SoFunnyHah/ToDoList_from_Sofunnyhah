import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration({ setUser }) {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/log/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      navigate('/');
    } else {
      const newUser = await res.json();
      setUser(newUser);
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Registration</h1>
      <form onSubmit={submitHandler}>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
            Username:
            <input onChange={inputHandler} name="username" type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
            E-mail:
            <input onChange={inputHandler} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <label htmlFor="exampleInputPassword1" className="form-label" style={{ textAlign: 'left' }}>
            Password:
            <input onChange={inputHandler} name="password" type="password" className="form-control" id="exampleInputPassword1" />
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green' }}>Create Account</button>
        </div>
      </form>
    </div>
  );
}
