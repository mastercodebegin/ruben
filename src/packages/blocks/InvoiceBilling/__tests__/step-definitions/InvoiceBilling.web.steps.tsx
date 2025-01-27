import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import InvoiceBilling from "../../src/InvoiceBilling.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "InvoiceBilling",
  route: {
    params: {
      name: "test name"
    }
  }
};

const feature = loadFeature(
  "./__tests__/features/InvoiceBilling-scenario.web.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to InvoiceBilling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am a User loading InvoiceBilling", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
    });

    when("I navigate to the InvoiceBilling", () => {
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    then("InvoiceBilling will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        node => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" }
      };
      // textInputComponent.simulate("change", event);
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-test-id") === "btnAddExample"
      );
      // buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
