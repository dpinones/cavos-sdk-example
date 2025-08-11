# Frontend Environment Setup

## Required Environment Variables

For the application to work correctly, you need to create a `.env.local` file in the frontend root directory with the following variables:

```bash
# Cavos Configuration
CAVOS_ORG_SECRET=your_org_secret_here
CAVOS_APP_ID=your_app_id_here

# Network configuration (optional, defaults to sepolia)
NETWORK=sepolia
```

## Setup Steps

1. **Create `.env.local` file:**

   ```bash
   cd frontend
   touch .env.local
   ```

2. **Add the variables:**

   - `CAVOS_ORG_SECRET`: Your Cavos organization secret
   - `CAVOS_APP_ID`: Your Cavos application ID
   - `NETWORK`: Network to use (sepolia or mainnet)

3. **Restart the development server:**

   ```bash
   npm run dev
   ```

## Important Notes

- The `.env.local` file is already included in `.gitignore` to avoid uploading credentials
- Variables are automatically loaded in Next.js
- Make sure the credentials are valid and have the necessary permissions

## Verification

You can verify that the variables are configured correctly by checking the server logs when you make a request to the authentication endpoints.
