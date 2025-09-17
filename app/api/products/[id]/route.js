import { NextResponse } from 'next/server';
import { Product } from '@/lib/models/product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/products/[id] - Get single product
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await Product.getById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (protected)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, get the product to check ownership
    const existingProduct = await Product.getById(id);

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if the user owns this product
    if (existingProduct.createdBy !== session.user.email) {
      return NextResponse.json(
        { error: 'You can only edit products you created' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const updateData = {
      ...body,
      price: body.price ? parseFloat(body.price) : undefined,
    };

    // Remove undefined values
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const product = await Product.update(id, updateData);

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (protected)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, get the product to check ownership
    const product = await Product.getById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if the user owns this product
    if (product.createdBy !== session.user.email) {
      return NextResponse.json(
        { error: 'You can only delete products you created' },
        { status: 403 }
      );
    }

    await Product.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
