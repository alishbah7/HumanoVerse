import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'https://api-humanoverse.up.railway.app/api/auth', // Backend /api/auth endpoint
});

export const { useSession, signIn, signUp, signOut } = authClient;

export const updateName = async (name: string) => {
  const session = await authClient.getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch('https://api-humanoverse.up.railway.app/api/user/name', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${session.accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
};

export const updateEmail = async (password: string, newEmail: string) => {
    const session = await authClient.getSession();
    if (!session) throw new Error('Not authenticated');
  
    const res = await fetch('https://api-humanoverse.up.railway.app/api/user/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${session.accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({ password, newEmail }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
  
    return res.json();
};
  
export const updatePassword = async (currentPassword: string, newPassword: string) => {
    const session = await authClient.getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await fetch('https://api-humanoverse.up.railway.app/api/user/password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${session.accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    return res.json();
};
