import hre, { viem } from "hardhat";

import {
  SEPOLIA_CHAIN_ID,
  SAPPHIRE_CHAIN_ID,
  privaMailSepolia,
  privaMailSapphire,
} from "./utils";

async function main() {
  const [walletClient] = await viem.getWalletClients();

  const {
    network: { name: selectedNetwork },
  } = hre;

  let clientContractAddress, routerAddress, chainIdToSet;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailSepolia;
    routerAddress = privaMailSapphire;
    chainIdToSet = SAPPHIRE_CHAIN_ID;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailSapphire;
    routerAddress = privaMailSepolia;
    chainIdToSet = SEPOLIA_CHAIN_ID;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const contract = await viem.getContractAt(
    "PrivaMailClient",
    clientContractAddress,
    { client: { wallet: walletClient } }
  );

  //   let response = await contract.read.router();

  const txResult = await contract.write.enrollRemoteRouter([
    chainIdToSet,
    `0x000000000000000000000000${routerAddress.replace("0x", "")}`,
  ]);

  console.log(
    `🔄 enrolling remote router on chainId ${selectedNetwork}. Tx: ${txResult}`
  );
  console.log(
    `🔌 Connected to user at address ${routerAddress} on ${selectedNetwork}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
