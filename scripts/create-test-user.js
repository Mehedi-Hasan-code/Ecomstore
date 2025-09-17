const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri =
  'mongodb+srv://Next-e-com:J4irdfrWxZCpIFBS@cluster0.mnqwuli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function createTestUser() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecomstore');
    const usersCollection = db.collection('users');

    // Check if test user already exists
    const existingUser = await usersCollection.findOne({
      email: 'test@example.com',
    });
    if (existingUser) {
      console.log('Test user already exists!');
      console.log('Email: test@example.com');
      console.log('Password: password123');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(testUser);
    console.log('Test user created successfully!');
    console.log('User ID:', result.insertedId);
    console.log('');
    console.log('🔐 Test Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('');
    console.log('You can now sign in with these credentials!');
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.close();
  }
}

createTestUser();
