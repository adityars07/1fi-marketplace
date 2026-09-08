import productData from '../data/products.json';

/**
 * Mock API service that simulates backend data fetching.
 * All product/EMI data is loaded from products.json, never hardcoded in components.
 * Includes configurable latency and error simulation.
 */

const SIMULATED_DELAY_MIN = 300;
const SIMULATED_DELAY_MAX = 800;
const ERROR_RATE = 0; // Set to 0.1 for 10% error simulation during testing

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay() {
  return Math.floor(
    Math.random() * (SIMULATED_DELAY_MAX - SIMULATED_DELAY_MIN) + SIMULATED_DELAY_MIN
  );
}

function shouldSimulateError() {
  return Math.random() < ERROR_RATE;
}

/**
 * Fetch all products, optionally filtered by category
 * @param {string} [categoryId] - Filter by category ID (e.g., 'smartphones')
 * @returns {Promise<{products: Array, categories: Array}>}
 */
export async function fetchProducts(categoryId = 'all') {
  await delay(getRandomDelay());

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch products. Please try again.');
  }

  let products = [...productData.products];

  if (categoryId && categoryId !== 'all') {
    products = products.filter(p => p.category === categoryId);
  }

  return {
    products,
    categories: productData.categories,
    total: products.length,
  };
}

/**
 * Fetch a single product by ID
 * @param {string} productId
 * @returns {Promise<Object>}
 */
export async function fetchProductById(productId) {
  await delay(getRandomDelay());

  if (shouldSimulateError()) {
    throw new Error('Failed to load product details. Please try again.');
  }

  const product = productData.products.find(p => p.id === productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  return { ...product };
}

/**
 * Fetch EMI plans for a product with a specific variant configuration
 * @param {string} productId
 * @param {Object} [selectedVariant] - { colorId, storageId }
 * @returns {Promise<{plans: Array, productPrice: number}>}
 */
export async function fetchEMIPlans(productId, selectedVariant = {}) {
  await delay(getRandomDelay());

  if (shouldSimulateError()) {
    throw new Error('Failed to load EMI plans. Please try again.');
  }

  const product = productData.products.find(p => p.id === productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  // Calculate effective price based on variant selection
  let effectivePrice = product.basePrice - (product.discount || 0);

  if (selectedVariant.storageId && product.variants.storage.length > 0) {
    const storageVariant = product.variants.storage.find(
      s => s.id === selectedVariant.storageId
    );
    if (storageVariant) {
      effectivePrice += storageVariant.priceAdd;
    }
  }

  // Calculate EMI details for each plan
  const plans = product.emiPlans.map(plan => {
    const principal = effectivePrice;
    let monthlyEMI;
    let totalAmount;
    let totalInterest;

    if (plan.interestRate === 0) {
      // No cost EMI
      monthlyEMI = Math.ceil(principal / plan.tenure);
      totalAmount = principal;
      totalInterest = 0;
    } else {
      // With interest (reducing balance)
      const monthlyRate = plan.interestRate / 12 / 100;
      monthlyEMI = Math.ceil(
        (principal * monthlyRate * Math.pow(1 + monthlyRate, plan.tenure)) /
        (Math.pow(1 + monthlyRate, plan.tenure) - 1)
      );
      totalAmount = monthlyEMI * plan.tenure;
      totalInterest = totalAmount - principal;
    }

    return {
      ...plan,
      monthlyEMI,
      totalAmount,
      totalInterest,
      productPrice: effectivePrice,
      isNoCostEMI: plan.interestRate === 0,
    };
  });

  return {
    plans,
    productPrice: effectivePrice,
  };
}

/**
 * Fetch all available categories
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  await delay(getRandomDelay());

  if (shouldSimulateError()) {
    throw new Error('Failed to load categories.');
  }

  return [...productData.categories];
}

/**
 * Simulate submitting an EMI application
 * @param {Object} application - { productId, variantConfig, selectedPlan }
 * @returns {Promise<{success: boolean, orderId: string, message: string}>}
 */
export async function submitEMIApplication(_application) {
  await delay(1000); // Longer delay for submission

  if (shouldSimulateError()) {
    throw new Error('Application submission failed. Please try again.');
  }

  const orderId = `1FI-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  return {
    success: true,
    orderId,
    message: 'Your EMI application has been submitted successfully!',
  };
}
