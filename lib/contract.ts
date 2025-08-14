import axios from 'axios';
import { Provider, Contract, RpcProvider, shortString } from 'starknet';
import type { Store, Price, StoreWithPrice, Report, PriceDisplay } from './types';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract-config';

export interface ContractCallParams {
  walletAddress: string;
  network: string;
  accessToken: string;
}

// Helper function to get Starknet provider
function getStarknetProvider(network: string): RpcProvider {
  const rpcUrl = network === 'mainnet' 
    ? 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7'
    : 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7';
  
  return new RpcProvider({ nodeUrl: rpcUrl });
}

// Helper function to get contract instance for view calls
function getContractForReading(network: string): Contract {
  const provider = getStarknetProvider(network);
  return new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, provider);
}

// Helper function to convert ByteArray to string
function byteArrayToString(byteArray: any): string {
  if (!byteArray || typeof byteArray === 'string') {
    return byteArray || '';
  }
  
  try {
    // Handle different ByteArray formats
    if (byteArray.data && Array.isArray(byteArray.data)) {
      let result = '';
      for (const item of byteArray.data) {
        result += shortString.decodeShortString(item);
      }
      if (byteArray.pending_word && byteArray.pending_word_len > 0) {
        result += shortString.decodeShortString(byteArray.pending_word).slice(0, byteArray.pending_word_len);
      }
      return result;
    }
    
    return shortString.decodeShortString(byteArray.toString());
  } catch (error) {
    console.warn('Error decoding ByteArray:', error);
    return byteArray.toString() || '';
  }
}

// Helper function to convert u256 to number (price in cents)
function u256ToNumber(u256Value: any): number {
  try {
    if (typeof u256Value === 'string') {
      return parseInt(u256Value);
    }
    if (typeof u256Value === 'number') {
      return u256Value;
    }
    if (u256Value && typeof u256Value === 'object') {
      // Handle { low: number, high: number } format
      if ('low' in u256Value && 'high' in u256Value) {
        return u256Value.low + (u256Value.high * Math.pow(2, 128));
      }
    }
    return parseInt(u256Value.toString());
  } catch (error) {
    console.warn('Error converting u256 to number:', error);
    return 0;
  }
}

// Helper function to format price for display
function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

// Function to execute contract calls through Cavos
async function executeContractCall(
  params: ContractCallParams,
  contractAddress: string,
  entrypoint: string,
  calldata: string[] = []
) {
  try {
    const response = await axios.post("/api/v1/execute", {
      walletAddress: params.walletAddress,
      network: params.network,
      accessToken: params.accessToken,
      calls: [
        {
          contractAddress,
          entrypoint,
          calldata,
        },
      ],
    });

    return response.data;
  } catch (error) {
    console.error(`Error calling ${entrypoint}:`, error);
    throw error;
  }
}

// Contract read functions using real Starknet integration
export async function getAllStores(params: ContractCallParams): Promise<Store[]> {
  try {
    console.log('Calling get_all_stores with network:', params.network);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_all_stores');
    console.log('Raw contract result for get_all_stores:', result);
    
    // Convert contract result to Store array
    const stores: Store[] = [];
    if (Array.isArray(result)) {
      for (const storeData of result) {
        stores.push({
          id: storeData.id.toString(),
          name: byteArrayToString(storeData.name),
          address: byteArrayToString(storeData.address),
          phone: byteArrayToString(storeData.phone),
          hours: byteArrayToString(storeData.hours),
          URI: byteArrayToString(storeData.URI)
        });
      }
    }
    
    return stores;
  } catch (error) {
    console.error('Error getting all stores:', error);
    throw error;
  }
}

export async function getAllCurrentPrices(params: ContractCallParams): Promise<Array<{store_id: string, price: Price}>> {
  try {
    console.log('Calling get_all_current_prices with network:', params.network);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_all_current_prices');
    console.log('Raw contract result for get_all_current_prices:', result);
    
    // Convert contract result to price array
    const prices: Array<{store_id: string, price: Price}> = [];
    if (Array.isArray(result)) {
      for (const priceData of result) {
        // priceData should be [store_id, Price] tuple
        const [storeId, priceInfo] = priceData;
        prices.push({
          store_id: storeId.toString(),
          price: {
            price: priceInfo.price.toString(),
            timestamp: Number(priceInfo.timestamp)
          }
        });
      }
    }
    
    return prices;
  } catch (error) {
    console.error('Error getting current prices:', error);
    throw error;
  }
}

export async function getStore(params: ContractCallParams, storeId: string): Promise<Store> {
  try {
    console.log('Calling get_store with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_store', [storeId]);
    console.log('Raw contract result for get_store:', result);
    
    return {
      id: result.id.toString(),
      name: byteArrayToString(result.name),
      address: byteArrayToString(result.address),
      phone: byteArrayToString(result.phone),
      hours: byteArrayToString(result.hours),
      URI: byteArrayToString(result.URI)
    };
  } catch (error) {
    console.error('Error getting store:', error);
    throw error;
  }
}

export async function getCurrentPrice(params: ContractCallParams, storeId: string): Promise<Price> {
  try {
    console.log('Calling get_current_price with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_current_price', [storeId]);
    console.log('Raw contract result for get_current_price:', result);
    
    return {
      price: result.price.toString(),
      timestamp: Number(result.timestamp)
    };
  } catch (error) {
    console.error('Error getting current price:', error);
    throw error;
  }
}

export async function getPriceHistory(params: ContractCallParams, storeId: string): Promise<Price[]> {
  try {
    console.log('Calling get_price_history with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_price_history', [storeId]);
    console.log('Raw contract result for get_price_history:', result);
    
    const prices: Price[] = [];
    if (Array.isArray(result)) {
      for (const priceData of result) {
        prices.push({
          price: priceData.price.toString(),
          timestamp: Number(priceData.timestamp)
        });
      }
    }
    
    return prices;
  } catch (error) {
    console.error('Error getting price history:', error);
    throw error;
  }
}

export async function getThanksCount(params: ContractCallParams, storeId: string): Promise<number> {
  try {
    console.log('Calling get_thanks_count with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_thanks_count', [storeId]);
    console.log('Raw contract result for get_thanks_count:', result);
    
    return Number(result);
  } catch (error) {
    console.error('Error getting thanks count:', error);
    throw error;
  }
}

export async function hasUserThanked(params: ContractCallParams, storeId: string): Promise<boolean> {
  try {
    console.log('Calling has_user_thanked with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('has_user_thanked', [storeId, params.walletAddress]);
    console.log('Raw contract result for has_user_thanked:', result);
    
    // Handle boolean result from contract
    return result === true || result === 1 || result?.toString() === '1';
  } catch (error) {
    console.error('Error checking if user thanked:', error);
    throw error;
  }
}

export async function getReports(params: ContractCallParams, storeId: string): Promise<Report[]> {
  try {
    console.log('Calling get_reports with network:', params.network, 'storeId:', storeId);
    const contract = getContractForReading(params.network);
    
    const result = await contract.call('get_reports', [storeId]);
    console.log('Raw contract result for get_reports:', result);
    
    const reports: Report[] = [];
    if (Array.isArray(result)) {
      for (const reportData of result) {
        reports.push({
          store_id: reportData.store_id.toString(),
          description: byteArrayToString(reportData.description),
          submitted_at: Number(reportData.submitted_at),
          submitted_by: reportData.submitted_by.toString()
        });
      }
    }
    
    return reports;
  } catch (error) {
    console.error('Error getting reports:', error);
    throw error;
  }
}

// Contract write functions
export async function giveThanks(params: ContractCallParams, storeId: string) {
  try {
    const result = await executeContractCall(
      params,
      CONTRACT_ADDRESS,
      "give_thanks",
      [storeId]
    );
    
    console.log('Thanks given successfully:', result);
    return result;
  } catch (error) {
    console.error('Error giving thanks:', error);
    throw error;
  }
}

export async function submitReport(params: ContractCallParams, storeId: string, description: string) {
  try {
    const result = await executeContractCall(
      params,
      CONTRACT_ADDRESS,
      "submit_report",
      [storeId, description]
    );
    
    console.log('Report submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
}

export async function updatePrice(
  params: ContractCallParams,
  storeId: string,
  priceInCents: number
) {
  try {
    // Convert price in cents to u256 format
    const priceU256 = priceInCents.toString();
    
    const result = await executeContractCall(
      params,
      CONTRACT_ADDRESS,
      "update_price",
      [storeId, priceU256]
    );
    
    console.log('Price updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating price:', error);
    throw error;
  }
}

export async function addStore(
  params: ContractCallParams,
  store: Omit<Store, 'id'>
) {
  try {
    const result = await executeContractCall(
      params,
      CONTRACT_ADDRESS,
      "add_store",
      [
        store.name,
        store.address,
        store.phone,
        store.hours,
        store.URI
      ]
    );
    
    console.log('Store added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding store:', error);
    throw error;
  }
}

// Helper function to convert Price to PriceDisplay for frontend
export function priceToDisplay(price: Price, storeId: string): PriceDisplay {
  const priceInCents = u256ToNumber(price.price);
  return {
    store_id: storeId,
    price_in_cents: priceInCents,
    timestamp: price.timestamp,
    formatted_price: formatPrice(priceInCents)
  };
}

// Helper function to get complete store data with prices and metadata
export async function getStoreWithPrice(params: ContractCallParams, storeId: string): Promise<StoreWithPrice> {
  try {
    const [store, price, thanksCount, reports] = await Promise.all([
      getStore(params, storeId),
      getCurrentPrice(params, storeId),
      getThanksCount(params, storeId),
      getReports(params, storeId)
    ]);

    return {
      ...store,
      current_price: price,
      thanks_count: thanksCount,
      reports
    };
  } catch (error) {
    console.error('Error getting store with price:', error);
    throw error;
  }
}

// Helper function to get all stores with their complete data
export async function getAllStoresWithPrices(params: ContractCallParams): Promise<StoreWithPrice[]> {
  try {
    const stores = await getAllStores(params);
    
    // Get complete data for each store
    const storesWithPrices = await Promise.all(
      stores.map(store => getStoreWithPrice(params, store.id))
    );

    return storesWithPrices;
  } catch (error) {
    console.error('Error getting all stores with prices:', error);
    throw error;
  }
}

// Helper function to get stores with current prices using the optimized contract method
export async function getAllStoresWithCurrentPrices(params: ContractCallParams): Promise<Array<{store: Store, price: PriceDisplay}>> {
  try {
    const [stores, prices] = await Promise.all([
      getAllStores(params),
      getAllCurrentPrices(params)
    ]);
    
    // Create a map of store_id to price for efficient lookup
    const priceMap = new Map<string, Price>();
    prices.forEach(priceData => {
      priceMap.set(priceData.store_id, priceData.price);
    });
    
    // Combine stores with their prices
    const result: Array<{store: Store, price: PriceDisplay}> = [];
    stores.forEach(store => {
      const price = priceMap.get(store.id);
      if (price) {
        result.push({
          store,
          price: priceToDisplay(price, store.id)
        });
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error getting all stores with current prices:', error);
    throw error;
  }
}
