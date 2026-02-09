import React from 'react';

export const styles: Record<string, React.CSSProperties> = {
  title: { color: '#e94560', marginBottom: '1.5rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#16213e',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #1a1a2e',
    position: 'relative' as const,
  },
  badge: {
    background: '#e94560',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
  },
  cardTitle: {
    color: '#eee',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  cardDesc: {
    color: '#a8a8b3',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #1a1a2e',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
  },
  detailLabel: {
    color: '#a8a8b3',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
  },
  detailValue: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  loading: { textAlign: 'center' as const },
  error: { color: '#e94560', textAlign: 'center' as const },
};
