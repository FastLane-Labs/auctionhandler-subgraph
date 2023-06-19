import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ADDRESS_ZERO, ZERO_INT, STATS_ID } from './common';
import { GlobalStat } from "../../generated/schema";

export function loadOrCreateGlobalStats(): GlobalStat {
    let stats = GlobalStat.load(STATS_ID);
    if (!stats) {
        stats = new GlobalStat(STATS_ID);
        stats.totalExecutedBundlesCount = ZERO;
        stats.totalValidatorsCount = ZERO;
        stats.totalValidatorsPaid = ZERO;
        stats.totalUniqueSearchers = ZERO;
        // stats.totalOpportunitiesCount = ZERO;
        stats.save();
    }
    return stats;
}