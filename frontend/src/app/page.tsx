'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Guardian Onboarding</h1>
        <p style={styles.subtitle}>
          Plataforma de onboarding digital segura y eficiente
        </p>
        <div style={styles.actions}>
          <Link href="/products" style={styles.primaryBtn}>
            Ver Productos
          </Link>
          {isAuthenticated ? (
            <Link href="/onboarding" style={styles.secondaryBtn}>
              Iniciar Onboarding
            </Link>
          ) : (
            <Link href="/login" style={styles.secondaryBtn}>
              Iniciar Sesion
            </Link>
          )}
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Autenticacion JWT</h3>
          <p style={styles.cardText}>
            Tokens seguros con expiracion de 5 minutos para proteger cada
            operacion.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Productos Digitales</h3>
          <p style={styles.cardText}>
            Catalogo completo de productos bancarios con cache inteligente.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Onboarding Seguro</h3>
          <p style={styles.cardText}>
            Registro validado de nuevos clientes con seguimiento de estado.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { textAlign: 'center' },
  hero: { padding: '4rem 0 3rem' },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    color: '#e94560',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#a8a8b3',
    marginBottom: '2rem',
  },
  actions: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  primaryBtn: {
    background: '#e94560',
    color: '#fff',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#e94560',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: '2px solid #e94560',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    background: '#16213e',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #1a1a2e',
  },
  cardTitle: {
    color: '#e94560',
    marginTop: 0,
    fontSize: '1.2rem',
  },
  cardText: {
    color: '#a8a8b3',
    lineHeight: '1.6',
  },
};
