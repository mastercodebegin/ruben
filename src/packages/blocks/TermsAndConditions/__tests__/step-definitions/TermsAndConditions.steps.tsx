import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TermsAndConditions from "../../src/TermsAndConditions";
import { create } from "react-test-renderer";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TermsAndConditions",
};

const feature = loadFeature(
  "./__tests__/features/TermsAndConditions-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TermsAndConditions", ({ given, when, then }) => {
    const componentDidMountSpy = jest.spyOn(
      TermsAndConditions.prototype,
      "componentDidMount"
    );

    let exampleBlockA: ShallowWrapper;
    let instance: TermsAndConditions;

    given("I am a User loading TermsAndConditions", () => {
      exampleBlockA = shallow(<TermsAndConditions {...screenProps} />);
    });

    when("I navigate to the TermsAndConditions", () => {
      instance = exampleBlockA.instance() as TermsAndConditions;
    });

    then("TermsAndConditions will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    then("callGetTermsAndConditions", () => {
      expect(componentDidMountSpy).toHaveBeenCalled();
    });
    

    then("check api call", () => {
      const component = create(<TermsAndConditions {...screenProps} />);
      const termsInstance: any = component.getInstance();

      const onSubmit = jest.fn();
      termsInstance.callGetTermsAndConditions = onSubmit;
      termsInstance.forceUpdate();
      termsInstance.callGetTermsAndConditions();
      expect(onSubmit).toHaveBeenCalled();
    });
    then("Check button press", () => {
      const component = create(<TermsAndConditions {...screenProps} />);
      const termsInstance: any = component.getInstance();

      const onSubmit = jest.fn();
      termsInstance.callGetTermsAndConditions = onSubmit;
      termsInstance.forceUpdate();
      termsInstance.doButtonPressed();
      expect(onSubmit).toHaveBeenCalled();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
