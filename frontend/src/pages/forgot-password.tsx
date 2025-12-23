import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setMessage('Check your email for the reset link.');
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="container margin-vert--xl" style={{ maxWidth: '500px' }}>
        <div className="card">
          <div className="card__header"><h3>Forgot Password</h3></div>
          <div className="card__body">
            <form onSubmit={handleSubmit}>
              <div className="margin-bottom--md">
                <label>Email Address</label>
                <input className="button--block" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', width: '100%', border: '1px solid #ccc' }} />
              </div>
              <button className="button button--primary button--block" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            {message && <p className="margin-top--md">{message}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}