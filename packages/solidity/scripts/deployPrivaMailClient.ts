import hre, { viem } from "hardhat";

// Deployed Hyperlane Mailboxes addresses
import { getMailBoxForNetwork } from "./utils";

async function main() {
  const {
    network: { name: selectedNetwork },
  } = hre;

  const mailbox = getMailBoxForNetwork(selectedNetwork);

  const privaMailClient = await viem.deployContract("PrivaMailClient", [
    mailbox,
  ]);
  console.log(
    `⛓️✅ Your PrivaMail personal box was deployed on ${selectedNetwork} at: ${privaMailClient.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
