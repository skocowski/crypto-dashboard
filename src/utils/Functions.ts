import axios from "axios";
import { GlpToken, Token } from "./interfaces";
import { BASE_URL } from "./Constants";

export function isValidEthereumAddress(address: string) {
  // Regular expression pattern for Ethereum addresses
  const regex = /^(0x)?[0-9a-fA-F]{40}$/;

  // Check if the address matches the pattern
  return regex.test(address);
}

export function checkCount(array: any) {
  let sum = 0;

  for (let item of array) {
    if (item.isChecked) {
      sum += 1;
    }
  }
  return sum;
}

export async function fetchTokens(walletAddress: string): Promise<Token[]> {
  try {
    const response = await axios.get<Token[]>(
      `/api/tokens?address=${walletAddress}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return []; // Return an empty array if there's an error
  }
}

export async function fetchNativeTokens(walletAddress: string): Promise<Token[]> {
  try {
    const response = await axios.get<Token[]>(
      `/api/native?address=${walletAddress}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return []; // Return an empty array if there's an error
  }
}

export async function fetchGlp(walletAddress: string): Promise<GlpToken> {
  try {
    const response = await axios.get<GlpToken>(
      `/api/glp?address=${walletAddress}`
    );
    return response.data; // Return a single object
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return {} as GlpToken; // Return an empty object if there's an error
  }
}