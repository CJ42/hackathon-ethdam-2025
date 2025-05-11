import { stringToHex, hexToString, type Hex } from "viem";

import { AEAD, KeySize, NonceSize } from "@oasisprotocol/deoxysii";

// Replace with actually deployed addresses
export const privaMailSepolia = "0x151e50eba474db209b489ccf4696ad2964695ae2";
export const privaMailSapphire = "0x951F2152aDe514b7C6cC313105cC7DCABAa4EAb8";

// Deployed Hyperlane Mailboxes addresses
export const MAILBOX_SAPPHIRE_TESTNET =
  "0x79d3ECb26619B968A68CE9337DfE016aeA471435";
export const MAILBOX_ETHEREUM_SEPOLIA =
  "0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766";

export function getMailBoxForNetwork(network: string) {
  if (network == "sepolia") {
    return MAILBOX_ETHEREUM_SEPOLIA;
  } else if (network == "sapphire-testnet") {
    return MAILBOX_SAPPHIRE_TESTNET;
  } else {
    throw new Error(
      "❌ Invalid network (Not supported, only 'sepolia' or 'sapphire-testnet'"
    );
  }
}

// address that pick up messages and dispatch transactions between chains
// @dev To be changed by the right relayer address
export const TRUSTED_RELAYER_ADDRESS =
  "0xc064f535c1E0c2642326446070a10d0452cCf5fF";

export const TRUSTED_ISM_ADDRESS_SEPOLIA =
  "0xb6d1b1bc9aa558484dac793bfbf511b23352f664";
export const TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET =
  "0xBb7482a8821d9940Ea17CC657Fe64FdDE29E2d87";

export const SEPOLIA_CHAIN_ID = 11155111;
export const SAPPHIRE_CHAIN_ID = 23295;

export const ReceivedMailAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "origin",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "sender",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "ReceivedMail",
    type: "event",
  },
];

// {
// 		"Name": "Test vector 2",
// 		"Key": "101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f",
// 		"Nonce": "202122232425262728292a2b2c2d2e",
// 		"AssociatedData": "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
// 		"Message": null,
// 		"Sealed": "54708ae5565a71f147bdb94d7ba3aed7"
// 	},

// const key = new Uint8Array(Buffer.from(vectors.Key, "base64"));
// const nonce = new Uint8Array(Buffer.from(vectors.Nonce, "base64"));
// const aad = new Uint8Array(Buffer.from(vectors.AADData, "base64"));
// const msg = new Uint8Array(Buffer.from(vectors.MsgData, "base64"));

// For simplicity, we assume that both sender and recipient have this key locally
// And the key has been exchanged previously in a secure manner
// Define a key (ensure the size matches requirements)
const SHARED_KEY = crypto.getRandomValues(new Uint8Array(KeySize));

// harcoded for simplicity (12345)
// const NONCE = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
const NONCE = crypto.getRandomValues(new Uint8Array(NonceSize));
// taken from tutorial
const associatedData = new Uint8Array([0x1, 0x2, 0x3]);

const aead = new AEAD(SHARED_KEY);

// Encryption
export const encodeMessage = (message: string) => {
  // const plaintext = new TextEncoder().encode(message);

  // const encryptedData = aead.encrypt(NONCE, plaintext, associatedData);
  // return encryptedData;

  // TODO: implement Oasis JS lib
  const data = stringToHex(message);
  return data;
};

// Decryption
export const decodeMessage = (data: Uint8Array | Hex) => {
  try {
    // const decrypted = aead.decrypt(NONCE, data, associatedData);
    // const toMessage = new TextDecoder().decode(decrypted);
    // return toMessage;

    // TODO: implement Oasis JS lib
    const message = hexToString(data as Hex);
    return message;
  } catch (error) {
    console.error("Decryption failed:", error);
  }
};
