import hre, { viem } from "hardhat";

import {
  TRUSTED_ISM_ADDRESS_SEPOLIA,
  TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET,
} from "./utils";

async function main() {
  const [walletClient] = await viem.getWalletClients();

  // Replace with actually deployed addresses
  let privaMailClientSepolia = "0x9f0c2fe0b68ed82c85219726aa2681c87ee041a9";
  let privaMailClientSapphire = "0xe25a1713210D0421788d18c7559BeA4B094eaa2c";

  const {
    network: { name: selectedNetwork },
  } = hre;

  let clientContractAddress, ismAddress;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailClientSepolia;
    ismAddress = TRUSTED_ISM_ADDRESS_SEPOLIA;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailClientSapphire;
    ismAddress = TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const contract = await viem.getContractAt(
    "PrivaMailClient",
    clientContractAddress,
    { client: { wallet: walletClient } }
  );

  const txResult = await contract.write.setInterchainSecurityModule([
    ismAddress,
  ]);

  console.log(
    `tx to enroll remote router on chainId ${selectedNetwork}: ${txResult}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
