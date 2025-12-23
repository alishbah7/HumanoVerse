import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch(
      'https://humanoverse.vercel.app/api/auth/forgot-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1>Forgot Password</h1>

      <form onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 12 }}
        />

        <button disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
