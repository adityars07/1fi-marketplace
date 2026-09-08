import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/mockApi';

/**
 * Custom hook for fetching products with loading/error states
 * @param {string} categoryId - Category to filter by
 * @returns {{ products, categories, loading, error, refetch }}
 */
export function useProducts(categoryId = 'all') {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(categoryId);
      setProducts(data.products);
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    categories,
    loading,
    error,
    refetch: loadProducts,
  };
}
