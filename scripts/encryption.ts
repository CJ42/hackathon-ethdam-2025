import { AEAD, KeySize, NonceSize } from "@oasisprotocol/deoxysii";

// For simplicity, we assume that both sender and recipient have this key locally
// And the key has been exchanged previously in a secure manner
// Define a key (ensure the size matches requirements)
const SHARED_KEY = crypto.getRandomValues(new Uint8Array(KeySize));
const NONCE = crypto.getRandomValues(new Uint8Array(NonceSize));
// taken from tutorial
const associatedData = new Uint8Array([0x1, 0x2, 0x3]);

console.log("SHARED_KEY: ", SHARED_KEY);

// Encryption
export const encryptMessage = (message: string) => {
  const aead = new AEAD(SHARED_KEY);

  const plaintext = new TextEncoder().encode(message);

  const encryptedData = aead.encrypt(NONCE, plaintext, associatedData);

  return encryptedData;
};

// Decryption
export const decryptMessage = (data: Uint8Array) => {
  try {
    const aead = new AEAD(SHARED_KEY);
    const decrypted = aead.decrypt(NONCE, data, associatedData);
    console.log("decrypted aead: ", decrypted);
    const toMessage = new TextDecoder().decode(decrypted);
    return toMessage;
  } catch (error) {
    console.error("Decryption failed:", error);
  }
};

async function main() {
  const text = "some example test";
  const encrypted = encryptMessage(text);

  console.log("message: ", text);
  console.log("encrypted: ", encrypted);

  const decrypted = decryptMessage(encrypted);
  // console.log("decrypted: ", decrypted);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
