# Deploy to Vercel

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

## Manual Deployment Steps

### 1. Prerequisites

- GitHub repository with your Next.js app
- Vercel account (free tier available)

### 2. Environment Variables

Set these in your Vercel dashboard:

```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secure-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Deploy

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables
5. Deploy!

## Important Notes

- Replace placeholder values with your actual credentials
- Never commit real secrets to your repository
- Use Vercel's environment variables for sensitive data
- Your app will be available at `https://your-app.vercel.app`
