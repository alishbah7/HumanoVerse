import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { signUp } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import '../css/auth.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signUp.email({
        email,
        name,
        password,
      });

      if (result.error) {
        setError(result.error.message || 'Signup failed');
      } else {
        history.push('/'); // Redirect to login page after successful signup
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Layout title="Sign Up" description="User registration page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="alert">{error}</div>}
              <button type="submit" className="button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
    </Layout>
  );
}

export default Signup;
