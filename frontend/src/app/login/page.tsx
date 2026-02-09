'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push('/onboarding');
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesion</h2>
        <p style={styles.hint}>
          Usuario: <strong>admin</strong> / Password: <strong>admin123</strong>
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.field}>
          <label style={styles.label}>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Ingrese su usuario"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Ingrese su password"
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Autenticando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3rem',
  },
  form: {
    background: '#16213e',
    padding: '2.5rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid #1a1a2e',
  },
  title: {
    textAlign: 'center',
    color: '#e94560',
    marginTop: 0,
    marginBottom: '0.5rem',
  },
  hint: {
    textAlign: 'center',
    color: '#a8a8b3',
    fontSize: '0.85rem',
    marginBottom: '1.5rem',
  },
  error: {
    background: '#e9456020',
    border: '1px solid #e94560',
    color: '#e94560',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  field: { marginBottom: '1.2rem' },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#a8a8b3',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.7rem',
    borderRadius: '6px',
    border: '1px solid #333',
    background: '#0f3460',
    color: '#eee',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    background: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};
