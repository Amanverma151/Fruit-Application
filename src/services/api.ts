// api.ts
import axios from 'axios';
import { Fruit } from '../types';

const API_URL = 'https://mock-api-endpoint.com/fruits';  
export const fetchFruits = async (): Promise<Fruit[]> => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched fruits:', response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching fruits:', error);  
    return [];
  }
};
