import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import { ZERO, ADDRESS_ZERO, ZERO_INT } from './common';
import { Validator } from "../../generated/schema";
import { loadOrCreateGlobalStats } from './loadOrCreateGlobalStats';

const INACTIVE = 'INACTIVE';

export function loadOrCreateValidator(validatorAddress: Bytes): Validator {
    let validator = Validator.load(validatorAddress);
    if (!validator) {
        validator = new Validator(validatorAddress);
        validator.address = validatorAddress;
        validator.status = INACTIVE;
        validator.totalTips = ZERO;

        validator.lastBundleReceivedTimestamp = ZERO_INT;
        validator.enabledAt = ZERO_INT;
        validator.disabledAt = ZERO_INT;
        validator.totalExecutedBundlesCount = ZERO;
        validator.save();
        //log.info('ValID {}',[validator.id]);
    }
    return validator;
}