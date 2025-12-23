import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';

export default function ResetPassword() {
  const location = useLocation();
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
      if (res.ok) setStatus('Password updated! You can now log in.');
      else setStatus('Failed to reset password. Link may be expired.');
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
    <Layout title="Reset Password">
      <div className="container margin-vert--xl" style={{ maxWidth: '500px' }}>
        <div className="card">
          <div className="card__header"><h3>Set New Password</h3></div>
          <div className="card__body">
            {!token ? (
              <div className="alert alert--danger">Invalid or missing token.</div>
            ) : (
              <form onSubmit={handleReset}>
                <div className="margin-bottom--md">
                  <label>New Password</label>
                  <input className="button--block" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ padding: '8px', width: '100%', border: '1px solid #ccc' }} />
                </div>
                <button className="button button--primary button--block" type="submit">Update Password</button>
              </form>
            )}
            {status && <p className="margin-top--md">{status}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}