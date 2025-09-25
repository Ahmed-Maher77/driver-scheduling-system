# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Ensure your database is accessible from Vercel
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Code

✅ **Already Done**:

-   `vercel.json` configuration file created
-   `package.json` updated with proper scripts
-   `.vercelignore` file created
-   `index.js` modified for serverless deployment
-   README.md with documentation

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Navigate to your backend directory**:

```bash
cd "Backend - serverSide"
```

**⚠️ IMPORTANT**: Vercel doesn't allow spaces in function names. If deployment fails, rename your directory:

```bash
# Rename the directory to remove spaces
mv "Backend - serverSide" "backend-server"
cd backend-server
```

4. **Deploy**:

```bash
vercel
```

5. **Follow the prompts**:
    - Set up and deploy? `Y`
    - Which scope? (select your account)
    - Link to existing project? `N`
    - Project name: `driver-scheduling-backend` (or your preferred name)
    - Directory: `./` (current directory)
    - Override settings? `N`

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Set the **Root Directory** to `Backend - serverSide`
5. Click "Deploy"

## Step 3: Configure Environment Variables

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the following variables:

| Name           | Value                                                               | Environment |
| -------------- | ------------------------------------------------------------------- | ----------- |
| `DATABASE_URL` | `mongodb+srv://username:password@cluster.mongodb.net/database_name` | Production  |
| `NODE_ENV`     | `production`                                                        | Production  |

## Step 4: Redeploy

After setting environment variables:

```bash
vercel --prod
```

Or trigger a new deployment from the Vercel dashboard.

## Step 5: Test Your Deployment

Your API will be available at:

```
https://your-project-name.vercel.app
```

Test endpoints:

-   `GET https://your-project-name.vercel.app/` - Home page
-   `GET https://your-project-name.vercel.app/get-dashboard-stats` - Dashboard stats
-   `POST https://your-project-name.vercel.app/add-new-driver` - Add driver

## Important Notes

### MongoDB Atlas Configuration

Ensure your MongoDB Atlas cluster allows connections from Vercel:

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allow all IPs) OR add Vercel's IP ranges
3. Ensure your database user has proper permissions

### Static Files

Static files in `views/staticFiles/` will be served from:

```
https://your-project-name.vercel.app/filename.css
```

### Cold Starts

Vercel uses serverless functions, so there might be cold starts. Consider:

-   Using Vercel Pro for better performance
-   Implementing connection pooling for MongoDB
-   Adding health check endpoints

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**:

    - Ensure all dependencies are in `package.json`
    - Check that all route files exist and export properly

2. **Database connection issues**:

    - Verify `DATABASE_URL` is correct
    - Check MongoDB Atlas network access settings
    - Ensure database user has proper permissions

3. **Static files not loading**:

    - Check file paths in `vercel.json`
    - Ensure files exist in `views/staticFiles/`

4. **Environment variables not working**:
    - Redeploy after adding environment variables
    - Check variable names match exactly (case-sensitive)

### Debugging

1. **Check Vercel Function Logs**:

    - Go to your project dashboard
    - Click "Functions" tab
    - View logs for any errors

2. **Test locally with production environment**:

```bash
vercel dev
```

## Production Checklist

-   [ ] All environment variables set
-   [ ] MongoDB Atlas accessible from Vercel
-   [ ] All API endpoints tested
-   [ ] Static files loading correctly
-   [ ] Error handling working
-   [ ] CORS configured (if needed for frontend)
-   [ ] Rate limiting implemented (if needed)

## Next Steps

After successful deployment:

1. **Update Frontend**: Point your frontend to the new Vercel URL
2. **Set up Custom Domain**: Configure a custom domain in Vercel
3. **Monitor**: Use Vercel Analytics to monitor performance
4. **Backup**: Ensure your MongoDB Atlas has proper backups

## Support

-   [Vercel Documentation](https://vercel.com/docs)
-   [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
-   [Express.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)
