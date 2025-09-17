import { NextResponse } from 'next/server';
import { Product } from '@/lib/models/product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const userOnly = searchParams.get('userOnly');

    let products;

    if (userOnly === 'true') {
      // Get user's own products only
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      products = await Product.getByUser(session.user.email);
    } else if (query) {
      products = await Product.search(query);
    } else {
      products = await Product.getAll();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const { name, price, description, category, image } = body;

    if (!name || !price || !description || !category) {
      return NextResponse.json(
        {
          error: 'Missing required fields: name, price, description, category',
        },
        { status: 400 }
      );
    }

    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      image: image || '/placeholder-product.jpg',
      stock: body.stock || 0,
      featured: body.featured || false,
      createdBy: session.user.email,
    };

    const product = await Product.create(productData);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
