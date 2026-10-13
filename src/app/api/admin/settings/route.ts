import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/data/siteConfig.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const updated = await req.json();
    const filePath = path.join(process.cwd(), 'src/data/siteConfig.json');
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
