import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"


import { 
  handleRelayValidatorEnabled,
  handleRelayValidatorDisabled,
  handleRelayFlashBid
 } from "../src/fast-lane-auction-handler"
import {
  createRelayValidatorEnabledEvent,
  createRelayValidatorDisabledEvent,
  createRelayFlashBidEvent
 } from "./fast-lane-auction-handler-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {})

  afterAll(() => {
    clearStore()
  })

  test("Enable Validator", () => {
    // Store will be lowercase
    let newEnableValidatorEvent = createRelayValidatorEnabledEvent(
      Address.fromString("0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"),
      Address.fromString("0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff")
    );
    handleRelayValidatorEnabled(newEnableValidatorEvent);
    assert.entityCount("Validator", 1);
    assert.fieldEquals(
      "Validator",
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff".toLowerCase(),
      "bidsReceived",
      "0"
    );
    assert.fieldEquals(
      "Validator",
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff".toLowerCase(),
      "status",
      "ACTIVE"
    );
  });
  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

})
