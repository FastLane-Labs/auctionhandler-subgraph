import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ZERO_INT, ZERO_BIG_DEC, STATS_ID, ADDRESS_ZERO } from '../common';
import { 
    HourlyCollectionSnapshotGlobal,
    HourlyValidatorSnapshot
 } from "../../../generated/schema";


export function loadOrCreateHourlyCollectionSnapshotGlobal(id: string): HourlyCollectionSnapshotGlobal {
    let snap = HourlyCollectionSnapshotGlobal.load(id);
    if (!snap) {
            snap = new HourlyCollectionSnapshotGlobal(id);
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

export function loadOrCreateHourlyValidatorSnapshot(id: string, validatorAddress: Bytes): HourlyValidatorSnapshot {
    let snap = HourlyValidatorSnapshot.load(id);
if (!snap) {
        snap = new HourlyValidatorSnapshot(id);
        snap.target = validatorAddress;
        snap.timestamp = ZERO_INT;
        snap.rangeVolume = ZERO;
        snap.rangeTransactions = ZERO_INT;
        snap.topBid = ZERO;
        snap.save();
    }
    return snap;
}