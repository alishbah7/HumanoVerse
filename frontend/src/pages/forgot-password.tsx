import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { authClient } from '../lib/auth-client'; // Import authClient
import '../css/auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const { data, error: authError } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (authError) {
        setError(authError.message || 'Failed to send reset link');
      } else {
        setSuccess('If an account with this email exists, a password reset link has been sent.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Layout title="Forgot Password" description="Forgot password page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Forgot Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <div className="alert">{error}</div>}
              {success && <div className="alert alert--success">{success}</div>}
              <button type="submit" className="button">
                Send Reset Link
              </button>
            </form>
            <div className="text--center margin-top--md">
              <p>Remember your password? <a href="/login">Log In</a></p>
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default ForgotPassword;
