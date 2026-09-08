import { useState, useEffect, useCallback } from 'react';
import { fetchEMIPlans } from '../api/mockApi';

/**
 * Custom hook for fetching and computing EMI plans
 * @param {string} productId
 * @param {Object} selectedVariant - { colorId, storageId }
 * @returns {{ plans, productPrice, loading, error, refetch }}
 */
export function useEMI(productId, selectedVariant = {}) {
  const [plans, setPlans] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { storageId, colorId } = selectedVariant;

  const loadPlans = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEMIPlans(productId, { storageId, colorId });
      setPlans(data.plans);
      setProductPrice(data.productPrice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId, storageId, colorId]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  return {
    plans,
    productPrice,
    loading,
    error,
    refetch: loadPlans,
  };
}

/**
 * Utility to format currency in INR
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
