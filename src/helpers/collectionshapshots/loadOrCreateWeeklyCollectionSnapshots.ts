import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ZERO_INT, ZERO_BIG_DEC, STATS_ID, ADDRESS_ZERO } from '../common';
import { 
    WeeklyCollectionSnapshotGlobal,
    WeeklyValidatorSnapshot
 } from "../../../generated/schema";


export function loadOrCreateWeeklyCollectionSnapshotGlobal(id: string): WeeklyCollectionSnapshotGlobal {
    let snap = WeeklyCollectionSnapshotGlobal.load(id);
    if (!snap) {
            snap = new WeeklyCollectionSnapshotGlobal(id);
            snap.target = STATS_ID;
            snap.timestamp = ZERO_INT;
            snap.rangeVolume = ZERO;
            snap.rangeTransactions = ZERO_INT;
            snap.validators = [];
            snap.topBid = ZERO;
            snap.save();
        }
    return snap;
}

export function loadOrCreateWeeklyValidatorSnapshot(id: string, validatorAddress: Bytes): WeeklyValidatorSnapshot {
    let snap = WeeklyValidatorSnapshot.load(id);
if (!snap) {
        snap = new WeeklyValidatorSnapshot(id);
        snap.target = validatorAddress;
        snap.timestamp = ZERO_INT;
        snap.rangeVolume = ZERO;
        snap.rangeTransactions = ZERO_INT;
        snap.topBid = ZERO;
        snap.save();
    }
    return snap;
}