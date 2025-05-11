import { AEAD, KeySize, NonceSize } from "@oasisprotocol/deoxysii";

// For simplicity, we assume that both sender and recipient have this key locally
// And the key has been exchanged previously in a secure manner
// Define a key (ensure the size matches requirements)
// Replace the literal values if you have re-generated new key infos
const SHARED_KEY = new Uint8Array([
  52, 3, 151, 153, 213, 205, 5, 122, 96, 63, 245, 222, 119, 218, 199, 216, 35,
  28, 130, 185, 69, 211, 27, 205, 198, 194, 116, 106, 107, 20, 31, 153,
]);

// taken from tutorial
const associatedData = new Uint8Array([0x1, 0x2, 0x3]);

const aead = new AEAD(SHARED_KEY);

// Encryption
/// @return encryptedData
/// @return NONCE (to be re-used for decryption)
export const encryptMessage = (message: string) => {
  const NONCE = crypto.getRandomValues(new Uint8Array(NonceSize)); // Generate fresh nonce

  const plaintext = new TextEncoder().encode(message);

  const encryptedData = aead.encrypt(NONCE, plaintext, associatedData);

  return { encryptedData, NONCE };
};

// Decryption
export const decryptMessage = (data: Uint8Array, nonce: Uint8Array) => {
  // console.log("Data to decrypt: ", data);
  try {
    const decrypted = aead.decrypt(nonce, data, associatedData);
    const toMessage = new TextDecoder().decode(decrypted);
    // console.log("Decrypted data: ", toMessage);
    return toMessage;
  } catch (error) {
    console.error("Decryption failed:", error);
  }
};

async function main() {
  const text = "some example message";

  // Encrypt
  const { encryptedData: ciphertext, NONCE } = encryptMessage(text);
  // console.log("Encrypted data:", ciphertext);

  // Decrypt
  try {
    const decrypted = decryptMessage(ciphertext, NONCE);
    // console.log("Decrypted data:", decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
  }
}

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
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Generate new key infos
// generateKeysInfos().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
