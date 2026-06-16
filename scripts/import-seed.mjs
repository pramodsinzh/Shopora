import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const documents = [
  { _type: 'category', _id: 'category-apparel', title: 'Apparel', slug: 'apparel' },
  { _type: 'category', _id: 'category-accessories', title: 'Accessories', slug: 'accessories' },
  { _type: 'category', _id: 'category-electronics', title: 'Electronics', slug: 'electronics' },
  { _type: 'brand', _id: 'brand-ecothread', title: 'EcoThread', slug: 'ecothread' },
  { _type: 'brand', _id: 'brand-hearth-hide', title: 'Hearth & Hide', slug: 'hearth-hide' },
  { _type: 'brand', _id: 'brand-soundflux', title: 'SoundFlux', slug: 'soundflux' },
  {
    _type: 'product',
    _id: 'product-organic-cotton-tshirt',
    title: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-tshirt',
    price: 1999,
    currency: 'USD',
    description: 'Comfortable organic cotton tee',
    brand: 'EcoThread',
    category: 'Apparel',
    inventory: 120,
  },
  {
    _type: 'product',
    _id: 'product-minimal-leather-wallet',
    title: 'Minimal Leather Wallet',
    slug: 'minimal-leather-wallet',
    price: 3499,
    currency: 'USD',
    description: 'Slim wallet handcrafted from full-grain leather',
    brand: 'Hearth & Hide',
    category: 'Accessories',
    inventory: 45,
  },
  {
    _type: 'product',
    _id: 'product-noise-cancelling-headphones',
    title: 'Noise-Cancelling Headphones',
    slug: 'noise-cancelling-headphones',
    price: 12999,
    currency: 'USD',
    description: 'Over-ear Bluetooth headphones with ANC',
    brand: 'SoundFlux',
    category: 'Electronics',
    inventory: 30,
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('✗ Error: SANITY_API_TOKEN not set in .env');
  process.exit(1);
}

async function importData() {
  const mutations = documents.map(doc => ({ createOrReplace: doc }));
  
  try {
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mutations }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error, null, 2));
    }

    const result = await response.json();
    console.log('✓ Seed data imported successfully');
    console.log(`  Created ${result.results.length} documents`);
  } catch (error) {
    console.error('✗ Import failed:', error.message);
    process.exit(1);
  }
}

importData();
