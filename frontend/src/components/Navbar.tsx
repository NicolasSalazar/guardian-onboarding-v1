'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.brand}>
          Guardian Onboarding
        </Link>
        <div style={styles.links}>
          <Link href="/products" style={styles.link}>
            Products
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/onboarding" style={styles.link}>
                Onboarding
              </Link>
              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" style={styles.link}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    background: '#1a1a2e',
    padding: '1rem 0',
    borderBottom: '2px solid #16213e',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#e94560',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#eee',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  logoutBtn: {
    background: '#e94560',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};
