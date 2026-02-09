'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { onboardingService } from '@/services/api';

export default function OnboardingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    document: '',
    email: '',
    initialAmount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    onboardingId: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await onboardingService.create({
        name: form.name,
        document: form.document,
        email: form.email,
        initialAmount: Number(form.initialAmount),
      });
      setSuccess(response.data);
      setForm({ name: '', document: '', email: '', initialAmount: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error in onboarding');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Nuevo Onboarding</h2>
        <p style={styles.subtitle}>
          Complete los datos para solicitar la apertura de cuenta
        </p>

        {error && <div style={styles.error}>{error}</div>}

        {success && (
          <div style={styles.success}>
            <strong>Solicitud creada exitosamente</strong>
            <p>ID: {success.onboardingId}</p>
            <p>Estado: {success.status}</p>
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.label}>Nombre completo</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="Juan Perez"
            required
            minLength={2}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Documento de identidad</label>
          <input
            name="document"
            value={form.document}
            onChange={handleChange}
            style={styles.input}
            placeholder="1234567890"
            required
            pattern="\d{6,15}"
            title="Debe contener entre 6 y 15 digitos"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="juan@email.com"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Monto inicial (COP)</label>
          <input
            name="initialAmount"
            type="number"
            value={form.initialAmount}
            onChange={handleChange}
            style={styles.input}
            placeholder="500000"
            required
            min={1}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Procesando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem',
  },
  form: {
    background: '#16213e',
    padding: '2.5rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #1a1a2e',
  },
  title: {
    textAlign: 'center',
    color: '#e94560',
    marginTop: 0,
    marginBottom: '0.3rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#a8a8b3',
    fontSize: '0.9rem',
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
  success: {
    background: '#0f996020',
    border: '1px solid #0f9960',
    color: '#0f9960',
    padding: '1rem',
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
