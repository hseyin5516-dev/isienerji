const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let cleanedCount = 0;
for (const p of products) {
  let d = p.description || '';
  const orig = d;

  // 1. Remove scripts
  d = d.replace(/<script[\s\S]*?<\/script>/gi, '');

  // 2. Remove modal popups
  d = d.replace(/<div class=["']modal fade["'][\s\S]*?<!--\s*<========SON=========>>> Favori Uyar[^\>]*-->/gi, '');
  d = d.replace(/<div class=["']modal fade["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');

  // 3. Remove benzer urunler section
  d = d.replace(/<!--\s*Benzer[\s\S]*?-->[\s\S]*?(<!--\s*Benzer[\s\S]*?SON[\s\S]*?-->|$)/gi, '');
  d = d.replace(/<div class=["']urun-detay-benzer-urunler[\s\S]*?$/gi, '');

  // 4. Fix relative images
  d = d.replace(/src=["']images\//gi, 'src="https://www.isienerji.com.tr/images/');
  d = d.replace(/src=["']\/images\//gi, 'src="https://www.isienerji.com.tr/images/');

  p.description = d.trim();

  // Normalize image URLs
  if (p.image && !p.image.startsWith('http')) {
    p.image = 'https://www.isienerji.com.tr/' + p.image.replace(/^\//, '');
  }
  if (Array.isArray(p.images)) {
    p.images = p.images.map(img => {
      if (img && !img.startsWith('http')) {
        return 'https://www.isienerji.com.tr/' + img.replace(/^\//, '');
      }
      return img;
    });
  }

  if (p.description !== orig) {
    cleanedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log('Cleaned products descriptions count:', cleanedCount);
