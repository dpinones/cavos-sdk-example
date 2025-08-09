# Cavos SDK Frontend Integration Template

This project serves as a frontend template for integrating with the Cavos SDK. It provides a complete React/Next.js application with authentication UI and transaction execution capabilities that connect to the Cavos backend services.

## Overview

The frontend implements a comprehensive user interface for:

- **Sign Up** - User registration with automatic wallet generation
- **Sign In** - User authentication and session management
- **Execute** - Blockchain transaction execution interface
- **State Management** - Persistent user session using Jotai

## Prerequisites

Before running the application, ensure you have:

1. **Backend Running**: The Cavos SDK backend must be running (see backend README)
2. **Node.js**: Version 18 or higher
3. **Environment Setup**: Backend configured with proper Cavos credentials

## Environment Setup

Create a `.env` file in the frontend directory with the following variables:

```env
# Backend URL - Point to your running Cavos backend
BACKEND_URL=http://localhost:3000
```

**Note**: Replace `http://localhost:3000` with your actual backend URL if running on a different host or port.

## Installation & Running

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **The application will start on:** `http://localhost:3000`

## API Integration

The frontend connects to these backend endpoints:

### POST `/api/v1/auth/signUp`

Creates a new user account with automatic wallet generation.

**Frontend Features:**

- Random email/password generators for testing
- Form validation and error handling
- Success modal with wallet address display

### POST `/api/v1/auth/signIn`

Authenticates users and manages session state.

**Frontend Features:**

- Persistent login state with localStorage
- Automatic token management
- User session indicators

### POST `/api/v1/execute`

Executes blockchain transactions using authenticated user's wallet.

**Frontend Features:**

- Contract execution interface
- Transaction result display
- Loading states and progress indicators

## Project Structure

```
frontend/
├── app/
│   ├── api/v1/               # API route proxies
│   │   ├── auth/
│   │   │   ├── signIn/route.ts
│   │   │   └── signUp/route.ts
│   │   └── execute/route.ts
├── layout.tsx            # Root layout component
│   ├── page.tsx              # Main application page
│   └── globals.css           # Global styles
├── lib/
│   ├── auth-atoms.ts         # Jotai authentication atoms
│   ├── types.ts              # TypeScript type definitions
│   ├── jotai-provider.tsx    # Jotai provider setup
│   └── fonts.ts              # Font configurations
├── public/                   # Static assets
├── package.json
└── README.md
```

## Getting Started

1. **Start the backend** (see backend README for setup)
2. **Set up environment variables** with your backend URL in `.env`
3. **Install frontend dependencies:** `npm install`
4. **Run the development server:** `npm run dev`
5. **Open:** `http://localhost:3000`
6. **Test the flow:**
   - Click "Generate Random Email" and "Generate Random Password"
   - Click "Register" to create a new account
   - Use the same credentials to "Sign In"
   - Execute a test contract transaction

This template provides a complete frontend solution for applications leveraging Cavos's blockchain infrastructure, with modern React patterns and excellent developer experience.

## Questions or Need Help?

For comprehensive documentation, SDK references, and guides, visit the official Cavos documentation:

📚 **[Cavos Documentation](https://docs.cavos.xyz/)**

The documentation includes:

- Complete API references
- Integration guides
- SDK documentation
- Best practices
- Troubleshooting guides

If you have any questions about this template or Cavos integration, the documentation is your best resource for detailed information and support.
