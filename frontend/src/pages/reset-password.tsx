import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import { authClient } from '../lib/auth-client';
import '../css/auth.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('No reset token found. Please request a new password reset link.');
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!token) {
      setError('No reset token found. Please request a new password reset link.');
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      const { error: authError } = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (authError) {
        setError(authError.message || 'Failed to reset password');
      } else {
        setSuccess('Password has been reset successfully. You can now log in.');
        setTimeout(() => history.push('/login'), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Layout title="Reset Password" description="Reset password page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className="alert">{error}</div>}
            {success && <div className="alert alert--success">{success}</div>}
            <button type="submit" className="button" disabled={!token}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ResetPassword;
