import { BigInt, Bytes, log } from "@graphprotocol/graph-ts"
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
  ZERO_INT,
  STATS_ID
} from './helpers/common';
import { loadOrCreateGlobalStats } from "./helpers/loadOrCreateGlobalStats";
import { loadOrCreateValidator } from "./helpers/loadOrCreateValidator";
import { loadOrCreateSearcher } from "./helpers/loadOrCreateSearcher";
import { loadOrCreateHourlyCollectionSnapshotGlobal, loadOrCreateHourlyValidatorSnapshot } from "./helpers/collectionshapshots/loadOrCreateHourlyCollectionSnapshots";
import { loadOrCreateDailyValidatorSnapshot, loadOrCreateDailyCollectionSnapshotGlobal } from "./helpers/collectionshapshots/loadOrCreateDailyCollectionSnapshots";
import { loadOrCreateWeeklyValidatorSnapshot, loadOrCreateWeeklyCollectionSnapshotGlobal } from "./helpers/collectionshapshots/loadOrCreateWeeklyCollectionSnapshots";

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
  validator.save();

  const stats = loadOrCreateGlobalStats();
  stats.totalExecutedBundlesCount = stats.totalExecutedBundlesCount.plus(ONE);
  stats.totalValidatorsPaid = stats.totalValidatorsPaid.plus(event.params.amount);
  stats.save();

  // Check crocswap for Id definition or entity
  const logIndex = event.logIndex;
  // For hourly global it will only be GlobalStats-HOUR-${HOUR}
  // For hourly local to validator vID-HOUR-${HOUR} ?
  const timeRangeInfo = [
    {name: 'HOURLY', divBy: 3600, localFn:loadOrCreateHourlyValidatorSnapshot, globalFn: loadOrCreateHourlyCollectionSnapshotGlobal},
    {name: 'DAILY', divBy: 86400, localFn:loadOrCreateDailyValidatorSnapshot, globalFn: loadOrCreateDailyCollectionSnapshotGlobal},
    {name: 'WEEKLY', divBy: 604800, localFn:loadOrCreateWeeklyValidatorSnapshot, globalFn: loadOrCreateWeeklyCollectionSnapshotGlobal},
  ];

  timeRangeInfo.forEach(range => {

    let divBy = range.divBy;
    let timeRangeName = range.name;

    // Floor the range.
    let timeRange = ~~(event.block.timestamp.toI32() / divBy);
    let entityGlobalId = `${STATS_ID}-${timeRangeName}-${timeRange}`;
    let entityLocalId = `${validator.id}-${timeRangeName}-${timeRange}`;

    let globalEntityForRange = range.globalFn(entityGlobalId);
    let localEntityForRange = range.localFn(entityLocalId, validator.id);
    // Global Specific:
    // Add the validator in range
    if (!globalEntityForRange.validators.includes(validator.id)) {
      const vList = [...globalEntityForRange.validators];
      vList.push(validator.id);
      globalEntityForRange.validators = vList;
      globalEntityForRange.save();
    }

    // Both
    [globalEntityForRange,localEntityForRange].forEach(entity => {

      entity.rangeTransactions = entity.rangeTransactions + 1;
      entity.rangeVolume = entity.rangeVolume.plus(event.params.amount);
      if (event.params.amount > entity.topBid) entity.topBid = event.params.amount;

      // Assign timestamp
      if (entity.timestamp == 0) {
        entity.timestamp = timeRange * divBy;
      }

      // TODO: Consider AVG in fields.
      entity.save();

    });




  });


  //


  // Figure out .logIndex stuff to make Ids
  // loadOrCreateHourlyCollectionSnapshotGlobal
  // loadOrCreateHourlyValidatorSnapshot(id,vId)
  

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
