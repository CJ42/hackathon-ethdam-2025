import hre, { viem } from "hardhat";
import { stringToHex } from "viem";

import {
  // SEPOLIA_CHAIN_ID,
  // SAPPHIRE_CHAIN_ID,
  privaMailSepolia,
  privaMailSapphire,
  encodeMessage,
  decodeMessage,
} from "./utils";

// used as big numbers
export const SEPOLIA_CHAIN_ID = 11155111n;
export const SAPPHIRE_CHAIN_ID = 23295n;

// TODO: have this as a prompt
const message =
  "Hello Oasis network! Sending a message from the Sepolia testnet";

async function main() {
  const [walletClient] = await viem.getWalletClients();

  const {
    network: { name: selectedNetwork },
  } = hre;

  // TODO: have recipientAddress as a prompt
  let clientContractAddress, recipientAddress, destChainId;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailSepolia;
    recipientAddress = privaMailSapphire;
    destChainId = SAPPHIRE_CHAIN_ID;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailSapphire;
    recipientAddress = privaMailSepolia;
    destChainId = SEPOLIA_CHAIN_ID;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const contract = await viem.getContractAt(
    "PrivaMailClient",
    clientContractAddress,
    { client: { wallet: walletClient } }
  );

  const mailContent = stringToHex(message);
  console.log("sending mail content: ", mailContent);

  // quote the price to send the message
  console.log("Calculating fee...");
  let fee = await contract.read.quoteDispatch([destChainId, mailContent]);
  console.log(`Fee: ${fee} ETH`);
  console.log("Sending message...");
  const tx = await contract.write.sendMessage([destChainId, mailContent], {
    value: fee,
  });

  console.log("tx: ", tx);
  console.log("Message sent");
}

// Sending from Sepolia testnet:
//   -> encrypt off-chain with JS library on the sender code if the network is sepolia
//   -> decrypt on the Oasis sapphire chain inside the smart contract code (if domain == SAPPHIRE testnet chain ID)

// Sending from Sapphire testnet:
//   -> decrypt with JS library on

// JS Library = https://github.com/oasisprotocol/deoxysii-js
// use the on-chain precompile contract. Use the `decrypt` function and write that in Solidity

// TODO: encrypt with the JS library (or on-chain decrypto function from the Precompile

// Encrypt calldata from Arbitrum / EVM chain with that library:
// Decrypt on the Oasis Sapphire chain using the Sapphire precompile contract,
// the decrypt function and write that in Solidity
// Same the way back, but decrypt with the JS library

//github.com/oasisprotocol/deoxysii-js

// With Hardhat, fine to just use the Sapphire wrapper.

// Otherwise for my front-end, use that: https://api.docs.oasis.io/js/sapphire-viem-v2/#md:encryption

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
