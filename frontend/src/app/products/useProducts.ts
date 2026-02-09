'use client';

import { useState, useEffect } from 'react';
import { productsService } from '@/services/api';
import { Product } from './products.types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
