'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/components/cart/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg border border-gray-100 hover:border-brand-green/30 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between p-3.5 relative overflow-hidden">
      {/* İndirim / Fırsat Rozeti */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-brand-green text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Ürün Görseli */}
      <Link
        href={`/${product.slug}`}
        className="block relative w-full pt-[90%] mb-3 overflow-hidden rounded bg-[#fafafa]"
      >
        <Image
          src={product.images[0] || '/images/logo/logo.png'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Yıldız Derecelendirmesi */}
      <div className="flex items-center justify-center gap-0.5 mb-1.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-[#ffbf00] text-[#ffbf00]"
          />
        ))}
      </div>

      {/* Marka Adı */}
      <div className="text-center mb-1">
        <Link
          href={`/marka/${product.brandSlug || product.brand.toLowerCase()}`}
          className="text-[11px] font-medium text-brand-green hover:underline uppercase tracking-wider"
        >
          {product.brand}
        </Link>
      </div>

      {/* Ürün Başlığı */}
      <div className="text-center mb-2 flex-1">
        <Link
          href={`/${product.slug}`}
          className="text-xs font-semibold text-gray-800 hover:text-brand-green transition-colors line-clamp-2 leading-snug"
          title={product.name}
        >
          {product.name}
        </Link>
      </div>

      {/* Fiyat */}
      <div className="text-center mb-3">
        {product.oldPrice && (
          <span className="text-[11px] text-gray-400 line-through mr-1.5 block">
            {formatPrice(product.oldPrice)}
          </span>
        )}
        <span className="text-sm font-bold text-gray-900 font-ui tracking-tight">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* SEPETE EKLE Butonu */}
      <button
        onClick={() => addToCart(product, 1)}
        className="w-full bg-brand-green hover:bg-brand-greenHover active:scale-[0.98] text-white py-2 px-3 rounded text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-sm"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>SEPETE EKLE</span>
      </button>
    </div>
  );
}
