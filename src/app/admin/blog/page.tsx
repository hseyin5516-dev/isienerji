'use client';

import { useState } from 'react';
import blogsData from '@/data/blogs.json';
import { BookOpen, Plus, Trash2, Edit3, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState(blogsData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-emerald" />
            <span>Blog & Makale Yönetimi ({blogs.length})</span>
          </h1>
          <p className="text-sm text-gray-400">
            SEO ve teknik bilgi içeriklerini bu alandan yönetebilirsiniz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-brand-emerald font-semibold">
              <span>{post.category}</span>
              <span className="text-gray-400">{post.date}</span>
            </div>

            <h3 className="text-white font-bold text-base line-clamp-1">
              {post.title}
            </h3>

            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
              {post.summary}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-gray-500">Yazar: {post.author}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Görüntüle</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
