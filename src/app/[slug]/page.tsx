import React from 'react';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Product } from '@/lib/types';
import ProductDetailView from '@/components/product/ProductDetailView';
import CategoryListingView from '@/components/category/CategoryListingView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const products = productsData as unknown as Product[];

  // 1. Ürün mü kontrol et (-P\d+ içeriyor veya slug eşleşiyor)
  const product = products.find((p) => p.slug === slug || p.id === slug);
  if (product) {
    const relatedProducts = products
      .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
      .slice(0, 4);

    return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
  }

  // 2. Kategori veya Marka listelemesi mi?
  // Slug formatı: 'yerden-isitma-borulari' veya 'rehau-yerden-isitma'
  const matchingProducts = products.filter((p) => {
    const pSlug = p.slug.toLowerCase();
    const pCategory = p.category.toLowerCase();
    const cleanSlug = slug.toLowerCase().replace(/-/g, ' ');

    return (
      pSlug.includes(slug.toLowerCase()) ||
      pCategory.includes(cleanSlug) ||
      p.brand.toLowerCase() === slug.toLowerCase()
    );
  });

  // Eğer eşleşen ürün varsa veya kategori listesindeyse
  if (matchingProducts.length > 0 || slug.includes('yerden-isitma') || slug.includes('pompa')) {
    const formattedTitle = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return (
      <CategoryListingView
        title={formattedTitle}
        products={matchingProducts.length > 0 ? matchingProducts : products.slice(0, 16)}
        currentSlug={slug}
      />
    );
  }

  // 3. Bulunamadıysa 404
  return notFound();
}
