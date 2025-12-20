import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { signIn, useSession, authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import '../css/auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
 



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn.email({ email, password });

      
      if (result?.error) {
        setError(result.error.message || 'Login failed');
        return;
      }
      
      await authClient.getSession({
        query: {
          disableCookieCache: true,
        },
      });

      // 🔥 fetch real user (with role)
            const res = await fetch('https://humanoverse.vercel.app/api/me', {
        credentials: 'include',
      });

      const user = await res.json();
      console.log('User object:', user);

      if (user.role === 'admin') {
        history.push('/admin-dashboard');
      } else {
        history.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    }
  };



  return (
    <Layout title="Log In" description="User login page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Log In</h1>
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
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="alert">{error}</div>}
            <button type="submit" className="button">
              Log In
            </button>
          </form>
          <div className="text--center margin-top--md">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
