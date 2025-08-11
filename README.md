# Cavos SDK Frontend Template

A simple React/Next.js frontend for Cavos blockchain integration.

## What You Get

- **Sign Up UI** - User registration with wallet creation
- **Sign In UI** - Authentication interface
- **Execute UI** - Transaction execution interface
- **State Management** - Session persistence with Jotai

## Quick Setup

### 1. Start Backend First

Make sure the backend is running (see backend README)

### 2. Environment Setup

Create `.env` file:

```env
BACKEND_URL=http://localhost:3000
```

### 3. Run the Frontend

```bash
npm install
npm run dev
```

App starts at: `http://localhost:3000`

## How to Test

1. **Open the app** in your browser
2. **Generate test data:**
   - Click "Generate Random Email"
   - Click "Generate Random Password"
3. **Register:** Click "Register" button
4. **Sign In:** Use same credentials to sign in
5. **Execute:** Test a blockchain transaction

## Features

### Sign Up

- Random email/password generators
- Form validation
- Success modal shows wallet address

### Sign In

- Persistent login state
- Automatic token management
- Session indicators

### Execute

- Contract execution interface
- Transaction results
- Loading states

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Main app page
│   ├── layout.tsx            # Root layout
│   └── api/v1/               # API proxies
├── lib/
│   ├── auth-atoms.ts         # State management
│   ├── types.ts              # TypeScript types
│   └── jotai-provider.tsx    # State provider
└── package.json
```

## Need Help?

📚 **[Cavos Documentation](https://docs.cavos.xyz/)**

Complete guides, API references, and troubleshooting.
