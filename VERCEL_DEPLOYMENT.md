# Vercel Deployment Guide

## Environment Variables Required

You need to set these environment variables in your Vercel dashboard:

### 1. MongoDB Connection

```
MONGODB_URI=your-mongodb-connection-string
```

### 2. NextAuth Configuration

```
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_URL=https://your-vercel-app-url.vercel.app
```

### 3. Google OAuth (if using Google sign-in)

```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Steps to Deploy

1. **Set Environment Variables in Vercel Dashboard:**

   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add all the variables above with your actual values

2. **Deploy:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push to main branch

## Important Security Notes

- Never commit real credentials to your repository
- Use placeholder values in documentation files
- Set actual values only in your deployment environment
- Keep your `.env.local` file in `.gitignore`
