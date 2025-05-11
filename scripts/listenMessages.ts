import hre, { viem } from "hardhat";

import { type Hex, sliceHex, hexToBytes } from "viem";

import {
  ReceivedMailAbi,
  privaMailSepolia,
  privaMailSapphire,
  logMessages,
  loadingSpinner,
  loadPrivaMailHeader,
} from "./utils";

import { decryptMessage } from "./encryption";
import { NonceSize } from "@oasisprotocol/deoxysii";

// TODO: move back to function `decodeMessage`
const extractMessage = (mailContent: Hex) => {
  const nonceByteLength = NonceSize; // 15 bytes for Oasis library

  // Slice tail as NONCE, rest as encryptedMessage, grabs last N bytes
  const nonceHex = sliceHex(mailContent, -nonceByteLength);

  // inferred as Uint8Array<ArrayBuffer>
  const encryptedMessage = hexToBytes(
    sliceHex(mailContent, 0, -nonceByteLength)
  ); // everything before that

  // Convert NONCE back to Uint8Array if needed
  const NONCE: Uint8Array = hexToBytes(nonceHex); // inferred as Uint8Array<ArrayBuffer>

  return { encryptedMessage, NONCE };
};

async function main() {
  const {
    network: { name: selectedNetwork },
  } = hre;

  let clientContractAddress;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailSepolia;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailSapphire;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const publicClient = await hre.viem.getPublicClient();

  loadPrivaMailHeader();

  console.log("[- 📡 -] PrivaMail - Receiving service MODE = ON");
  console.log("==============================================");
  console.log("listening for messages...");
  loadingSpinner();

  // Listen for incoming messages
  publicClient.watchContractEvent({
    abi: ReceivedMailAbi,
    address: clientContractAddress as `0x${string}`, // optional filter
    eventName: "ReceivedMail", //
    onLogs: (logs) => {
      const latestMessage = logs[0];

      // Assuming NONCE is Uint8Array
      //
      // ```
      // const hexNonce = toHex(NONCE);
      // const mailContent = concatHex([encryptedData, hexNonce]);
      // ```
      //
      // We extract for nonce appended as prefix to be able to decode
      const { sender, origin, message: mailContent } = latestMessage.args;

      const { encryptedMessage, NONCE } = extractMessage(mailContent);

      const decryptedMessage = decryptMessage(encryptedMessage, NONCE);

      console.log(`📥 New message received!`);
      logMessages([
        `from: ${sender}`,
        `source: ${origin}`,
        `NONCE=${NONCE}`,
        `🔐 Encrypted message: ${encryptedMessage}`,
        `🔍 Decrypted message: ${decryptedMessage}`,
      ]);
    },
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
