import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('ecomstore');

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const bookings = await db
      .collection('bookings')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('ecomstore');

    const body = await request.json();
    const {
      userId,
      userEmail,
      userName,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = body;

    if (!userId || !items || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const booking = {
      userId,
      userEmail,
      userName,
      items,
      totalAmount: parseFloat(totalAmount),
      shippingAddress,
      paymentMethod: paymentMethod || 'pending',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('bookings').insertOne(booking);

    return NextResponse.json(
      {
        message: 'Booking created successfully',
        bookingId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
