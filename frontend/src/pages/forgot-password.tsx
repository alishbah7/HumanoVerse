import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(
        'https://humanoverse.vercel.app/api/auth/forgot-password', // Updated path
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      // Safety check for non-JSON responses
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage("An unexpected error occurred on the server.");
      }
    } catch (err) {
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // console.log("RUNNING ON:", process.env.RAILWAY_ENVIRONMENT ? "RAILWAY" : "VERCEL");
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
