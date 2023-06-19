import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ZERO_INT, ZERO_BIG_DEC, STATS_ID, ADDRESS_ZERO } from '../common';
import { 
    DailyCollectionSnapshotGlobal,
    DailyValidatorSnapshot
 } from "../../../generated/schema";


export function loadOrCreateDailyCollectionSnapshotGlobal(id: string): DailyCollectionSnapshotGlobal {
    const constr = DailyCollectionSnapshotGlobal;
    let snap = constr.load(id);
    if (!snap) {
            snap = new constr(id);
            snap.target = STATS_ID;
            snap.timestamp = ZERO_INT;
            snap.rangeVolume = ZERO;
            snap.rangeTransactions = ZERO_INT;
            snap.validators = [];
            snap.save();
        }
    return snap;
}

export function loadOrCreateDailyValidatorSnapshot(id: string, validatorAddress: Bytes): DailyValidatorSnapshot {
    const constr = DailyValidatorSnapshot;
    let snap = constr.load(id);
if (!snap) {
        snap = new constr(id);
        snap.target = validatorAddress;
        snap.timestamp = ZERO_INT;
        snap.rangeVolume = ZERO;
        snap.rangeTransactions = ZERO_INT;

        snap.save();
    }
    return snap;
}