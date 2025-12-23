import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import '../css/auth.css';

export default function ResetPassword() {
  const location = useLocation();
  const history = useHistory();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('token');
    if (t) setToken(t);
  }, [location]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      if (res.ok) {
        setStatus('Password updated! You can now log in.');
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      } else {
        setStatus('Failed to reset password. Link may be expired.');
      }
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
    <Layout title="Reset Password">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Set New Password</h1>
          {!token ? (
            <div className="alert alert--danger">Invalid or missing token.</div>
          ) : (
            <form onSubmit={handleReset}>
              <input
                type="password"
                placeholder="New Password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button className="button" type="submit">Update Password</button>
            </form>
          )}
          {status && <p>{status}</p>}
        </div>
      </div>
    </Layout>
  );
}