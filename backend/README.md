# Cavos SDK Backend Template

A simple backend template for integrating with Cavos blockchain infrastructure.

## What You Get

Three API endpoints:

- **Sign Up** - Create user + wallet
- **Sign In** - Authenticate user
- **Execute** - Run blockchain transactions

## Quick Setup

### 1. Get Cavos Credentials

1. Register at [https://aegis.cavos.xyz/login](https://aegis.cavos.xyz/login)
2. Get your API key and Organization ID

### 2. Environment Setup

Create `.env.local` file:

```env
CAVOS_API_KEY=your_api_key_here
CAVOS_ORG_ID=your_org_id_here
```

### 3. Run the Server

```bash
npm install
npm run dev
```

Server starts at: `http://localhost:3000`

## API Endpoints

### Sign Up

`POST /api/v1/auth/signUp`

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "network": "sepolia"
}
```

### Sign In

`POST /api/v1/auth/signIn`

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "network": "sepolia"
}
```

Returns:

```json
{
  "walletAddress": "0x...",
  "accessToken": "jwt_token_here"
}
```

### Execute Transaction

`POST /api/v1/execute`

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

Use the included Postman collection:

1. Import `Auth Flow - SignUp → SignIn → Execute.postman_collection.json`
2. Run the requests in order: Sign Up → Sign In → Execute
3. Everything is automated with random test data

## Need Help?

📚 **[Cavos Documentation](https://docs.cavos.xyz/)**

Complete guides, API references, and troubleshooting.
