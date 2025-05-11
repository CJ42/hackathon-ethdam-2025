// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// modules
import {Router as HyperlaneRouter} from "@hyperlane-xyz/core/contracts/client/Router.sol";

// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⡏⠙⢿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⡿⠋⠙⣿⣿⣿⣿
// ⣿⣿⣿⣿⠀⠀⠀⠙⢿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠹⣿⣿⡿⠋⠀⠀⠀⣿⣿⣿⣿
// ⣿⣿⣿⣿⠀⠀⠀⠀⠈⢻⣧⠀⠀⠀⠀⠀⠀⠀⢀⣿⠋⠀⠀⠀⠀⠀⣿⣿⣿⣿
// ⣿⡇⠙⢿⣦⡀⠀⠀⠀⠀⣹⣷⣤⠴⠶⠶⢤⣤⣿⡁⠀⠀⠀⠀⢀⣠⡿⠛⢹⣿
// ⣿⡇⠀⠀⠈⠻⣦⡀⣠⡾⠋⠁⠀⣀⣤⣄⠀⠀⠙⠻⣦⡀⢀⣴⠿⠋⠀⠀⢸⣿
// ⣿⡇⠀⠀⠀⠀⠈⠻⣯⡀⠀⣠⡾⠋⠁⠙⢿⣦⡀⠀⢈⣿⠟⠁⠀⠀⠀⠀⢸⣿
// ⣿⡇⠀⠀⠀⠀⠀⠀⠙⢿⣾⠋⠀⠀⠀⠀⠀⠙⢷⣴⠟⠁⠀⠀⠀⠀⠀⠀⣼⣿
// ⣿⣷⠀⠀⠀⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠈⢿⡄⠀⠀⠀⠀⠀⠀⢰⣿⣿
// ⣿⣿⣇⠀⠀⠀⠀⠀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣷⠀⠀⠀⠀⠀⢠⣿⣿⣿
// ⣿⣿⣿⣆⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⢠⣾⣿⣿⣿
// ⣿⣿⣿⣿⣷⣄⠀⠀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠀⠀⢀⣴⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣷⣤⣘⣧⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣃⣴⣾⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣤⣤⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿ ▄▖  ▘    ▖  ▖  ▘▜  ⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿ ▙▌▛▘▌▌▌▀▌▛▖▞▌▀▌▌▐  ⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿ ▌ ▌ ▌▚▘█▌▌▝ ▌█▌▌▐▖ ⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣤⣤⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

/// @dev Client contract-end of the PrivaMail protocol.
/// Any interface or application that wants to send or receive messages can deploy + use this client as is or extend it.
contract PrivaMailClient is HyperlaneRouter {
    // ============ Events ============
    event SentMail(
        uint32 indexed origin,
        uint32 indexed destination,
        bytes message // publish the encrypted bytes calldata message
    );
    event ReceivedMail(
        uint32 indexed origin,
        uint32 indexed destination,
        bytes32 sender,
        bytes message
    );

    // ============ State variables ============
    // How many messages have been sent from this client.
    uint256 public sent;
    // How many messages have been received by this client.
    uint256 public received;

    // Keyed by domain, a counter of how many messages that have been sent
    // from this contract to the domain.
    mapping(uint32 => uint256) public sentTo;
    // Keyed by domain, a counter of how many messages that have been received
    // by this contract from the domain.
    mapping(uint32 => uint256) public receivedFrom;

    bool automaticDeliveryReceipt = false;

    /// TODO: implement message per address per timestamp nested mapping
    bytes private _message;

    /// @dev the deployer will be the address managing the route
    constructor(address mailbox_) HyperlaneRouter(mailbox_) {}

    /// @dev initialize the Mail client with the Hyperlane Mailbox
    /// to route messages to and receive new messages.
    /// We do not use any hook or security module for simplicity for now.
    ///
    /// @param user_ The contract owner under the hood.bytes
    function initialize(address user_) external initializer {
        _MailboxClient_initialize({
            _owner: user_,
            _hook: address(0),
            _interchainSecurityModule: address(0)
        });
    }

    function getLatestMessage()
        external
        view
        onlyOwner
        returns (string memory)
    {
        return string(_message);
    }

    /**
     * @notice Fetches the amount of gas that will be used when a message is
     * dispatched to the given chain Id.
     */
    function quoteDispatch(
        uint32 _destinationChainId,
        bytes calldata message
    ) external view returns (uint256) {
        return _quoteDispatch(_destinationChainId, message);
    }

    /// @notice Sends a message to the _destinationDomain. Any msg.value is used as interchain gas payment.
    /// @dev function to send messages cross-chain (can only be triggered by the contract owner)
    /// @param destinationDomain The destination domain to send the message to.
    /// @param message The message to send.
    function sendMessage(
        uint32 destinationDomain,
        bytes calldata message
    ) external payable onlyOwner {
        // checks performed in modifier...

        _sendMessage(destinationDomain, message);
    }

    function _sendMessage(
        uint32 destinationDomain,
        bytes memory message
    ) internal {
        // effects..
        sent++;
        sentTo[destinationDomain]++;

        // emit event first before the `Dispatched` event is emitted by the Hyperlane Mailbox
        // and added into the blockchain logs and receipts.
        emit SentMail({
            origin: mailbox.localDomain(),
            destination: destinationDomain,
            message: message
        });

        // interactions...
        _dispatch(destinationDomain, bytes(_message));
    }

    /// @notice Handles receiving of messages
    /// @dev handler function to receive messages from a remote router via the Hyperlane general Mailbox.
    /// @param origin The domain of the origin of the message.
    /// @param sender The sender of the message.
    /// @param message The message body.
    function _handle(
        uint32 origin,
        bytes32 sender,
        bytes calldata message
    ) internal override {
        // checks performed in upper modifier by the `HyperlaneRouter.handle(...)

        // effects...
        received++;
        receivedFrom[origin]++;
        emit ReceivedMail(origin, mailbox.localDomain(), sender, message);

        // no interactions or external calls...

        // send a "pong" message back to the sender to acknowledge receipt of the message
        if (automaticDeliveryReceipt) {
            _sendMessage({
                destinationDomain: origin,
                message: unicode"Message successfully delivered! 📬"
            });
        }
    }
}
