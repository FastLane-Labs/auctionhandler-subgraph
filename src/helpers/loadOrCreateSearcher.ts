import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ADDRESS_ZERO, ZERO_INT } from './common';
import { Searcher } from "../../generated/schema";
import { loadOrCreateGlobalStats } from './loadOrCreateGlobalStats';

const INACTIVE = 'INACTIVE';

export function loadOrCreateSearcher(searcherAddress: Bytes): Searcher {
    let searcher = Searcher.load(searcherAddress);
    if (!searcher) {
        searcher = new Searcher(searcherAddress);
        searcher.address = searcherAddress;
        searcher.bundlesLanded = ZERO;
        searcher.totalTipped = ZERO;
        searcher.lastBundleLandedTimestamp = ZERO_INT;
        searcher.save();

        const stats = loadOrCreateGlobalStats();
        stats.totalUniqueSearchers = stats.totalUniqueSearchers.plus(BigInt.fromI32(1));
        stats.save();
    }
    return searcher;
}