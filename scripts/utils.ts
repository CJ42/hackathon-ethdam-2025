import { stringToHex, hexToString, type Hex } from "viem";

// Replace with actually deployed addresses
export const privaMailSepolia = "0x2646bb9e13640d1ed99da52a581ca16cdd064467";
export const privaMailSapphire = "0x3bf4C8B0785392Ab88b1125e4A218Fd77B99a1eB";

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

export const encodeMessage = (message: string) => {
  // TODO: implement Oasis JS library
  const data = stringToHex(message);
  return data;
};

export const decodeMessage = (data: Hex) => {
  const message = hexToString(data);
  return message;
};
