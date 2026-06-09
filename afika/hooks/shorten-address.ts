import { isAddress, getAddress } from 'ethers';

export const shortenAddress = (address: string, chars = 4): string => {
  if (!address || !isAddress(address)) {
    return 'Invalid Address';
  }

  const cleanAddress = getAddress(address);
  
  const start = cleanAddress.substring(0, chars + 2); 
  const end = cleanAddress.substring(42 - chars);
  
  return `${start}...${end}`;
};