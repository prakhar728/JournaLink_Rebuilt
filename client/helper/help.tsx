import { ethers } from "ethers";

// Function to read from the public mapping
export default async function readFromMapping(contractAddress: string, contractABI: any, key: number): Promise<string> {
  // Create an Ethereum provider (e.g., using Infura)
  const provider = new ethers.providers.JsonRpcProvider("https://filecoin-calibration.chainup.net/rpc/v1");

  // Create an instance of the contract using the ABI and address
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // Call the generated getter function for the mapping
  try {
    const value = await contract.proposals(key);

    // Return the retrieved value
    return value;
  } catch (error:any) {
    console.log(error);
    
    return error
  }

}
