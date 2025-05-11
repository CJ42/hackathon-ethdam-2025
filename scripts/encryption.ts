import { AEAD, KeySize, NonceSize } from "@oasisprotocol/deoxysii";

// For simplicity, we assume that both sender and recipient have this key locally
// And the key has been exchanged previously in a secure manner
// Define a key (ensure the size matches requirements)
// Replace the literal values if you have re-generated new key infos
const SHARED_KEY = new Uint8Array([
  52, 3, 151, 153, 213, 205, 5, 122, 96, 63, 245, 222, 119, 218, 199, 216, 35,
  28, 130, 185, 69, 211, 27, 205, 198, 194, 116, 106, 107, 20, 31, 153,
]);
// const NONCE = new Uint8Array([
//   30, 169, 24, 189, 242, 110, 128, 144, 159, 59, 144, 192, 121, 226, 226,
// ]);

// taken from tutorial
const associatedData = new Uint8Array([0x1, 0x2, 0x3]);

// Encryption
export const encryptMessage = (message: string) => {
  const NONCE = crypto.getRandomValues(new Uint8Array(NonceSize)); // Generate fresh nonce
  const aead = new AEAD(SHARED_KEY);

  const plaintext = new TextEncoder().encode(message);

  const encryptedData = aead.encrypt(NONCE, plaintext, associatedData);
  console.log(
    "Encrypted data length:",
    encryptedData.length,
    "Content:",
    encryptedData
  );

  return { encryptedData, NONCE };
};

// Decryption
export const decryptMessage = (data: Uint8Array, nonce: Uint8Array) => {
  console.log("data to decrypt: ", data);
  try {
    const aead = new AEAD(SHARED_KEY);
    const decrypted = aead.decrypt(nonce, data, associatedData);
    console.log("decrypted aead: ", decrypted);
    const toMessage = new TextDecoder().decode(decrypted);
    return toMessage;
  } catch (error) {
    console.error("Decryption failed:", error);
  }
};

// async function main() {
//   const text = "some example test";
//   const { encryptedData: encrypted, NONCE } = encryptMessage(text);

//   console.log("message: ", text);
//   console.log("encrypted: ", encrypted);

//   const decrypted = decryptMessage(encrypted, NONCE);
//   // console.log("decrypted: ", decrypted);
// }

async function test() {
  const aead = new AEAD(SHARED_KEY);
  const nonce = crypto.getRandomValues(new Uint8Array(NonceSize));
  const plaintext = new TextEncoder().encode("some example test");

  // Encrypt
  const ciphertext = aead.encrypt(nonce, plaintext, associatedData);
  console.log("Ciphertext:", ciphertext);

  // Decrypt
  try {
    const decrypted = aead.decrypt(nonce, ciphertext, associatedData);
    console.log("Decrypted:", new TextDecoder().decode(decrypted));
  } catch (error) {
    console.error("Decryption failed:", error);
  }
}

test().catch(console.error);

async function generateKeysInfos() {
  const sharedKey = crypto.getRandomValues(new Uint8Array(KeySize));
  const nonce = crypto.getRandomValues(new Uint8Array(NonceSize));
  // taken from tutorial
  const associatedData = new Uint8Array([0x1, 0x2, 0x3]);

  console.log("SHARED_KEY: ", sharedKey);
  console.log("NONCE: ", nonce);
  console.log("associated data: ", associatedData);
}

// Run main script for encrypting / decrypting
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// Generate new key infos
// generateKeysInfos().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
