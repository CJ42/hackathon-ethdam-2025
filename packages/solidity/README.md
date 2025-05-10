# PrivaMail contracts

| Network                            | Contract          | Address                                                                                                                                       |
| :--------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Sepolia                   | `PrivaMailClient` | [`0x9f0c2fe0b68ed82c85219726aa2681c87ee041a9`](https://sepolia.etherscan.io/address/0x9f0c2fe0b68ed82c85219726aa2681c87ee041a9#code)          |
| Sapphire Testnet                   | `PrivaMailClient` | [`0xe25a1713210D0421788d18c7559BeA4B094eaa2c`](https://explorer.oasis.io/testnet/sapphire/address/0xe25a1713210D0421788d18c7559BeA4B094eaa2c) |
| Sepolia / Sapphire Testnet Relayer |                   | `0xc064f535c1E0c2642326446070a10d0452cCf5fF`                                                                                                  |
| Trusted ISM (Sepolia)              |                   | `0xb30e12ab8922bdd0566ab48cd5f28f56703c7a6f`                                                                                                  |
| Trusted ISM (Sapphire Testnet)     |                   | `0x0Cf9a1DC03DB23e24f7C20006a9c3e02E15E97a2`                                                                                                  |

Below are other transaction hash for some configuration setup example

```bash
# tx hash to enroll Priva Mail client on Sepolia with Sapphire Testnet (view on Sepolia explorer):
0xe331b3a7f9f4ebfd8590eaac1d9be38c0b435ac667a00d6e13cf06f603c82fe9

# tx hash to enroll Priva Mail client on Sapphire Testnet with Sepolia (view on Oasis explorer):
0xf47463e6e8f02a4d959cee4759dddf0f44cdbc4921cc36b89ee2cdfabec46fce

# tx to enroll remote router on chainId sepolia
0x806f9703e47320b20d349c46e241e7b5e0a36257751557e52515717145c79cbf

# tx to enroll remote router on chainId sapphire-testnet
0x7ae7dd339cee717b9267c67c6b5fb3aeaa0fcad4c4f3f464f0b6b78f75a88cd3
```

<!-- This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
``` -->

# Setup

## Step 1 - Deploy the `PrivaMailClient` contracts

1. Get some test tokens from faucet on Arbitrum Sepolia and Oasis Sapphire test networks.

2. Set the private environnement variables using the latest Hardhat features

```
npx hardhat vars set INFURA_API_KEY
✔ Enter value: ********************************

npx hardhat vars set PRIVATE_KEY_SEPOLIA
✔ Enter value: ********************************

npx hardhat vars set PRIVATE_KEY_SAPPHIRE_TESTNET
✔ Enter value: ********************************
```

1. Run the following deployment scripts to deploy on Sepolia and Oasis testnets

```bash
# Sepolia
npx hardhat run scripts/deployPrivaMailClient.ts --network sepolia

# Oasis
npx hardhat run scripts/deployPrivaMailClient.ts --network sapphire-testnet
```

## Step 2 - Run Hyperlane relayer

See the instructions under the [`relayer/` package](../relayer/README.md).

You will then need to change the `utils.ts` file with the right relayer address:

```ts
// address that pick up messages and dispatch transactions between chains
// @dev To be changed by the right relayer address
export const TRUSTED_RELAYER_ADDRESS = "0x<your-relayer-address>";
```

**Make sure this relayer has some funds on both networks**.

## Step 3 (Optional) - Deploy ISM contract and connect both clients

> **Note:**

In 3 steps:

1. ➡️ Deploy the `TrustedISM` contract

```bash
# Sepolia
npx hardhat run scripts/deployIsm.ts --network sepolia

# Oasis
npx hardhat run scripts/deployIsm.ts --network sapphire-testnet
```

2. 🔐 Register the trusted ISM on both contracts on both chains

```

```

3. 🔌 Enroll the remote routers + ISMs for both clients to get them connected

<!-- TODO: connect both mail clients steps by `enrollRemoteRouters(...)` and `setInterchainSecurityModule(...)` -->

Run the following script for each chain to connect both PrivaMail clients.

```bash
# Enroll the remote routers
npx hardhat run scripts/connectPrivaMailClients.ts --network sepolia
npx hardhat run scripts/connectPrivaMailClients.ts --network sapphire-testnet

# Setup the ISMs
npx hardhat run scripts/setupISM.ts --network sepolia
npx hardhat run scripts/setupISM.ts --network sapphire-testnet
```
