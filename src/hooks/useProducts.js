import { useState, useEffect } from 'react';

const useProducts = (category = '', limit = 30, skip = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = `https://dummyjson.com/products`;
        
        if (category && category !== 'all') {
          url += `/category/${category}`;
        }
        
        url += `?limit=${limit}&skip=${skip}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit, skip]);

  return { products, loading, error, total };
};

export default useProducts;