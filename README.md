# EcomStore - Full-Stack Next.js E-commerce Application

A comprehensive e-commerce platform built with Next.js 15, featuring product management, checkout flow, dashboard, and more.

## 🚀 Features

### Core Features

- **🔐 Authentication System** with NextAuth.js (Google OAuth + Email/Password)
- **🏠 Landing Page** with 7+ sections (Hero, Features, Products, Testimonials, Newsletter, FAQ, CTA)
- **🛍️ Product Catalog** with search, pagination, and filtering
- **📄 Product Detail Pages** with dynamic routing
- **💳 Checkout/Booking Flow** with form validation
- **📊 Protected Dashboard** with CRUD operations for products and order management
- **👤 User Profile** with order history and account management
- **📱 Responsive Design** for mobile, tablet, and desktop

### Technical Features

- **Next.js 15** with App Router
- **MongoDB** database integration
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** + **Shadcn UI** for styling
- **Server Actions** and API routes
- **Loading** and **Error** states
- **Middleware** for route protection
- **SEO Optimization** with metadata

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, MongoDB
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS, CSS Animations
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-e-com
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb+srv://Next-e-com:J4irdfrWxZCpIFBS@cluster0.mnqwuli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Seed the database** (optional)

   ```bash
   npm run seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
next-e-com/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── products/            # Product CRUD operations
│   │   └── bookings/            # Order/booking management
│   ├── dashboard/               # Protected dashboard pages
│   ├── products/                # Product pages
│   ├── checkout/                # Checkout flow
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── layout.js               # Root layout
│   ├── page.js                 # Landing page
│   ├── loading.js              # Global loading component
│   └── error.js                # Global error component
├── components/                  # Reusable components
│   ├── ui/                     # UI components (Button, Card, etc.)
│   ├── sections/               # Landing page sections
│   ├── navigation.js           # Navigation component
│   ├── providers.js            # React Query provider
│   └── footer.js               # Footer component
├── lib/                        # Utility functions
│   ├── mongodb.js              # Database connection
│   └── utils.js                # Helper functions
├── scripts/                    # Database scripts
│   └── seed-database.js        # Sample data seeding
├── middleware.js               # Next.js middleware
└── README.md                   # This file
```

## 🎯 Key Pages

### Landing Page (`/`)

- Hero section with call-to-action
- Features showcase
- Featured products
- Customer testimonials
- Newsletter signup
- FAQ section
- Final CTA

### Products (`/products`)

- Product grid with search and pagination
- Category filtering
- Responsive design
- Loading states

### Product Detail (`/products/[id]`)

- Detailed product information
- Add to cart functionality
- Stock management
- Related products

### Dashboard (`/dashboard`)

- Product management (CRUD)
- Order history
- Analytics overview
- Protected route

### Checkout (`/checkout`)

- Shipping information form
- Order summary
- Form validation
- Order placement

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## 🌟 Advanced Features Implemented

1. **Parallel Routes** - Dashboard with multiple tabs
2. **Loading States** - Custom loading.js files
3. **Error Handling** - Custom error.js files
4. **Middleware** - Route protection and redirects
5. **Pagination** - Product listing with pagination
6. **Search & Filter** - Real-time product search
7. **Responsive Design** - Mobile-first approach
8. **SEO Optimization** - Metadata and Open Graph tags
9. **Animations** - CSS animations and transitions
10. **Form Validation** - Client-side form validation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm start`

## 🔐 Environment Variables

Make sure to set up these environment variables:

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (optional)

## 📝 API Endpoints

### Products

- `GET /api/products` - Get all products (with pagination/search)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Bookings/Orders

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Contact support at support@ecomstore.com
# Ecomstore
