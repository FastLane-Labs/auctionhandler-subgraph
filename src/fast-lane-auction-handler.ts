import {
  OwnershipTransferred as OwnershipTransferredEvent,
  RelayFlashBid as RelayFlashBidEvent,
  RelayInitialized as RelayInitializedEvent,
  RelayMinAmountSet as RelayMinAmountSetEvent,
  RelayPausedStateSet as RelayPausedStateSetEvent,
  RelayProcessingPaidValidator as RelayProcessingPaidValidatorEvent,
  RelayProcessingWithdrewStakeShare as RelayProcessingWithdrewStakeShareEvent,
  RelayShareProposed as RelayShareProposedEvent,
  RelayShareSet as RelayShareSetEvent,
  RelaySimulatedFlashBid as RelaySimulatedFlashBidEvent,
  RelaySimulatorStateSet as RelaySimulatorStateSetEvent,
  RelayValidatorDisabled as RelayValidatorDisabledEvent,
  RelayValidatorEnabled as RelayValidatorEnabledEvent,
  RelayValidatorPayeeUpdated as RelayValidatorPayeeUpdatedEvent,
  RelayWithdrawDust as RelayWithdrawDustEvent,
  RelayWithdrawStuckERC20 as RelayWithdrawStuckERC20Event,
  RelayWithdrawStuckNativeToken as RelayWithdrawStuckNativeTokenEvent
} from "../generated/FastLaneAuctionHandler/FastLaneAuctionHandler"
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
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayFlashBid(event: RelayFlashBidEvent): void {
  let entity = new RelayFlashBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.oppTxHash = event.params.oppTxHash
  entity.validator = event.params.validator
  entity.searcherContractAddress = event.params.searcherContractAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayInitialized(event: RelayInitializedEvent): void {
  let entity = new RelayInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.initialStakeShare = event.params.initialStakeShare
  entity.minAmount = event.params.minAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayMinAmountSet(event: RelayMinAmountSetEvent): void {
  let entity = new RelayMinAmountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.minAmount = event.params.minAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayPausedStateSet(
  event: RelayPausedStateSetEvent
): void {
  let entity = new RelayPausedStateSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayProcessingPaidValidator(
  event: RelayProcessingPaidValidatorEvent
): void {
  let entity = new RelayProcessingPaidValidator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validator = event.params.validator
  entity.validatorPayment = event.params.validatorPayment
  entity.initiator = event.params.initiator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayProcessingWithdrewStakeShare(
  event: RelayProcessingWithdrewStakeShareEvent
): void {
  let entity = new RelayProcessingWithdrewStakeShare(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amountWithdrawn = event.params.amountWithdrawn

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayShareProposed(event: RelayShareProposedEvent): void {
  let entity = new RelayShareProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount
  entity.deadline = event.params.deadline

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayShareSet(event: RelayShareSetEvent): void {
  let entity = new RelayShareSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelaySimulatedFlashBid(
  event: RelaySimulatedFlashBidEvent
): void {
  let entity = new RelaySimulatedFlashBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.oppTxHash = event.params.oppTxHash
  entity.validator = event.params.validator
  entity.searcherContractAddress = event.params.searcherContractAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelaySimulatorStateSet(
  event: RelaySimulatorStateSetEvent
): void {
  let entity = new RelaySimulatorStateSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.state = event.params.state

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayValidatorDisabled(
  event: RelayValidatorDisabledEvent
): void {
  let entity = new RelayValidatorDisabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validator = event.params.validator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayValidatorEnabled(
  event: RelayValidatorEnabledEvent
): void {
  let entity = new RelayValidatorEnabled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validator = event.params.validator
  entity.payee = event.params.payee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayValidatorPayeeUpdated(
  event: RelayValidatorPayeeUpdatedEvent
): void {
  let entity = new RelayValidatorPayeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validator = event.params.validator
  entity.payee = event.params.payee
  entity.initiator = event.params.initiator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayWithdrawDust(event: RelayWithdrawDustEvent): void {
  let entity = new RelayWithdrawDust(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayWithdrawStuckERC20(
  event: RelayWithdrawStuckERC20Event
): void {
  let entity = new RelayWithdrawStuckERC20(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayWithdrawStuckNativeToken(
  event: RelayWithdrawStuckNativeTokenEvent
): void {
  let entity = new RelayWithdrawStuckNativeToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
