import { useHistory } from '@docusaurus/router';
import { useState } from 'react';

export default function ResetPassword() {
  const history = useHistory();
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: new URLSearchParams(window.location.search).get('token'),
        password,
      }),
    });

    // ✅ redirect to login
    history.push('/login');
  };

  return (
    <form onSubmit={submit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Reset</button>
    </form>
  );
}
