import { Address, BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts';
import { ZERO, ZERO_INT, ZERO_BIG_DEC, STATS_ID, ADDRESS_ZERO } from '../common';
import { 
    DailyCollectionSnapshotGlobal,
    DailyValidatorSnapshot
 } from "../../../generated/schema";


export function loadOrCreateDailyCollectionSnapshotGlobal(id: string): DailyCollectionSnapshotGlobal {
    let snap = DailyCollectionSnapshotGlobal.load(id);
    if (!snap) {
            snap = new DailyCollectionSnapshotGlobal(id);
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

export function loadOrCreateDailyValidatorSnapshot(id: string, validatorAddress: Bytes): DailyValidatorSnapshot {
    let snap = DailyValidatorSnapshot.load(id);
if (!snap) {
        snap = new DailyValidatorSnapshot(id);
        snap.target = validatorAddress;
        snap.timestamp = ZERO_INT;
        snap.rangeVolume = ZERO;
        snap.rangeTransactions = ZERO_INT;
        snap.topBid = ZERO;
        snap.save();
    }
    return snap;
}
