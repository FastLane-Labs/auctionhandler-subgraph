import { BigInt, log } from "@graphprotocol/graph-ts"
import { logStore } from 'matchstick-as/assembly/store'

import {
  RelayFlashBid as RelayFlashBidEvent,
  RelayValidatorDisabled as RelayValidatorDisabledEvent,
  RelayValidatorEnabled as RelayValidatorEnabledEvent,
} from "../generated/FastLaneAuctionHandler/FastLaneAuctionHandler"
import {
  RelayFlashBid, 
  Validator
} from "../generated/schema"

import {
  ZERO,
  ONE,
  NEG_ONE,
  ADDRESS_ZERO,
  ZERO_INT
} from './helpers/common';
import { loadOrCreateGlobalStats } from "./helpers/loadOrCreateGlobalStats";
import { loadOrCreateValidator } from "./helpers/loadOrCreateValidator";

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

  entity.save();

  const searcher = loadOrCreateSearcher()

  const validator = loadOrCreateValidator(event.params.validator);
  validator.totalTips = validator.totalTips.plus(event.params.amount);
  validator.lastBundleReceivedTimestamp = event.block.timestamp.toI32();
  validator.save();

  const stats = loadOrCreateGlobalStats();
  stats.totalExecutedBundlesCount = stats.totalExecutedBundlesCount.plus(ONE);
  stats.totalValidatorsPaid = stats.totalValidatorsPaid.plus(event.params.amount);
  stats.save();

}


export function handleRelayValidatorDisabled(
  event: RelayValidatorDisabledEvent
): void {
  const validator = loadOrCreateValidator(event.params.validator);
  logStore();
  // Drop reactivating already active
  if (validator.status == "INACTIVE") return;


  validator.status = "INACTIVE";
  validator.disabledAt = event.block.timestamp.toI32();
  
  const stats = loadOrCreateGlobalStats();
  stats.totalValidatorsCount = stats.totalValidatorsCount.minus(BigInt.fromI32(1));
  stats.save();




  validator.save();
}

export function handleRelayValidatorEnabled(
  event: RelayValidatorEnabledEvent
): void {

  const validator = loadOrCreateValidator(event.params.validator);

  // Drop reactivating already active
  if (validator.status == "ACTIVE") return;


  validator.status = "ACTIVE";
  validator.enabledAt = event.block.timestamp.toI32();
  
  const stats = loadOrCreateGlobalStats();
  stats.totalValidatorsCount = stats.totalValidatorsCount.plus(BigInt.fromI32(1));
  stats.save();




  validator.save();
  logStore();
}
