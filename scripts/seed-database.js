const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://Next-e-com:J4irdfrWxZCpIFBS@cluster0.mnqwuli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium noise-canceling wireless headphones with 30-hour battery life and crystal-clear audio quality.',
    price: 199.99,
    category: 'electronics',
    stock: 25,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Smart Fitness Watch',
    description:
      'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and smartphone notifications.',
    price: 299.99,
    category: 'electronics',
    stock: 15,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Ergonomic Laptop Stand',
    description:
      'Adjustable aluminum laptop stand for better posture and improved productivity. Compatible with all laptop sizes.',
    price: 79.99,
    category: 'electronics',
    stock: 40,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Organic Cotton T-Shirt',
    description:
      'Comfortable and sustainable organic cotton t-shirt available in multiple colors and sizes.',
    price: 29.99,
    category: 'fashion',
    stock: 100,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Wireless Phone Charger',
    description:
      'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    category: 'electronics',
    stock: 60,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description:
      'Set of 4 handcrafted ceramic coffee mugs. Perfect for your morning coffee or tea.',
    price: 49.99,
    category: 'home',
    stock: 30,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Bluetooth Portable Speaker',
    description:
      'Compact waterproof Bluetooth speaker with 12-hour battery life and powerful bass.',
    price: 89.99,
    category: 'electronics',
    stock: 35,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Yoga Mat Premium',
    description:
      'Non-slip premium yoga mat made from eco-friendly materials. Perfect for all types of yoga practice.',
    price: 59.99,
    category: 'sports',
    stock: 20,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'LED Desk Lamp',
    description:
      'Adjustable LED desk lamp with multiple brightness levels and color temperatures. USB charging port included.',
    price: 69.99,
    category: 'home',
    stock: 45,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Stainless Steel Water Bottle',
    description:
      'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 34.99,
    category: 'sports',
    stock: 80,
    image: '/api/placeholder/300/300',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecomstore');
    const productsCollection = db.collection('products');

    // Clear existing products
    await productsCollection.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await productsCollection.insertMany(sampleProducts);
    console.log(`Inserted ${result.insertedCount} products`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
