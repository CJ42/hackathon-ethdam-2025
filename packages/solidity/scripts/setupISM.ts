import hre, { viem } from "hardhat";

import {
  privaMailSepolia,
  privaMailSapphire,
  TRUSTED_ISM_ADDRESS_SEPOLIA,
  TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET,
} from "./utils";

async function main() {
  const [walletClient] = await viem.getWalletClients();

  const {
    network: { name: selectedNetwork },
  } = hre;

  let clientContractAddress, ismAddress;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailSepolia;
    ismAddress = TRUSTED_ISM_ADDRESS_SEPOLIA;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailSapphire;
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
