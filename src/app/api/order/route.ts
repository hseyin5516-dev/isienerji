import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/orders.json');

    let orders = [];
    if (fs.existsSync(filePath)) {
      orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    orders.unshift({
      ...newOrder,
      id: String(orders.length + 1),
      status: 'pending',
      paymentStatus: newOrder.paymentMethod === 'card' ? 'paid' : 'unpaid',
      createdAt: newOrder.createdAt || new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf8');

    return NextResponse.json({ success: true, orderNumber: newOrder.orderNumber });
  } catch (error: any) {
    console.error('Order API error', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/orders.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
