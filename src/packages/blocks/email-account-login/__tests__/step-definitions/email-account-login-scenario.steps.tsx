import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock";
import { checkValidEmail } from "../../src/EmailAccountLoginBlock";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
};

const feature = loadFeature(
  "./__tests__/features/email-account-login-scenario.feature"
);

defineFeature(feature, (test) => {
  test("User navigates to Email Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
    });

    then("Check Email is Valid", () => {
      expect(checkValidEmail("test@gmail.com")).toBe(true);
      expect(checkValidEmail("test12@gmail.com")).toBe(true);
      expect(checkValidEmail("t12est@gmail.com")).toBe(true);
      expect(checkValidEmail("test@gmail..com")).toBe(true);
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });
  });
});
