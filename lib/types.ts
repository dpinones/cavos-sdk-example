export interface SignInResponse {
  success: boolean;
  access_token: string;
  wallet_address: string;
  network: string;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    wallet_address: string;
    created_at: string;
  };
}

export interface ContractExecutionResult {
  success: boolean;
  message: string;
  data?: {
    txHash?: string;
    [key: string]: unknown;
  };
}

// Fernet Barato specific types
export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  uri: string;
}

export interface Price {
  store_id: string;
  price_in_cents: number;
  timestamp: number;
  updated_by: string;
}

export interface Report {
  store_id: string;
  user: string;
  description: string;
  timestamp: number;
}

export interface StoreWithPrice extends Store {
  current_price: Price;
  thanks_count: number;
  reports: Report[];
  price_difference_from_cheapest?: number;
  price_difference_percentage?: number;
}

export interface FilterOptions {
  sortBy: 'price' | 'distance';
  showReported?: boolean;
}
