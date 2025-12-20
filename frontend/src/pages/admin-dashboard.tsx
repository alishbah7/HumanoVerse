import React, { useEffect, useState } from 'react';
import { useSession } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBook, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './admin-dashboard.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalUser, setModalUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isPending) {
      if (!session?.user || (session?.user as any).role !== 'admin') {
        history.push('/login');
      } else {
        fetchUsers();
      }
    }
  }, [session?.user, isPending, history]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 403) {
        setError('Forbidden: You do not have admin access.');
        history.push('/login');
      } else {
        setError('Failed to fetch users.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Network error or server unavailable.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`http://localhost:3001/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setSuccess('User deleted successfully!');
        fetchUsers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Network error or server unavailable.');
    }
  };

  const openModal = (user: User) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };

  if (isPending) {
    return <Layout><div className={styles.loading}>Loading...</div></Layout>;
  }

  if (!session?.user || (session?.user as any).role !== 'admin') {
    return <Layout><div className={styles.unauthorized}>Redirecting to login or unauthorized.</div></Layout>;
  }

  return (
    <Layout title="Admin Dashboard">
      <div className={styles.adminDashboardContainer}>
        <h1 className={styles.dashboardTitle}>𝘼𝙙𝙢𝙞𝙣 𝘿𝙖𝙨𝙝𝙗𝙤𝙖𝙧𝙙</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <div className={styles.userBoxesContainer}>
          {users.map((u) => (
            <div key={u.id} className={styles.userBox}>
              <div className={styles.userInfo}>
                <h4>{u.name}</h4>
                <p>{u.email}</p>
              </div>
              <div className={styles.userActions}>
                <button className={styles.actionButton} onClick={() => openModal(u)}>
                  <FontAwesomeIcon icon={faBook} />
                </button>
                <button className={styles.actionButton} onClick={() => handleDeleteUser(u.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {modalUser && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2 className={styles.modalTitle}>{modalUser.name}'s Details</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  {/* <span className={styles.detailValue}>{modalUser.id}</span> */}
                </div>
                <div className={styles.detailItem}>
                  <strong className={styles.detailHeading}>Name:</strong>
                  <span className={styles.detailValue}>{modalUser.name}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong className={styles.detailHeading}>Email:</strong>
                  <span className={styles.detailValue}>{modalUser.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong className={styles.detailHeading}>Role:</strong>
                  <span className={styles.detailValue}>{modalUser.role}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong className={styles.detailHeading}>Created At:</strong>
                  <span className={styles.detailValue}>{new Date(modalUser.createdAt).toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong className={styles.detailHeading}>Updated At:</strong>
                  <span className={styles.detailValue}>{new Date(modalUser.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
