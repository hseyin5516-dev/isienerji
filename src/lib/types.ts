export interface Product {
  id: string; // e.g. "623"
  slug: string; // e.g. "rehau-rautherm-s-pe-xa-boru-17x2-mm-oksijen-bariyerli-500m-kangal-P623"
  name: string;
  brand: string;
  brandSlug?: string;
  category: string;
  categorySlug?: string;
  sku: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  freeShipping: boolean;
  fastShipping: boolean;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  featured?: boolean;
  badge?: string; // "Yeni", "İndirim", "Fırsat", etc.
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  seoText?: string;
  image?: string;
  parentId?: string | null;
  subcategories?: { name: string; slug: string }[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  paymentMethod: 'whatsapp' | 'havale' | 'paytr' | 'iyzico';
  paymentStatus: 'unpaid' | 'paid';
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  projectName?: string;
  city?: string;
  details: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface SiteSettings {
  siteName: string;
  phone1: string;
  phone2: string;
  whatsappPhone: string;
  email: string;
  address: string;
  workingHours: string;
  freeShippingThreshold: number;
  paytrApiKey?: string;
  paytrSecretKey?: string;
  paytrMerchantId?: string;
  iyzicoApiKey?: string;
  iyzicoSecretKey?: string;
  iyzicoBaseUrl?: string;
}
