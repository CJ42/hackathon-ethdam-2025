import hre, { viem } from "hardhat";

// Deployed Hyperlane Mailboxes addresses
import { TRUSTED_RELAYER_ADDRESS, getMailBoxForNetwork } from "./utils";

async function main() {
  const {
    network: { name: selectedNetwork },
  } = hre;

  const mailbox = getMailBoxForNetwork(selectedNetwork);

  const trustedRelayerISM = await viem.deployContract("TrustedRelayerIsm", [
    mailbox,
    TRUSTED_RELAYER_ADDRESS,
  ]);
  console.log(
    `⛓️✅ Your TrustedRelayerISM deployed on ${selectedNetwork} at ${trustedRelayerISM.address}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
