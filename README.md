# PrivaMail

> An encrypted messaging protocol built on Oasis network with Hyperlane mailboxes.

![Logo PrivaMail](./PrivaMail-logo.png)

> **Demo video 👉🏻🎥**: `...`

PrivaMail is a full-on e2e encrypted messaging protocol over EVM p2p networks.

- Leverages Oasis JS libraries for message encryption / decryption
- Fast messaging thanks to Hyperlane bridge stack + `Mailbox` integration.

<!-- - Leverage built-in smart contract encryption on the Sapphire network.
- ROFL app that computes privacy encryption / decryption (off-chain on target network). -->

Below are some of the smart contracts from the demo videos deployed on Ethereum Sepolia and Oasis Sapphire test networks that can send messages.

| Network                            | Contract          | Address                                                                                                                                       |
| :--------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Sepolia                   | `PrivaMailClient` | [`0x151e50eba474db209b489ccf4696ad2964695ae2`](https://sepolia.etherscan.io/address/0x151e50eba474db209b489ccf4696ad2964695ae2#code)          |
| Sapphire Testnet                   | `PrivaMailClient` | [`0x951F2152aDe514b7C6cC313105cC7DCABAa4EAb8`](https://explorer.oasis.io/testnet/sapphire/address/0x951F2152aDe514b7C6cC313105cC7DCABAa4EAb8) |
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

# Stack used

| Technology                                             | Description                                                                  |
| :----------------------------------------------------- | :--------------------------------------------------------------------------- |
| Oasis Network                                          | Store encrypted message data on-chain                                        |
| -- [CLI v0.13.3](https://github.com/oasisprotocol/cli) | [Release details](https://github.com/oasisprotocol/cli/releases/tag/v0.13.3) |
| -- smart contracts                                     | Handling inside contracts                                                    |
| Hyperlane                                              | Bridge tech stack used (integration with Oasis)                              |
| -- smart contracts                                     | Mailbox and custom contracts to send / receive messages                      |

<!-- |   - Oasis dApp demo starter | [GitHub repository](https://github.com/oasisprotocol/demo-starter) | -->
<!-- | -- ROFL                                                | computes privacy encryption off-chain and store it on the receiving EVM network (that does not support natively Sapphire built-in on-chain encryption) | -->
<!-- | -- UI                                                  | Hyperlane warp website template (modified to receive input text field only)                                                                            | -->

<!-- TODO: Mermaid chart -->

# Setup

First install the dependencies

```bash
npm i
```

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

# 📩 Receive Messages
npm run privamail:receive -- --network <network>

# 📤 Send Messages
npm run privamail:send -- --network <network>
```

## Debugging commands

### ➡️ Deploy the `TrustedISM` contract

```bash
# Deploy the ISM contracts
npx hardhat run scripts/deployIsm.ts --network sepolia
npx hardhat run scripts/deployIsm.ts --network sapphire-testnet
```

### 🔐 Register the trusted ISM on both contracts on both chains

```bash
# Setup the ISMs
npx hardhat run scripts/setupISM.ts --network sepolia
npx hardhat run scripts/setupISM.ts --network sapphire-testnet
```

# Resources used

- [Oasis cheatsheet](https://docs.oasis.io/assets/files/cheatsheet-b24fd55ee44f5de5d829573e8c3c66aa.pdf)
- [Oasis docs - Oasis Hyperlane ping pong example](https://docs.oasis.io/build/opl/hyperlane/pingpong-example/)
- [Oasis docs - using Hyperlane CLI](https://docs.oasis.io/build/opl/hyperlane/cli/)
- [ROFL 101 - EthDam workshop](https://www.youtube.com/watch?v=GaJVxvSUIes)
- [Oasis Testnet faucet](https://faucet.testnet.oasis.io/)
