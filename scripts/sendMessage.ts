import hre, { viem } from "hardhat";
import { toHex, concatHex } from "viem";

import {
  privaMailSepolia,
  privaMailSapphire,
  logMessages,
  loadingSpinner,
  loadPrivaMailHeader,
} from "./utils";

import { encryptMessage } from "./encryption";

// used as big numbers
export const SEPOLIA_CHAIN_ID = 11155111n;
export const SAPPHIRE_CHAIN_ID = 23295n;

async function main() {
  const [walletClient] = await viem.getWalletClients();

  loadPrivaMailHeader();

  console.log("[- ✉️ -] PrivaMail - Sending service MODE = ON");
  console.log("==============================================");

  // TODO: have this as a prompt
  const message = "Hello Sepolia! Sending a message from the Oasis testnet";

  console.log("Preparing message to send...");
  loadingSpinner();

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

  const { encryptedData, NONCE } = encryptMessage(message);

  // Assuming NONCE is Uint8Array
  const hexNonce = toHex(NONCE);
  const hexEncryptedData = toHex(encryptedData);

  const mailContent = concatHex([hexEncryptedData, hexNonce]);

  // quote the price to send the message
  console.log("Calculating fee...");
  let fee = await contract.read.quoteDispatch([destChainId, mailContent]);
  console.log(`Fee: ${fee} ETH`);

  const tx = await contract.write.sendMessage([destChainId, mailContent], {
    value: fee,
  });

  logMessages([
    `to: ${recipientAddress}`,
    `destination: destChainId`,
    `message: '${message}'`,
    `NONCE=${NONCE}`,
    `🔐 Encrypted as: '${mailContent}'`,
    `🔀 Sending... Tx=${tx}`,
    `📤 Message sent!`,
  ]);
}

// Sending from Sepolia testnet:
//   -> encrypt off-chain with JS library on the sender code if the network is sepolia
//   -> decrypt on the Oasis sapphire chain inside the smart contract code (if domain == SAPPHIRE testnet chain ID)

// This is the flow:
//
// Sending from Sapphire testnet:
//   -> encrypt with JS library on Sapphire
//   -> the contract receives it encrypted on Sepolia
//   -> retrieve from the contract's storage or logs
//   -> decrypt with JS library

// JS Library = https://github.com/oasisprotocol/deoxysii-js

// ------
// use the on-chain precompile contract. Use the `decrypt` function and write that in Solidity

// TODO: implement on-chain decryption function from the Precompile on a Oasis version of the client

// Encrypt calldata from Arbitrum / EVM chain with that library:
// Decrypt on the Oasis Sapphire chain using the Sapphire precompile contract,
// the decrypt function and write that in Solidity
// Same the way back, but decrypt with the JS library

// github.com/oasisprotocol/deoxysii-js

// With Hardhat, fine to just use the Sapphire wrapper.

// Otherwise for my front-end, use that: https://api.docs.oasis.io/js/sapphire-viem-v2/#md:encryption

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
