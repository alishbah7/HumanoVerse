import React, { useState } from 'react';
import Layout from '@theme/Layout';
import '../css/auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setMessage('Check your email for a reset link!');
        setSubmitted(true);
      } else {
        setMessage('Error: ' + res.statusText);
      }
    } catch (err) {
      setMessage('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <Layout title="Forgot Password">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Forgot Password</h1>
          {submitted ? (
            <p>{message}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {message && <p className="alert">{message}</p>}
              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}