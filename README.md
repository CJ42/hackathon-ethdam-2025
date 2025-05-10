# PrivaMail

> An encrypted messaging protocol built on Oasis network with Hyperlane mailboxes.

![Logo PrivaMail](./PrivaMail-logo.png)

## Stack used

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

## Description

PrivaMail is a full-on e2e encrypted mailer system over EVM p2p networks. It features the following privacy features 🥷🏻✨

- Leverage built-in smart contract encryption on the Sapphire network.
- ROFL app that computes privacy encryption / decryption (off-chain on target network).
- Leveraging Oasis smart contracts (Oasis Solidity library) to communicate with Oasis smart contracts' storages.
- Fast messaging (< 1min) thanks to Hyperlane bridge stack + `Mailbox` integration.

## Demo video

> Goes here 👉🏻🎥: `...`

<!-- TODO: Mermaid chart -->

# Resources used

- [Oasis cheatsheet](https://docs.oasis.io/assets/files/cheatsheet-b24fd55ee44f5de5d829573e8c3c66aa.pdf)
- [Oasis docs - Oasis Hyperlane ping pong example](https://docs.oasis.io/build/opl/hyperlane/pingpong-example/)
- [Oasis docs - using Hyperlane CLI](https://docs.oasis.io/build/opl/hyperlane/cli/)
- [ROFL 101 - EthDam workshop](https://www.youtube.com/watch?v=GaJVxvSUIes)
- [Oasis Testnet faucet](https://faucet.testnet.oasis.io/)
