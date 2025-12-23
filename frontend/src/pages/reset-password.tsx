import React, { useState } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const query = useQuery();
  const history = useHistory();
  const token = query.get('token');

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    return <p>Invalid or expired reset link</p>;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch(
      'https://humanoverse.vercel.app/api/auth/reset-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => history.push('/login'), 2000);
    } else {
      setMessage(data.message || 'Reset failed');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1>Reset Password</h1>

      <form onSubmit={submit}>
        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <button disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Updating…' : 'Reset Password'}
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
