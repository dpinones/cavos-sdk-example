# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Environment Setup
1. Install dependencies: `npm install`
2. Create `.env` file with required variables:
   - `CAVOS_ORG_SECRET` - Organization secret from Cavos Aegis Dashboard
   - `CAVOS_APP_ID` - Application ID from Cavos Aegis Dashboard
3. Reference: See `ENVIRONMENT_SETUP.md` for detailed setup instructions

## Architecture Overview

This is a Next.js 15 application demonstrating Cavos Service SDK integration for blockchain authentication and transaction execution on Starknet.

### Core Components

**Authentication Flow**
- `/app/api/v1/auth/signUp/route.ts` - User registration endpoint
- `/app/api/v1/auth/signIn/route.ts` - User authentication endpoint  
- `/lib/auth-atoms.ts` - Jotai state management for user authentication

**Transaction Execution**
- `/app/api/v1/execute/route.ts` - Smart contract execution endpoint
- Supports Starknet Sepolia and Mainnet networks

**Frontend**
- `/app/page.tsx` - Main application interface with auth forms and contract execution UI
- `/lib/types.ts` - TypeScript interfaces for API responses and data structures

### Key Dependencies
- `cavos-service-sdk` (^1.2.32) - Core Cavos blockchain integration
- `jotai` (^2.13.0) - State management for user authentication
- `axios` (^1.11.0) - HTTP client for API calls
- `next` (15.4.6) - React framework
- `tailwindcss` (^4) - Styling

### State Management Pattern
Uses Jotai atoms for authentication state:
- `userAtom` - Stores user data with localStorage persistence
- `isAuthenticatedAtom` - Derived atom for authentication status
- `signInAtom` & `signOutAtom` - Action atoms for auth operations

### API Route Structure
All API routes follow REST conventions and include:
- Comprehensive input validation
- Environment variable checks
- Detailed error handling with console logging
- Consistent response format

### Network Support
- Sepolia (default/testnet)
- Mainnet (production)

### Testing
Use the provided Postman collection: `Auth Flow - SignUp → SignIn → Execute.postman_collection.json`

## Development Notes

### Error Handling Pattern
All API routes implement consistent error handling:
- Input validation with descriptive error messages
- Environment variable verification
- Try-catch blocks with detailed logging
- Standardized error response format

### Security Considerations
- Environment variables for sensitive data (org secret, app ID)
- Access token validation for protected endpoints
- No sensitive data logged in production

### UI Architecture  
- Single-page application with conditional rendering
- Authentication state drives UI display
- Modular components for forms, modals, and contract execution
- Responsive design with Tailwind CSS

### Smart Contract Integration
The execute endpoint demonstrates calling a Starknet contract's `approve` function with:
- Contract address validation
- Call data structure validation
- Transaction hash return and Voyager block explorer integration