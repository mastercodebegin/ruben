import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailAccountSignupBlock from "../../src/EmailAccountSignupBlock";
import SuccessModal from "../../src/SuccessModal";
import { render, fireEvent } from "@testing-library/react-native";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EmailAccountSignupBlock",
};
export const signupProps = {
  onPressLogin: jest.fn(),
  onchangePassword: jest.fn(),
  onchangeEmail: jest.fn(),
  onpressSignup: jest.fn(),
  email: "test@test.com",
  password: "QWEqwe123!",
  setShowModal: jest.fn(),
  setShowMerchantModal: jest.fn(),
  showModal: true,
  showMerchantModal: true,
  resetStack: jest.fn(),
  couponCode: "testCode",
  doMerchantSignup: jest.fn(),
  mEmail: "test@test.com",
  onChangeMEmail: jest.fn(),
  mPassword: "QWEqwe123!",
  onChangeMPassword: jest.fn(),
  farmName: "test farm name",
  onChangeFarmName: jest.fn(),
  product: "test product",
  onChangeProduct: jest.fn(),
  location: "test location",
  onChangeLocation: jest.fn(),
  contact: "test contact",
  onChangeContact: jest.fn(),
  description: "test decription",
  onChangeDescription: jest.fn(),
  website: "www.test.com",
  onChangeWebsite: jest.fn(),
  social: "www.test.com",
  onChnageSocial: jest.fn(),
};
const simulateTextInput = (testId: string, text: string) => {
  const { queryByTestId } = render(
    <EmailAccountSignupBlock {...screenProps} />
  );
  const input: any = queryByTestId(testId);
  fireEvent.changeText(input, text);
  expect(input.props.value).toBe(text);
};
const feature = loadFeature(
  "./__tests__/features/email-account-signup-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "ios" },
      Clipboard: { setString: jest.fn() },
      ToastAndroid: { show: jest.fn() },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to signup screen", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountSignupBlock;

    given("I am a User attempting to signup  with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountSignupBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance =
        mobileAccountLogInWrapper.instance() as EmailAccountSignupBlock;

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              email_validation_regexp:
                "^[a-zA-Z0-9.!\\#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
              password_validation_regexp:
                "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
              password_validation_rules:
                "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_).",
            },
          ],
        }
      );
      instance.validationApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("user trying to signup with invalid email", () => {
      instance.setState({
        signupEmail: "testtest.com",
        signupPassword: "Qweqwe123!",
      });
      let response = instance.doEmailSignup();
      expect(response).toBeFalsy();
    });
    then("user trying to signup with invalid password", () => {
      instance.setState({
        signupEmail: "test@test.com",
        signupPassword: "Qweqwe",
      });
      let response = instance.doEmailSignup();
      expect(response).toBeFalsy();
    });
    then("user trying to signup with valid email and password", () => {
      instance.setState({
        signupEmail: "test@test.com",
        signupPassword: "Qweqwe123!",
      });
      let response = instance.doEmailSignup();
      expect(response).toBeTruthy();
    });
    then("user trying to signup as a merchant", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test farm",
        description: "test description",
        product: "test product",
        location: "test location",
        contact: "test contact",
        website: "www.test.com",
        social: "www.facebook.com",
      });
      const merchantSignupResponse = instance.doMerchantSignup();
      expect(merchantSignupResponse).toBeTruthy();
    });
    then("user can see the welcome modal", () => {
      const wrapper = shallow(
        <SuccessModal
          visible={true}
          onpressClose={jest.fn()}
          onpressContinue={jest.fn()}
          couponCode={"test code"}
        />
      );
      expect(wrapper).toBeTruthy();
    });
    then("user trying to copy coupon code", () => {
      const wrapper = shallow(
        <SuccessModal
          visible={true}
          onpressClose={jest.fn()}
          onpressContinue={jest.fn()}
          couponCode={"test code"}
        />
      );
      const touchableOpacity = wrapper.findWhere(
        (node) => node.prop("testID") === "copy_code_id"
      );
      touchableOpacity.simulate("press");
    });
    then("user trying to enter email id and password", () => {
      simulateTextInput("user-email", "test@gmail.com");
      simulateTextInput("user_password", "QWEqwe123!");
    });
    then("user trying to signup us a user", () => {
      const { getByTestId } = render(
        <EmailAccountSignupBlock {...screenProps} />
      );

      fireEvent.press(getByTestId("user_checkBox"));
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });
  });
});
