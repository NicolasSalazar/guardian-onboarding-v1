'use client';

import { useState, useEffect } from 'react';
import { productsService } from '@/services/api';
import { Product } from '@/types';

const TYPE_LABELS: Record<string, string> = {
  SAVINGS: 'Ahorros',
  CHECKING: 'Corriente',
  CDT: 'CDT',
  CREDIT_CARD: 'Tarjeta de Credito',
  LOAN: 'Credito',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando productos...</p>;
  if (error) return <p style={{ color: '#e94560', textAlign: 'center' }}>{error}</p>;

  return (
    <div>
      <h1 style={styles.title}>Productos Disponibles</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <span style={styles.badge}>
              {TYPE_LABELS[product.type] || product.type}
            </span>
            <h3 style={styles.cardTitle}>{product.name}</h3>
            <p style={styles.cardDesc}>{product.description}</p>
            <div style={styles.details}>
              <div style={styles.detail}>
                <span style={styles.detailLabel}>Tasa</span>
                <span style={styles.detailValue}>
                  {product.interestRate}%
                </span>
              </div>
              <div style={styles.detail}>
                <span style={styles.detailLabel}>Monto min.</span>
                <span style={styles.detailValue}>
                  {formatCurrency(product.minAmount)}
                </span>
              </div>
              <div style={styles.detail}>
                <span style={styles.detailLabel}>Monto max.</span>
                <span style={styles.detailValue}>
                  {formatCurrency(product.maxAmount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
    position: 'relative',
  },
  badge: {
    background: '#e94560',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
    flexDirection: 'column',
    gap: '0.2rem',
  },
  detailLabel: {
    color: '#a8a8b3',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};
