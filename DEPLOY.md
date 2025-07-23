# 🚀 Deploy Instructions for Teddy Microfrontends

## Overview

This project uses a microfrontend architecture with 3 separate applications that need to be deployed individually.

## Deploy Steps

### 1. Deploy Shell App (Entry App)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Set Root Directory**: `apps/entry-app`
5. **Project Name**: `teddy-shell`
6. Deploy

### 2. Deploy Manage Customers App

1. Create a new project in Vercel
2. Import the same GitHub repository
3. **Set Root Directory**: `apps/manage-customers-app`
4. **Project Name**: `teddy-manage-customers`
5. Deploy

### 3. Deploy View Customers App

1. Create another new project in Vercel
2. Import the same GitHub repository
3. **Set Root Directory**: `apps/view-customers-app`
4. **Project Name**: `teddy-view-customers`
5. Deploy

### 4. Update Production URLs

After all deployments are complete, you'll get URLs like:

- Shell: `https://teddy-shell.vercel.app`
- Manage: `https://teddy-manage-customers.vercel.app`
- View: `https://teddy-view-customers.vercel.app`

Update `apps/entry-app/vite.config.ts` with the real URLs:

```typescript
remotes: {
  'manage-customers-app': 'https://teddy-manage-customers.vercel.app/assets/remoteEntry.js',
  'view-customers-app': 'https://teddy-view-customers.vercel.app/assets/remoteEntry.js',
}
```

### 5. Redeploy Shell App

After updating the URLs, redeploy the shell app so it knows where to find the remote modules.

## Local Development

```bash
# Run all apps
npm run dev

# Build all apps
npm run build

# Build individual apps
npm run build:shell
npm run build:manage
npm run build:view
```

## Architecture

- **Shell App**: Main router and host
- **Manage Customers**: Microfrontend for customer management
- **View Customers**: Microfrontend for viewing selected customers
- **Module Federation**: Connects all apps at runtime
