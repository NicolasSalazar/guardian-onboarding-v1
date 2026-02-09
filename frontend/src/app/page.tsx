'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { styles } from './styles/home.styles';

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
