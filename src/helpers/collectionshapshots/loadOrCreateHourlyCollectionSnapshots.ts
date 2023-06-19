import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ZERO_INT, ZERO_BIG_DEC, STATS_ID, ADDRESS_ZERO } from '../common';
import { 
    HourlyCollectionSnapshotGlobal,
    HourlyValidatorSnapshot
 } from "../../../generated/schema";


export function loadOrCreateHourlyCollectionSnapshotGlobal(id: string): HourlyCollectionSnapshotGlobal {
    const constr = HourlyCollectionSnapshotGlobal;
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

export function loadOrCreateHourlyValidatorSnapshot(id: string, validatorAddress: Bytes): HourlyValidatorSnapshot {
    const constr = HourlyValidatorSnapshot;
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