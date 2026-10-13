'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Search, Trash2, Edit3, Check, X, Package, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Yeni Ürün Formu
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('Rehau');
  const [newPrice, setNewPrice] = useState<number>(1000);
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('Yerden Isıtma');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  }, []);

  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const handleQuickSavePrice = async (p: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, price: editPrice }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, price: editPrice } : item))
        );
        setEditingId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newTitle,
        brand: newBrand,
        price: Number(newPrice),
        sku: newSku || `SKU-${Date.now().toString().slice(-4)}`,
        category: newCategory,
        images: newImage ? [newImage] : ['https://www.isienerji.com.tr/images/isi-logo.png'],
        inStock: true,
        freeShipping: true,
        fastShipping: true,
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts((prev) => [data.product, ...prev]);
        setIsAddModalOpen(false);
        setNewTitle('');
        setNewSku('');
        setNewPrice(1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Başlık ve Ekle Butonu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Ürün Yönetimi ({products.length} Ürün)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ürün fiyatlarını, stoklarını güncelleyin veya yeni ürün ekleyin.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Ürün Ekle</span>
        </button>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ürün adı veya stok kodu ile arayın..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tüm Markalar</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Ürün Listesi Tablosu */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Görsel</th>
                <th className="p-4">Ürün Adı</th>
                <th className="p-4">Marka</th>
                <th className="p-4">Stok Kodu</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.slice(0, 50).map((product) => (
                <tr key={product.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 relative bg-white rounded border border-slate-700 p-0.5">
                      <Image
                        src={product.images[0] || '/images/logo/logo.png'}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <a
                      href={`/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5 line-clamp-2"
                    >
                      <span>{product.name}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 text-slate-500" />
                    </a>
                    <span className="text-[10px] text-slate-500">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      {product.brand}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">{product.sku}</td>
                  <td className="p-4">
                    {editingId === product.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24 bg-slate-900 border border-emerald-500 rounded px-2 py-1 text-xs text-white"
                        />
                        <button
                          onClick={() => handleQuickSavePrice(product)}
                          className="p-1 bg-emerald-600 rounded text-white"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 bg-slate-800 rounded text-slate-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => {
                            setEditingId(product.id);
                            setEditPrice(product.price);
                          }}
                          className="text-slate-500 hover:text-white"
                          title="Fiyatı Değiştir"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yeni Ürün Ekle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Yeni Ürün Ekle</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Ürün Adı *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: Rehau Rautherm S PE-Xa 16x2 Boru"
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Marka</label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Fiyat (TL) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Stok Kodu</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="Örn: RH-1602"
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Resim URL (Opsiyonel)</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-bold"
                >
                  Ürünü Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
