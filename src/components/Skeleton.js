import React from 'react';

export default function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded ${className}`}
      style={{ minHeight: 24, ...style }}
      role="status"
      aria-busy="true"
    />
  );
} 