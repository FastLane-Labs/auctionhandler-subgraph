import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  RelayFlashBid,
  RelayInitialized,
  RelayMinAmountSet,
  RelayPausedStateSet,
  RelayProcessingPaidValidator,
  RelayProcessingWithdrewStakeShare,
  RelayShareProposed,
  RelayShareSet,
  RelaySimulatedFlashBid,
  RelaySimulatorStateSet,
  RelayValidatorDisabled,
  RelayValidatorEnabled,
  RelayValidatorPayeeUpdated,
  RelayWithdrawDust,
  RelayWithdrawStuckERC20,
  RelayWithdrawStuckNativeToken
} from "../generated/FastLaneAuctionHandler/FastLaneAuctionHandler"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRelayFlashBidEvent(
  sender: Address,
  amount: BigInt,
  oppTxHash: Bytes,
  validator: Address,
  searcherContractAddress: Address
): RelayFlashBid {
  let relayFlashBidEvent = changetype<RelayFlashBid>(newMockEvent())

  relayFlashBidEvent.parameters = new Array()

  relayFlashBidEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  relayFlashBidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  relayFlashBidEvent.parameters.push(
    new ethereum.EventParam(
      "oppTxHash",
      ethereum.Value.fromFixedBytes(oppTxHash)
    )
  )
  relayFlashBidEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  relayFlashBidEvent.parameters.push(
    new ethereum.EventParam(
      "searcherContractAddress",
      ethereum.Value.fromAddress(searcherContractAddress)
    )
  )

  return relayFlashBidEvent
}

export function createRelayInitializedEvent(
  initialStakeShare: i32,
  minAmount: BigInt
): RelayInitialized {
  let relayInitializedEvent = changetype<RelayInitialized>(newMockEvent())

  relayInitializedEvent.parameters = new Array()

  relayInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "initialStakeShare",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(initialStakeShare))
    )
  )
  relayInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "minAmount",
      ethereum.Value.fromUnsignedBigInt(minAmount)
    )
  )

  return relayInitializedEvent
}

export function createRelayMinAmountSetEvent(
  minAmount: BigInt
): RelayMinAmountSet {
  let relayMinAmountSetEvent = changetype<RelayMinAmountSet>(newMockEvent())

  relayMinAmountSetEvent.parameters = new Array()

  relayMinAmountSetEvent.parameters.push(
    new ethereum.EventParam(
      "minAmount",
      ethereum.Value.fromUnsignedBigInt(minAmount)
    )
  )

  return relayMinAmountSetEvent
}

export function createRelayPausedStateSetEvent(
  state: boolean
): RelayPausedStateSet {
  let relayPausedStateSetEvent = changetype<RelayPausedStateSet>(newMockEvent())

  relayPausedStateSetEvent.parameters = new Array()

  relayPausedStateSetEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return relayPausedStateSetEvent
}

export function createRelayProcessingPaidValidatorEvent(
  validator: Address,
  validatorPayment: BigInt,
  initiator: Address
): RelayProcessingPaidValidator {
  let relayProcessingPaidValidatorEvent = changetype<
    RelayProcessingPaidValidator
  >(newMockEvent())

  relayProcessingPaidValidatorEvent.parameters = new Array()

  relayProcessingPaidValidatorEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  relayProcessingPaidValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "validatorPayment",
      ethereum.Value.fromUnsignedBigInt(validatorPayment)
    )
  )
  relayProcessingPaidValidatorEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )

  return relayProcessingPaidValidatorEvent
}

export function createRelayProcessingWithdrewStakeShareEvent(
  recipient: Address,
  amountWithdrawn: BigInt
): RelayProcessingWithdrewStakeShare {
  let relayProcessingWithdrewStakeShareEvent = changetype<
    RelayProcessingWithdrewStakeShare
  >(newMockEvent())

  relayProcessingWithdrewStakeShareEvent.parameters = new Array()

  relayProcessingWithdrewStakeShareEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  relayProcessingWithdrewStakeShareEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawn",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawn)
    )
  )

  return relayProcessingWithdrewStakeShareEvent
}

export function createRelayShareProposedEvent(
  amount: i32,
  deadline: BigInt
): RelayShareProposed {
  let relayShareProposedEvent = changetype<RelayShareProposed>(newMockEvent())

  relayShareProposedEvent.parameters = new Array()

  relayShareProposedEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(amount))
    )
  )
  relayShareProposedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return relayShareProposedEvent
}

export function createRelayShareSetEvent(amount: i32): RelayShareSet {
  let relayShareSetEvent = changetype<RelayShareSet>(newMockEvent())

  relayShareSetEvent.parameters = new Array()

  relayShareSetEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(amount))
    )
  )

  return relayShareSetEvent
}

export function createRelaySimulatedFlashBidEvent(
  sender: Address,
  amount: BigInt,
  oppTxHash: Bytes,
  validator: Address,
  searcherContractAddress: Address
): RelaySimulatedFlashBid {
  let relaySimulatedFlashBidEvent = changetype<RelaySimulatedFlashBid>(
    newMockEvent()
  )

  relaySimulatedFlashBidEvent.parameters = new Array()

  relaySimulatedFlashBidEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  relaySimulatedFlashBidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  relaySimulatedFlashBidEvent.parameters.push(
    new ethereum.EventParam(
      "oppTxHash",
      ethereum.Value.fromFixedBytes(oppTxHash)
    )
  )
  relaySimulatedFlashBidEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  relaySimulatedFlashBidEvent.parameters.push(
    new ethereum.EventParam(
      "searcherContractAddress",
      ethereum.Value.fromAddress(searcherContractAddress)
    )
  )

  return relaySimulatedFlashBidEvent
}

export function createRelaySimulatorStateSetEvent(
  state: boolean
): RelaySimulatorStateSet {
  let relaySimulatorStateSetEvent = changetype<RelaySimulatorStateSet>(
    newMockEvent()
  )

  relaySimulatorStateSetEvent.parameters = new Array()

  relaySimulatorStateSetEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return relaySimulatorStateSetEvent
}

export function createRelayValidatorDisabledEvent(
  validator: Address
): RelayValidatorDisabled {
  let relayValidatorDisabledEvent = changetype<RelayValidatorDisabled>(
    newMockEvent()
  )

  relayValidatorDisabledEvent.parameters = new Array()

  relayValidatorDisabledEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )

  return relayValidatorDisabledEvent
}

export function createRelayValidatorEnabledEvent(
  validator: Address,
  payee: Address
): RelayValidatorEnabled {
  let relayValidatorEnabledEvent = changetype<RelayValidatorEnabled>(
    newMockEvent()
  )

  relayValidatorEnabledEvent.parameters = new Array()

  relayValidatorEnabledEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  relayValidatorEnabledEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )

  return relayValidatorEnabledEvent
}

export function createRelayValidatorPayeeUpdatedEvent(
  validator: Address,
  payee: Address,
  initiator: Address
): RelayValidatorPayeeUpdated {
  let relayValidatorPayeeUpdatedEvent = changetype<RelayValidatorPayeeUpdated>(
    newMockEvent()
  )

  relayValidatorPayeeUpdatedEvent.parameters = new Array()

  relayValidatorPayeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  relayValidatorPayeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )
  relayValidatorPayeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )

  return relayValidatorPayeeUpdatedEvent
}

export function createRelayWithdrawDustEvent(
  receiver: Address,
  amount: BigInt
): RelayWithdrawDust {
  let relayWithdrawDustEvent = changetype<RelayWithdrawDust>(newMockEvent())

  relayWithdrawDustEvent.parameters = new Array()

  relayWithdrawDustEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  relayWithdrawDustEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return relayWithdrawDustEvent
}

export function createRelayWithdrawStuckERC20Event(
  receiver: Address,
  token: Address,
  amount: BigInt
): RelayWithdrawStuckERC20 {
  let relayWithdrawStuckErc20Event = changetype<RelayWithdrawStuckERC20>(
    newMockEvent()
  )

  relayWithdrawStuckErc20Event.parameters = new Array()

  relayWithdrawStuckErc20Event.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  relayWithdrawStuckErc20Event.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  relayWithdrawStuckErc20Event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return relayWithdrawStuckErc20Event
}

export function createRelayWithdrawStuckNativeTokenEvent(
  receiver: Address,
  amount: BigInt
): RelayWithdrawStuckNativeToken {
  let relayWithdrawStuckNativeTokenEvent = changetype<
    RelayWithdrawStuckNativeToken
  >(newMockEvent())

  relayWithdrawStuckNativeTokenEvent.parameters = new Array()

  relayWithdrawStuckNativeTokenEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  relayWithdrawStuckNativeTokenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return relayWithdrawStuckNativeTokenEvent
}
