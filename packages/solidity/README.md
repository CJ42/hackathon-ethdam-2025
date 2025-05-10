# PrivaMail contracts

| Network                            | Contract          | Address                                                                                                                                       |
| :--------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Sepolia                   | `PrivaMailClient` | [`0x2646bb9e13640d1ed99da52a581ca16cdd064467`](https://sepolia.etherscan.io/address/0x2646bb9e13640d1ed99da52a581ca16cdd064467#code)          |
| Sapphire Testnet                   | `PrivaMailClient` | [`0x3bf4C8B0785392Ab88b1125e4A218Fd77B99a1eB`](https://explorer.oasis.io/testnet/sapphire/address/0x3bf4C8B0785392Ab88b1125e4A218Fd77B99a1eB) |
| Sepolia / Sapphire Testnet Relayer |                   | `0xc064f535c1E0c2642326446070a10d0452cCf5fF`                                                                                                  |
| Trusted ISM (Sepolia)              |                   | `0xb6d1b1bc9aa558484dac793bfbf511b23352f664`                                                                                                  |
| Trusted ISM (Sapphire Testnet)     |                   | `0xBb7482a8821d9940Ea17CC657Fe64FdDE29E2d87`                                                                                                  |

<!-- Below are other transaction hash for some configuration setup example

```bash
# tx hash to enroll Priva Mail client on Sepolia with Sapphire Testnet (view on Sepolia explorer):
0xe331b3a7f9f4ebfd8590eaac1d9be38c0b435ac667a00d6e13cf06f603c82fe9

# tx hash to enroll Priva Mail client on Sapphire Testnet with Sepolia (view on Oasis explorer):
0xf47463e6e8f02a4d959cee4759dddf0f44cdbc4921cc36b89ee2cdfabec46fce

# tx to enroll remote router on chainId sepolia
0x806f9703e47320b20d349c46e241e7b5e0a36257751557e52515717145c79cbf

# tx to enroll remote router on chainId sapphire-testnet
0x7ae7dd339cee717b9267c67c6b5fb3aeaa0fcad4c4f3f464f0b6b78f75a88cd3

tx to enroll remote router on chainId sepolia: 0x079d6f831e7d35f5294e8afba556498b3c82957abf33aedcfba045e7335089c9
➜  solidity git:(main) ✗ npx hardhat run scripts/setupISM.ts --network sapphire-testnet
tx to enroll remote router on chainId sapphire-testnet: 0x03a2c8b98ae56a2907364fe7a268a9c2fab19c33340234c1948e50632d07f00e
``` -->

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

## Configurations

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

## Background process - Run a Hyperlane relayer

See the instructions under the [`relayer/` package](../relayer/README.md).

You will then need to change the `utils.ts` file with the right relayer address:

```ts
// address that pick up messages and dispatch transactions between chains
// @dev To be changed by the right relayer address
export const TRUSTED_RELAYER_ADDRESS = "0x<your-relayer-address>";
```

**Make sure this relayer has some funds on both networks**.

## Create a `PrivaMailClient` that can send + receive messages

Run the following scripts in order to get started with your first **PrivaMail** accounts!

<!-- TODO: build the script to receive recipient as parameter -->

```bash
# <network> = "sepolia" | "sapphire-testnet"

# 1. Deploy PrivaMail client
npm run privamail:create -- --network <network>

# 2. Connect to other client
npm run privamail:connect -- --network <network>
```

Under the hood, this will:

1. 📄 deploy the smart contracts on boths chains
2. 🔌 enroll the remote routers + ISMs for both clients to get them connected

## Sending / Receiving messages

```bash
# <network> = "sepolia" | "sapphire-testnet"

# 📤 Send Messages
npm run privamail:send -- --network <network>

# 📩 Receive Messages
npm run privamail:receive -- --network <network>
```

## Debugging commands

### ➡️ Deploy the `TrustedISM` contract

```bash
# Sepolia
npx hardhat run scripts/deployIsm.ts --network sepolia

# Oasis
npx hardhat run scripts/deployIsm.ts --network sapphire-testnet
```

### 🔐 Register the trusted ISM on both contracts on both chains

```bash
# Setup the ISMs
npx hardhat run scripts/setupISM.ts --network sepolia
npx hardhat run scripts/setupISM.ts --network sapphire-testnet
```
