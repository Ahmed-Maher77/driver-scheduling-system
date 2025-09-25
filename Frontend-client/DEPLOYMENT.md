# Frontend Deployment Guide - Vercel

This guide will help you deploy the Driver Scheduling System frontend to Vercel.

## Prerequisites

-   Node.js (v18 or higher)
-   Vercel CLI installed globally
-   Git repository with your code
-   Backend API deployed and accessible

## Deployment Steps

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Navigate to Frontend Directory

```bash
cd Frontend-client
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Environment Variables

Before deploying, you need to set the API base URL. You can do this in two ways:

#### Option A: Using Vercel CLI (Recommended)

```bash
vercel env add VITE_API_BASE_URL
# Enter your backend URL when prompted (e.g., https://your-backend-app.vercel.app)
```

#### Option B: Using Vercel Dashboard

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add `VITE_API_BASE_URL` with your backend URL

### 6. Deploy

```bash
vercel
```

Follow the prompts:

-   Set up and deploy? **Y**
-   Which scope? Choose your account
-   Link to existing project? **N** (for first deployment)
-   Project name: `driver-scheduling-frontend` (or your preferred name)
-   Directory: `./` (current directory)
-   Override settings? **N**

### 7. Production Deployment

For production deployment:

```bash
vercel --prod
```

## Environment Variables

| Variable            | Description          | Example                               |
| ------------------- | -------------------- | ------------------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `https://your-backend-app.vercel.app` |

## Configuration Files

### vercel.json

-   Configures Vercel to build the React app as a static site
-   Sets up routing for SPA (Single Page Application)
-   Handles asset serving

### vite.config.ts

-   Configures Vite build settings
-   Sets up environment variable handling
-   Optimizes build output

## Troubleshooting

### Build Errors

1. **TypeScript errors**: Run `npm run lint` to check for issues
2. **Missing dependencies**: Ensure all dependencies are in `package.json`
3. **Environment variables**: Verify `VITE_API_BASE_URL` is set correctly

### Runtime Errors

1. **API connection issues**: Check if backend is deployed and accessible
2. **CORS errors**: Ensure backend has proper CORS configuration
3. **404 errors**: Check if routes are properly configured in `vercel.json`

### Common Issues

1. **Environment variables not working**: Make sure they start with `VITE_`
2. **Build failing**: Check Node.js version (should be 18+)
3. **Assets not loading**: Verify `vercel.json` routes configuration

## Development vs Production

### Development

-   Uses `http://localhost:6060` as default API URL
-   Hot reload enabled
-   Source maps available

### Production

-   Uses environment variable `VITE_API_BASE_URL`
-   Optimized build
-   No source maps (for security)

## Updating Deployment

To update your deployment:

```bash
# Make your changes
git add .
git commit -m "Update frontend"

# Deploy updates
vercel --prod
```

## Monitoring

-   Check deployment status in Vercel dashboard
-   Monitor function logs for errors
-   Use Vercel Analytics for performance insights

## Support

For issues with:

-   **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
-   **Frontend**: Check browser console for errors
-   **API**: Verify backend deployment and logs
