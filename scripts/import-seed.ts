import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

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

async function importSeedData() {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-05-23',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });

  try {
    console.log(`Importing ${documents.length} documents...`);
    const result = await client.create(documents);
    console.log('✓ Seed data imported successfully');
    console.log(result);
  } catch (error) {
    console.error('✗ Import failed:', error.message);
    process.exit(1);
  }
}

importSeedData();
