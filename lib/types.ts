export interface RegistrationData {
  email: string;
  wallet_address: string;
  created_at: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  access_token: string;
  wallet_address: string;
  email?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: RegistrationData;
}

export interface ContractExecutionResult {
  success: boolean;
  message: string;
  data?: {
    txHash?: string;
    [key: string]: unknown;
  };
  transactionHash?: string;
  blockNumber?: number;
}
