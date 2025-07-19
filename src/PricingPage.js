import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api/products';

export default function PricingPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <section className="w-full px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 text-center">
        Pricing Plans
      </h2>
      <p className="text-lg text-gray-700 mb-10 max-w-2xl text-center">
        Choose the best rice for your needs. Transparent pricing, no hidden fees.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {products
          ? products.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center gap-4"
              >
                <img src={product.image} alt={product.name} className="w-20 h-20 mb-2" />
                <div className="text-xl font-bold text-green-900">{product.name}</div>
                <div className="text-gray-600 mb-2">{product.type}</div>
                <div className="text-green-700 font-bold text-2xl mb-1">
                  ₹{product.priceINR} <span className="text-base text-gray-500">/kg</span>
                </div>
                <div className="text-gray-400 text-sm mb-2">(${product.price} USD)</div>
                <div className="text-gray-600 text-center">{product.description}</div>
              </div>
            ))
          : <div>Loading...</div>}
      </div>
    </section>
  );
}