import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Sapphire wrapper
import "@oasisprotocol/sapphire-hardhat"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "paris",
    }
  },
  networks: {
    'sepolia': {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 11155111,
      accounts: vars.has("PRIVATE_KEY_SEPOLIA") ? [vars.get("PRIVATE_KEY_SEPOLIA")] : [],
    },
    'sapphire-testnet': {
      url: "https://testnet.sapphire.oasis.io",
      accounts: vars.has("PRIVATE_KEY_SAPPHIRE_TESTNET") ? [vars.get("PRIVATE_KEY_SAPPHIRE_TESTNET")] : [],
      chainId: 23295, // 0x5aff
    },
  },
};

export default config;
