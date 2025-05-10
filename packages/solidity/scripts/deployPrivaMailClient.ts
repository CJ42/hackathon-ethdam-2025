import hre, { viem } from "hardhat";

// Deployed Hyperlane Mailboxes addresses
import {
  getMailBoxForNetwork,
  TRUSTED_ISM_ADDRESS_SEPOLIA,
  TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET,
} from "./utils";

async function main() {
  const [walletClient] = await viem.getWalletClients();
  const [walletAddress] = await walletClient.getAddresses();

  const {
    network: { name: selectedNetwork },
  } = hre;

  console.log("⊕📮 Creating new PrivaMail account...");
  const mailbox = getMailBoxForNetwork(selectedNetwork);

  const privaMailClient = await viem.deployContract("PrivaMailClient", [
    mailbox,
  ]);

  console.log(`🔄⚙️ Initializing with wallet address ${walletAddress}`);
  await privaMailClient.write.initialize([walletAddress]);

  console.log(`🔄⚙️ Setting up trusted ISM...`);
  configureIsm(selectedNetwork, privaMailClient);

  console.log(
    `⛓️✅ Your PrivaMail personal box was deployed on ${selectedNetwork} at: ${privaMailClient.address}`
  );
}

async function configureIsm(network: string, privaMailContract: any) {
  let ismAddress;

  if (network == "sepolia") {
    ismAddress = TRUSTED_ISM_ADDRESS_SEPOLIA;
  } else if (network == "sapphire-testnet") {
    ismAddress = TRUSTED_ISM_ADDRESS_SAPPHIRE_TESTNET;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const txResult = await privaMailContract.write.setInterchainSecurityModule([
    ismAddress,
  ]);

  console.log(`tx to enroll remote router on chainId ${network}: ${txResult}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
