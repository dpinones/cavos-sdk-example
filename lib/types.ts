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
