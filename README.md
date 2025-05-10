# PrivaMailer

> An encrypted messaging protocol built on Oasis network with Hyperlane mailboxes.

![Logo PrivaMailer](./PrivaMailer-logo.png)

## Stack used

| Technology | Description |
|:-----------|:------------|
| Oasis Network | Store encrypted message data on-chain |
|   - smart contracts | Handling inside contracts |
|   - ROFL| computes privacy encryption off-chain and store it on the receiving EVM network (that does not support natively Sapphire built-in on-chain encryption) |
| Hyperlane | Bridge tech stack used (integration with Oasis) |
|   - smart contracts | Mailbox and custom contracts to send / receive messages |
|   - UI | Hyperlane warp website template (modified to receive input text field only) |

## Description 

PrivaMailer is a full-on e2e encrypted mailer system over EVM p2p networks. It features the following privacy features 🥷🏻✨

- Leverage built-in smart contract encryption on the Sapphire network.
- ROFL app that computes privacy encryption / decryption (off-chain on target network).
- Leveraging Oasis smart contracts (Oasis Solidity library) to communicate with Oasis smart contracts' storages.
- Fast messaging (< 1min) thanks to Hyperlane bridge stack + `Mailbox` integration.

## Demo video

> Goes here 👉🏻🎥: `...`



<!-- TODO: Mermaid chart -->