import { atom } from "jotai";
import type { SignInResponse } from "./types";

export interface UserData {
  access_token: string;
  wallet_address: string;
  network: string;
}

export const userAtom = atom<UserData | null>(null);

export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  return user !== null;
});

export const signInAtom = atom(null, (get, set, signInResponse: SignInResponse) => {
  if (signInResponse.success) {
    const userData: UserData = {
      access_token: signInResponse.access_token,
      wallet_address: signInResponse.wallet_address,
      network: signInResponse.network,
    };
    set(userAtom, userData);
  }
});

export const signOutAtom = atom(null, (get, set) => {
  set(userAtom, null);
});