import hre, { viem } from "hardhat";

import {
  ReceivedMailAbi,
  privaMailSepolia,
  privaMailSapphire,
  decodeMessage,
} from "./utils";

async function main() {
  const {
    network: { name: selectedNetwork },
  } = hre;

  let clientContractAddress;

  if (selectedNetwork == "sepolia") {
    clientContractAddress = privaMailSepolia;
  } else if (selectedNetwork == "sapphire-testnet") {
    clientContractAddress = privaMailSapphire;
  } else {
    throw new Error("Incorrect network selected!");
  }

  const publicClient = await hre.viem.getPublicClient();

  console.log("listening for messages...");

  // Listen for incoming messages
  publicClient.watchContractEvent({
    abi: ReceivedMailAbi,
    address: clientContractAddress as `0x${string}`, // optional filter
    eventName: "ReceivedMail", //
    onLogs: (logs) => {
      console.log("Received new message!");
      console.log(logs);

      const latestMessage = logs[0];

      console.log(
        `from: ${latestMessage.args.sender}; source: ${latestMessage.args.origin}`
      );
      console.log(`message: ${decodeMessage(latestMessage.args.message)}`);
    },
  });

  //   const spinner = ["-", "\\", "|", "/"];
  //   let spinnerIndex = 0;
  //   const interval = setInterval((current) => {
  //     process.stdout.write(`\rListening for events... ${spinner[spinnerIndex]}`);
  //     current = (spinnerIndex + 1) % spinner.length;
  //   }, 150);

  //   let events;
  //   do {
  //     // const block = await ethers.provider.getBlockNumber();
  //     events = await contract.queryFilter("ReceivedPing", block - 10, "latest");
  //     if (events.length === 0) {
  //       await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
  //     }
  //   } while (events.length === 0);

  //   clearInterval(interval);
  //   process.stdout.write(`\r`);
  //   process.stdout.clearLine(0);

  //   const parsedEvent = contract.interface.parseLog(events[0]);
  //   const message = parsedEvent?.args?.message;
  //   console.log(`Message received with: ${message}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
