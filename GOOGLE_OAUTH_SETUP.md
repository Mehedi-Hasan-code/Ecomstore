# Google OAuth Setup Guide

## 🔧 Google Cloud Console Configuration

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Configure the following:
   - **User Type**: External (for testing) or Internal (for organization)
   - **App name**: Your App Name
   - **User support email**: Your email
   - **Developer contact information**: Your email
   - **Authorized domains**: Add your domain (for production)

### Step 3: Create OAuth 2.0 Client

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Configure:

#### Application Type: Web Application

#### Authorized JavaScript Origins:

```
http://localhost:3000
https://yourdomain.com (for production)
```

#### Authorized Redirect URIs:

```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google (for production)
```

### Step 4: Get Your Credentials

After creating the OAuth client, you'll receive:

- **Client ID**: Use this for `GOOGLE_CLIENT_ID`
- **Client Secret**: Use this for `GOOGLE_CLIENT_SECRET`

### Step 5: Environment Variables

Add these to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

## Security Best Practices

- Never commit real credentials to your repository
- Use environment variables for sensitive data
- Keep your client secret secure
- Regularly rotate your credentials if compromised
