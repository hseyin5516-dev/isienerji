import React from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';
import CategoryListingView from '@/components/category/CategoryListingView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const products = productsData as unknown as Product[];

  const brandName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const brandProducts = products.filter((p) => {
    return (
      p.brand.toLowerCase() === slug.toLowerCase() ||
      p.brand.toLowerCase() === brandName.toLowerCase() ||
      p.slug.toLowerCase().includes(slug.toLowerCase())
    );
  });

  return (
    <CategoryListingView
      title={`${brandName} Ürünleri`}
      description={`${brandName} marka orijinal ve garantili mekanik tesisat ve yerden ısıtma sistemleri en avantajlı fiyatlarla Isı Enerji'de.`}
      products={brandProducts.length > 0 ? brandProducts : products.slice(0, 12)}
      currentSlug={`marka/${slug}`}
    />
  );
}
