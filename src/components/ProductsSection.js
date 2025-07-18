import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';
import { fetchProducts } from '../api/products';

export default function ProductsSection() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  return (
    <section className="w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-8 sm:py-12" role="region" aria-label="Rice products">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-900 dark:text-white mb-8 text-center">Our Rice Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8" aria-label="Product list">
        {products
          ? products.map((product, i) => (
              <div key={i} className="bg-white dark:bg-black rounded-2xl shadow-2xl border border-green-100 dark:border-white p-4 sm:p-6 flex flex-col items-center gap-3 hover:shadow-2xl transition relative ring-1 ring-green-200/40 dark:ring-white/40">
                <ProductCard product={product} darkMode />
              </div>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-black rounded-2xl shadow-2xl border border-green-100 dark:border-white p-4 sm:p-6 flex flex-col items-center gap-3 ring-1 ring-green-200/40 dark:ring-white/40">
                <Skeleton className="w-20 h-20 mb-2 dark:bg-white" />
                <Skeleton className="w-24 h-6 mb-1 dark:bg-white" />
                <Skeleton className="w-16 h-4 mb-2 dark:bg-white" />
                <Skeleton className="w-32 h-4 mb-2 dark:bg-white" />
                <Skeleton className="w-20 h-6 dark:bg-white" />
                <Skeleton className="w-28 h-8 mt-2 dark:bg-white" />
              </div>
            ))}
      </div>
    </section>
  );
} 