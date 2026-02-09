'use client';

import { useOnboarding } from './useOnboarding';
import { styles } from './onboarding.styles';

export default function OnboardingPage() {
  const {
    form,
    loading,
    error,
    success,
    isAuthenticated,
    handleChange,
    handleSubmit,
  } = useOnboarding();

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
