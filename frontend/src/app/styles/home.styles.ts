import React from 'react';

export const styles: Record<string, React.CSSProperties> = {
  container: { textAlign: 'center' as const },
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
