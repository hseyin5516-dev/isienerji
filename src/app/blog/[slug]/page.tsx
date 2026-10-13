import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import blogsData from '@/data/blogs.json';
import { BlogPost } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = blogsData as BlogPost[];
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="bg-white py-10 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Blog Yazılarına Dön</span>
        </Link>

        <div className="space-y-3">
          <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight font-display">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-400 pt-1 border-b border-gray-100 pb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="relative w-full h-[320px] md:h-[420px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain p-6"
            />
          </div>
        )}

        <div
          className="prose max-w-none text-sm md:text-base text-gray-700 leading-relaxed space-y-4 pt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
