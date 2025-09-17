import clientPromise from '../mongodb.js';
import { ObjectId } from 'mongodb';

export class Product {
  static async getAll() {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');
      const products = await db.collection('products').find({}).toArray();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');
      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) });
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');

      const product = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await db.collection('products').insertOne(product);
      return { ...product, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');

      const updateData = {
        ...productData,
        updatedAt: new Date(),
      };

      const result = await db
        .collection('products')
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.matchedCount === 0) {
        throw new Error('Product not found');
      }

      return await this.getById(id);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');

      const result = await db
        .collection('products')
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error('Product not found');
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async search(query) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');

      const searchFilter = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
        ],
      };

      const products = await db
        .collection('products')
        .find(searchFilter)
        .toArray();
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  static async getByUser(userEmail) {
    try {
      const client = await clientPromise;
      const db = client.db('ecomstore');
      const products = await db
        .collection('products')
        .find({ createdBy: userEmail })
        .toArray();
      return products;
    } catch (error) {
      console.error('Error fetching user products:', error);
      throw error;
    }
  }
}
