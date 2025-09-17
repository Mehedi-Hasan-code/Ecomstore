const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'next-e-com';

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    description:
      'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 25,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    description:
      'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 50,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'JavaScript: The Definitive Guide',
    price: 39.99,
    description:
      'Comprehensive guide to JavaScript programming for beginners and experts.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    stock: 15,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 19.99,
    description:
      'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 30,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Wireless Phone Charger',
    price: 29.99,
    description:
      'Fast wireless charging pad compatible with all Qi-enabled devices.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609592806596-4d8b5b1d7e7e?w=500',
    stock: 40,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Yoga Mat Premium',
    price: 49.99,
    description:
      'Non-slip premium yoga mat with extra cushioning for comfortable practice.',
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    stock: 20,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedProducts() {
  let client;

  try {
    client = new MongoClient(uri);
    await client.connect();

    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('products');

    // Check if products already exist
    const existingCount = await collection.countDocuments();

    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing products. Skipping seed.`);
      return;
    }

    // Insert sample products
    const result = await collection.insertMany(sampleProducts);

    console.log(`Successfully inserted ${result.insertedCount} products`);
    console.log('Sample products added to your MongoDB collection!');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run the seed function
seedProducts();
