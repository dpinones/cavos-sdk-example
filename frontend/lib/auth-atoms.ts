import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Define the user data interface
export interface UserData {
  access_token: string;
  wallet_address: string;
  email: string;
  network?: string;
}

// Define the sign-in response interface
export interface SignInResponse {
  success: boolean;
  message: string;
  access_token: string;
  wallet_address: string;
  email?: string; // Make email optional to match the interface in page.tsx
}

// Create atoms for user authentication
// Using atomWithStorage to persist the data in localStorage
export const userAtom = atomWithStorage<UserData | null>("cavos_user", null);

// Atom to track if user is authenticated
export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  return user !== null && user.access_token !== "";
});

// Atom for the access token specifically
export const accessTokenAtom = atom(
  (get) => get(userAtom)?.access_token || null
);

// Atom for the wallet address
export const walletAddressAtom = atom(
  (get) => get(userAtom)?.wallet_address || null
);

// Atom for the user email
export const userEmailAtom = atom((get) => get(userAtom)?.email || null);

// Action atoms for authentication
export const signInAtom = atom(
  null,
  (get, set, signInResponse: SignInResponse) => {
    if (signInResponse.success) {
      const userData: UserData = {
        access_token: signInResponse.access_token,
        wallet_address: signInResponse.wallet_address,
        email: signInResponse.email || "", // Provide fallback for undefined email
        network: "sepolia", // You can make this dynamic if needed
      };
      set(userAtom, userData);
    }
  }
);

export const signOutAtom = atom(null, (get, set) => {
  set(userAtom, null);
});
