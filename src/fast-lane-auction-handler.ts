import { BigInt, Bytes, log } from "@graphprotocol/graph-ts"
// import { logStore } from 'matchstick-as/assembly/store'

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
  ZERO_INT,
  STATS_ID
} from './helpers/common';
import { loadOrCreateGlobalStats } from "./helpers/loadOrCreateGlobalStats";
import { loadOrCreateValidator } from "./helpers/loadOrCreateValidator";
import { loadOrCreateSearcher } from "./helpers/loadOrCreateSearcher";
import { loadOrCreateHourlyCollectionSnapshotGlobal, loadOrCreateHourlyValidatorSnapshot } from "./helpers/collectionshapshots/loadOrCreateHourlyCollectionSnapshots";
import { loadOrCreateDailyValidatorSnapshot, loadOrCreateDailyCollectionSnapshotGlobal } from "./helpers/collectionshapshots/loadOrCreateDailyCollectionSnapshots";
import { loadOrCreateWeeklyValidatorSnapshot, loadOrCreateWeeklyCollectionSnapshotGlobal } from "./helpers/collectionshapshots/loadOrCreateWeeklyCollectionSnapshots";



function updateHourly(event: RelayFlashBidEvent,timeRangeName: string, divBy: number): void { 
  // Hourly loops 

  // Floor the range.
  
  let timeRange = event.block.timestamp.div(BigInt.fromI32(divBy as i32)).toI32();
  let entityGlobalId = `${STATS_ID.toHexString()}-${timeRangeName}-${timeRange.toString()}`;
  let entityLocalId = `${event.params.validator.toHexString()}-${timeRangeName}-${timeRange.toString()}`;

  let globalEntityForRange = loadOrCreateHourlyCollectionSnapshotGlobal(entityGlobalId);
  let localEntityForRange = loadOrCreateHourlyValidatorSnapshot(entityLocalId, event.params.validator);
  // Global Specific:
  // Add the validator in range
  if (!globalEntityForRange.validators.includes(event.params.validator)) {
    const vList = globalEntityForRange.validators;
    vList.push(event.params.validator);
    globalEntityForRange.validators = vList;
    globalEntityForRange.save();
  }

  // Both
  globalEntityForRange.rangeTransactions = globalEntityForRange.rangeTransactions + 1;
  globalEntityForRange.rangeVolume = globalEntityForRange.rangeVolume.plus(event.params.amount);
  if (globalEntityForRange.timestamp == 0) globalEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > globalEntityForRange.topBid) globalEntityForRange.topBid = event.params.amount;

  localEntityForRange.rangeTransactions = localEntityForRange.rangeTransactions + 1;
  localEntityForRange.rangeVolume = localEntityForRange.rangeVolume.plus(event.params.amount);
  if (localEntityForRange.timestamp == 0) localEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > localEntityForRange.topBid) localEntityForRange.topBid = event.params.amount;

  globalEntityForRange.save();
  localEntityForRange.save();
}
function updateDaily(event: RelayFlashBidEvent,timeRangeName: string, divBy: number): void { 
  // Daily loops 

  // Floor the range.
  
  let timeRange = event.block.timestamp.div(BigInt.fromI32(divBy as i32)).toI32();
  let entityGlobalId = `${STATS_ID.toHexString()}-${timeRangeName}-${timeRange.toString()}`;
  let entityLocalId = `${event.params.validator.toHexString()}-${timeRangeName}-${timeRange.toString()}`;

  let globalEntityForRange = loadOrCreateDailyCollectionSnapshotGlobal(entityGlobalId);
  let localEntityForRange = loadOrCreateDailyValidatorSnapshot(entityLocalId, event.params.validator);
  // Global Specific:
  // Add the validator in range
  if (!globalEntityForRange.validators.includes(event.params.validator)) {
    const vList = globalEntityForRange.validators;
    vList.push(event.params.validator);
    globalEntityForRange.validators = vList;
    globalEntityForRange.save();
  }

  // Both
  globalEntityForRange.rangeTransactions = globalEntityForRange.rangeTransactions + 1;
  globalEntityForRange.rangeVolume = globalEntityForRange.rangeVolume.plus(event.params.amount);
  if (globalEntityForRange.timestamp == 0) globalEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > globalEntityForRange.topBid) globalEntityForRange.topBid = event.params.amount;

  localEntityForRange.rangeTransactions = localEntityForRange.rangeTransactions + 1;
  localEntityForRange.rangeVolume = localEntityForRange.rangeVolume.plus(event.params.amount);
  if (localEntityForRange.timestamp == 0) localEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > localEntityForRange.topBid) localEntityForRange.topBid = event.params.amount;

  globalEntityForRange.save();
  localEntityForRange.save();
}
function updateWeekly(event: RelayFlashBidEvent,timeRangeName: string, divBy: number): void { 
  // Hourly loops 

  // Floor the range.
  
  let timeRange = event.block.timestamp.div(BigInt.fromI32(divBy as i32)).toI32();
  let entityGlobalId = `${STATS_ID.toHexString()}-${timeRangeName}-${timeRange.toString()}`;
  let entityLocalId = `${event.params.validator.toHexString()}-${timeRangeName}-${timeRange.toString()}`;

  let globalEntityForRange = loadOrCreateWeeklyCollectionSnapshotGlobal(entityGlobalId);
  let localEntityForRange = loadOrCreateWeeklyValidatorSnapshot(entityLocalId, event.params.validator);
  // Global Specific:
  // Add the validator in range
  if (!globalEntityForRange.validators.includes(event.params.validator)) {
    const vList = globalEntityForRange.validators;
    vList.push(event.params.validator);
    globalEntityForRange.validators = vList;
    globalEntityForRange.save();
  }

  // Both
  globalEntityForRange.rangeTransactions = globalEntityForRange.rangeTransactions + 1;
  globalEntityForRange.rangeVolume = globalEntityForRange.rangeVolume.plus(event.params.amount);
  if (globalEntityForRange.timestamp == 0) globalEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > globalEntityForRange.topBid) globalEntityForRange.topBid = event.params.amount;

  localEntityForRange.rangeTransactions = localEntityForRange.rangeTransactions + 1;
  localEntityForRange.rangeVolume = localEntityForRange.rangeVolume.plus(event.params.amount);
  if (localEntityForRange.timestamp == 0) localEntityForRange.timestamp = timeRange * divBy as i32;
  if (event.params.amount > localEntityForRange.topBid) localEntityForRange.topBid = event.params.amount;

  globalEntityForRange.save();
  localEntityForRange.save();
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

  entity.save();




  const searcher = loadOrCreateSearcher(event.params.sender);
  searcher.bundlesLanded = searcher.bundlesLanded.plus(ONE);
  searcher.lastBundleLandedTimestamp = event.block.timestamp.toI32();
  searcher.totalTipped = searcher.totalTipped.plus(event.params.amount);
  searcher.save();

  const validator = loadOrCreateValidator(event.params.validator);
  validator.totalTips = validator.totalTips.plus(event.params.amount);
  validator.lastBundleReceivedTimestamp = event.block.timestamp.toI32();
  validator.totalExecutedBundlesCount = validator.totalExecutedBundlesCount.plus(ONE);
  validator.save();

  const stats = loadOrCreateGlobalStats();
  stats.totalExecutedBundlesCount = stats.totalExecutedBundlesCount.plus(ONE);
  stats.totalValidatorsPaid = stats.totalValidatorsPaid.plus(event.params.amount);
  stats.save();

  const logIndex = event.logIndex;

  updateHourly(event, 'HOURLY', 3600);
  updateDaily(event, 'DAILY', 3600*24);
  updateWeekly(event, 'WEEKLY', 3600*24*7);
  
  // Figure out .logIndex stuff to make Ids
}


export function handleRelayValidatorDisabled(
  event: RelayValidatorDisabledEvent
): void {
  const validator = loadOrCreateValidator(event.params.validator);
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
}
