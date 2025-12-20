import React from 'react';
import { useSession, signOut } from '../lib/auth-client';
import Link from '@docusaurus/Link';
import '../css/navbar.css';



function AuthNavbarItem() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <span className="navbar-item-loading">Loading...</span>;
  }

  if (session?.user) {
    return (
      <div className="navbar-auth-section">
        {/* <span className="navbar-username">
          Welcome, {session.user.name || session.user.email}
        </span> */}
        {(session.user as any).role === 'admin' ? (
          <Link to="/admin-dashboard" className="navbar-account-link dash-btn">
            Dashboard
          </Link>
        ) : (
          <Link to="/account" className="navbar-account-link user-link">
            👤 {session.user.name}
          </Link>

        )}
        <button onClick={() => signOut()} className="navbar-logout-button">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="navbar-auth-section">
      <Link to="/login" className="navbar-login-link navbar-login-button">
        Login
      </Link>
    </div>
  );
}

export default AuthNavbarItem;
