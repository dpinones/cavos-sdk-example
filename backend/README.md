# Cavos SDK Backend Integration Template

This project serves as a template for integrating the Cavos SDK into your application. It provides a complete backend implementation with authentication and transaction execution capabilities using the Cavos service.

## Overview

The backend implements three main endpoints that demonstrate the core Cavos SDK functionality:

- **Sign Up** - Create a new user account with wallet generation
- **Sign In** - Authenticate existing users and retrieve access credentials
- **Execute** - Execute blockchain transactions using Cavos infrastructure

## Prerequisites

Before running the application, you need to:

1. **Register for Cavos**: Visit [https://aegis.cavos.xyz/login](https://aegis.cavos.xyz/login) to create your organization account
2. **Get Organization Credentials**: After registration, you'll receive the necessary environment variables from your organization data

## Environment Setup

Create a `.env.local` file in the backend directory with the following variables (values will be provided from your Cavos organization data):

```env
# Add your Cavos organization credentials here
# These values are obtained from https://aegis.cavos.xyz/login after registration
CAVOS_API_KEY=your_api_key_here
CAVOS_ORG_ID=your_org_id_here
# Add other required environment variables as per your organization setup
```

## Installation & Running

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **The server will start on:** `http://localhost:3000`

## API Endpoints

### POST `/api/v1/auth/signUp`

Creates a new user account and generates a wallet.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "network": "sepolia"
}
```

### POST `/api/v1/auth/signIn`

Authenticates a user and returns access credentials.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "network": "sepolia"
}
```

**Response:**

```json
{
  "walletAddress": "0x...",
  "accessToken": "jwt_token_here"
}
```

### POST `/api/v1/execute`

Executes blockchain transactions using the authenticated user's wallet.

**Request Body:**

```json
{
  "walletAddress": "0x...",
  "network": "sepolia",
  "accessToken": "jwt_token_here",
  "calls": [
    {
      "contractAddress": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "entrypoint": "approve",
      "calldata": [
        "0x1234567890123456789012345678901234567890",
        "500000000000000000",
        "0"
      ]
    }
  ]
}
```

## Testing

A Postman collection is included (`Auth Flow - SignUp → SignIn → Execute.postman_collection.json`) that demonstrates the complete authentication and execution flow:

1. **Import the collection** into Postman
2. **Run the requests in sequence:**
   - First: Sign Up (creates a user with random email/password)
   - Second: Sign In (authenticates and stores credentials)
   - Third: Execute (performs a blockchain transaction)

The collection automatically:

- Generates random email and password for testing
- Stores authentication tokens between requests
- Sets up all required variables for the flow

## Project Structure

```
backend/
├── src/
│   └── app/
│       └── api/
│           └── v1/
│               ├── auth/
│               │   ├── signIn/route.ts
│               │   └── signUp/route.ts
│               └── execute/route.ts
├── Auth Flow - SignUp → SignIn → Execute.postman_collection.json
├── package.json
└── README.md
```

## Getting Started

1. Register at [https://aegis.cavos.xyz/login](https://aegis.cavos.xyz/login)
2. Set up your `.env.local` file with organization credentials
3. Run `npm install && npm run dev`
4. Test using the provided Postman collection
5. Integrate the patterns into your own application

This template provides a solid foundation for building applications that leverage Cavos's blockchain infrastructure and wallet management capabilities.

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
