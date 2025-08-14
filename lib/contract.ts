import axios from 'axios';
import type { Store, Price, StoreWithPrice, Report } from './types';

// Contract address - this would be configured via environment variables
const CONTRACT_ADDRESS = "0x06b1ea5990a839008e7abb84b971fd667a4f537cb73dfa8a18a572ce02982a1a";

export interface ContractCallParams {
  walletAddress: string;
  network: string;
  accessToken: string;
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

// Contract read functions (these would be view functions in production)
export async function getAllStores(params: ContractCallParams): Promise<Store[]> {
  try {
    // In production, this would call the contract's get_all_stores function
    // For now, we'll return mock data
    console.log('Calling get_all_stores with params:', params);
    
    // Mock implementation - replace with actual contract call
    return [
      {
        id: "1",
        name: "Carrefour Villa Crespo",
        address: "Av. Corrientes 4817, Villa Crespo, CABA",
        phone: "+54 11 4857-3200",
        hours: "Lun-Dom: 8:00-22:00",
        uri: "https://www.carrefour.com.ar/tiendas/villa-crespo"
      },
      // ... other stores
    ];
  } catch (error) {
    console.error('Error getting all stores:', error);
    throw error;
  }
}

export async function getAllCurrentPrices(params: ContractCallParams): Promise<Array<{store_id: string, price: Price}>> {
  try {
    // In production, this would call the contract's get_all_current_prices function
    console.log('Calling get_all_current_prices with params:', params);
    
    // Mock implementation
    return [
      {
        store_id: "1",
        price: {
          store_id: "1",
          price_in_cents: 189000,
          timestamp: Math.floor(Date.now() / 1000),
          updated_by: "admin"
        }
      },
      // ... other prices
    ];
  } catch (error) {
    console.error('Error getting current prices:', error);
    throw error;
  }
}

export async function getStore(params: ContractCallParams, storeId: string): Promise<Store> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "get_store", [storeId]);
    console.log('Calling get_store with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return {
      id: storeId,
      name: "Store Name",
      address: "Store Address",
      phone: "+54 11 1234-5678",
      hours: "Lun-Dom: 8:00-22:00",
      uri: "https://example.com"
    };
  } catch (error) {
    console.error('Error getting store:', error);
    throw error;
  }
}

export async function getCurrentPrice(params: ContractCallParams, storeId: string): Promise<Price> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "get_current_price", [storeId]);
    console.log('Calling get_current_price with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return {
      store_id: storeId,
      price_in_cents: 175000,
      timestamp: Math.floor(Date.now() / 1000),
      updated_by: "admin"
    };
  } catch (error) {
    console.error('Error getting current price:', error);
    throw error;
  }
}

export async function getPriceHistory(params: ContractCallParams, storeId: string): Promise<Price[]> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "get_price_history", [storeId]);
    console.log('Calling get_price_history with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return [
      {
        store_id: storeId,
        price_in_cents: 175000,
        timestamp: Math.floor(Date.now() / 1000),
        updated_by: "admin"
      }
    ];
  } catch (error) {
    console.error('Error getting price history:', error);
    throw error;
  }
}

export async function getThanksCount(params: ContractCallParams, storeId: string): Promise<number> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "get_thanks_count", [storeId]);
    console.log('Calling get_thanks_count with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return 2;
  } catch (error) {
    console.error('Error getting thanks count:', error);
    throw error;
  }
}

export async function hasUserThanked(params: ContractCallParams, storeId: string): Promise<boolean> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "has_user_thanked", [storeId, params.walletAddress]);
    console.log('Calling has_user_thanked with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return false;
  } catch (error) {
    console.error('Error checking if user thanked:', error);
    throw error;
  }
}

export async function getReports(params: ContractCallParams, storeId: string): Promise<Report[]> {
  try {
    // In production: await executeContractCall(params, CONTRACT_ADDRESS, "get_reports", [storeId]);
    console.log('Calling get_reports with params:', params, 'storeId:', storeId);
    
    // Mock implementation
    return [];
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
  priceInCents: number,
  timestamp?: number
) {
  try {
    const ts = timestamp || Math.floor(Date.now() / 1000);
    
    const result = await executeContractCall(
      params,
      CONTRACT_ADDRESS,
      "update_price",
      [storeId, priceInCents.toString(), ts.toString()]
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
        store.uri
      ]
    );
    
    console.log('Store added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding store:', error);
    throw error;
  }
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
