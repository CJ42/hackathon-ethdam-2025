import { HardhatRuntimeEnvironment } from "hardhat/types";

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
      "❌ Invalid network (Not supported, only 'abitrum-sepolia' and 'sapphire-testnet'"
    );
  }
}

// address that pick up messages and dispatch transactions between chains
// @dev To be changed by the right relayer address
export const TRUSTED_RELAYER_ADDRESS =
  "0xc064f535c1E0c2642326446070a10d0452cCf5fF";

export const TRUSTED_ISM_ADDRESS_SEPOLIA =
  "0xb30e12ab8922bdd0566ab48cd5f28f56703c7a6f";
export const TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET =
  "0x0Cf9a1DC03DB23e24f7C20006a9c3e02E15E97a2";
