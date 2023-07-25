import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock";
import SignupComponent from "../../src/SignupComponent";
import { signupProps } from "./email-account-login-scenario.steps";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
const navigation ={
  navigate:jest.fn(),
  reset:jest.fn(),
  goBack:jest.fn()
}

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
};

const feature = loadFeature(
  "./__tests__/features/email-account-merchant-login-scenario.feature"
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

  test("User Trying to signup as a merchant", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to signup as a merchant with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance =
      mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;

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
        meta: {
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
        },
      }
    );
    instance.apiMerchantEmailSignupCallId = msgValidationAPI.messageId;
    runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("I can Navigate to merchant signup screen", () => {
      const wrapper = shallow(<SignupComponent {...signupProps} />);
      expect(wrapper).toBeTruthy();
    });
    then("user trying to signup with empty email", () => {
      instance.setState({
        mEmail: "",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "test contact",
        description: "test description",
        website: "www.test.com",
        social: "https://instagram.com/dhg",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty password", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty farm name", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty product name", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });

    then("user trying to signup with empty location", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty contact", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty description", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "test contact",
        description: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty website", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "test contact",
        description: "test description",
        website: "",
      });
      const res = instance.doMerchantSignup();
      expect(res).toBeFalsy();
    });
    then("user trying to signup with empty social account", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "test contact",
        description: "test description",
        website: "www.test.com",
        social: "",
      });
      instance.doMerchantSignup();
    });
    then("I can fill the details without error", () => {
      instance.setState({
        mEmail: "test@test.com",
        mPassword: "Qweqwe123!",
        farmName: "test Farm",
        product: "test product",
        location: "Test location",
        contact: "test contact",
        description: "test description",
        website: "www.test.com",
        social: "https://instagram.com/dhg",
      });
      instance.doMerchantSignup();
    });
    then('user navigate to welcome modal',()=>{
      instance.resetStack('welcomeModal',{})
    })
  });
});
