'use client';

import { useProducts } from './useProducts';
import { styles } from './products.styles';
import { TYPE_LABELS } from './products.constants';
import { formatCurrency } from '@/helpers/format';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <p style={styles.loading}>Cargando productos...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

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
