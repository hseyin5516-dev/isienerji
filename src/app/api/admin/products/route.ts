import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]);
  }
  const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/products.json');

    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    products.unshift({
      ...newProduct,
      id: String(Date.now()),
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      images: newProduct.images?.length > 0 ? newProduct.images : ['https://www.isienerji.com.tr/images/isi-logo.png'],
      specs: newProduct.specs || [],
      description: newProduct.description || '<p>Yeni ürün açıklaması</p>',
    });

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true, product: products[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProduct = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/products.json');

    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const index = products.findIndex((p: any) => p.id === updatedProduct.id || p.slug === updatedProduct.slug);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
      return NextResponse.json({ success: true, product: products[index] });
    }

    return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/products.json');

    let products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    products = products.filter((p: any) => p.id !== id && p.slug !== id);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
