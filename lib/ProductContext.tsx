'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PRODUCTS } from '@/data/products';

interface ProductContextValue {
  activeIndex: number;
  navigate: (index: number) => void;
}

const ProductContext = createContext<ProductContextValue>({
  activeIndex: 0,
  navigate: () => {},
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= PRODUCTS.length) return;
    setActiveIndex(nextIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <ProductContext.Provider value={{ activeIndex, navigate }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
