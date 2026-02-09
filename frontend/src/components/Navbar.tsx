'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { styles } from './navbar.styles';

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
