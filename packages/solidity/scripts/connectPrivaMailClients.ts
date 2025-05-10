import hre, { viem } from "hardhat";

const SEPOLIA_CHAIN_ID = 11155111;
const SAPPHIRE_CHAIN_ID = 23295;

async function main() {
  const [walletClient] = await viem.getWalletClients();

  // Replace with actually deployed addresses
  let privaMailSepolia = "0x9f0c2fe0b68ed82c85219726aa2681c87ee041a9";
  let privaMailSapphire = "0xe25a1713210D0421788d18c7559BeA4B094eaa2c";

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
    `tx to enroll remote router on chainId ${selectedNetwork}: ${txResult}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
