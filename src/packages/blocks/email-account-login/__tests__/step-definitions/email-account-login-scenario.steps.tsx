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
import LoginComponent from "../../src/LoginComponent";
import SuccessModal from "../../src/SuccessModal";
import SignupComponent from "../../src/SignupComponent";
import { fireEvent, render } from "@testing-library/react-native";
const navigation = {
  navigate: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
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

const feature = loadFeature(
  "./__tests__/features/email-account-login-scenario.feature"
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

  test("User navigates to Email Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;

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

    when("I navigate to the Log In Screen", () => {
      const wrapper = shallow(
        <LoginComponent
          onpressSignup={jest.fn()}
          onchangePassword={jest.fn()}
          onchangeEmail={jest.fn()}
          navigation={jest.fn()}
          onpressLogin={jest.fn()}
          checked={false}
          setChecked={() => {}}
          email="test@test.com"
          password="Qweqwe123!"
        />
      );
      expect(wrapper).toBeTruthy();
    });
    then("user trying to go login screen using header", () => {
      const { getByTestId } = render(
        <EmailAccountLoginBlock {...screenProps} />
      );
      fireEvent.press(getByTestId("go_to_login_test_id"));
      expect(navigation.navigate).toBeCalledWith("AuthenticationStack", {
        screen: "EmailAccountLoginBlock",
      });
    });
    then("user pressing signup in the header header", () => {
      const { getByTestId } = render(
        <EmailAccountLoginBlock {...screenProps} />
      );
      fireEvent.press(getByTestId("go_to_sign_up_test_id"));
      expect(navigation.navigate).toBeCalledWith("AuthenticationStack", {
        screen: "EmailAccountSignupBlock",
      });
    });
    then("Login with empty email", () => {
      instance.setState({ email: "", password: "Qweqwe123!" });
      const loginResponse = instance.onpressLoginButton();
      expect(loginResponse).toBeFalsy();
    });
    then("Login with empty password", () => {
      instance.onchangeEmail("test@test.com");
      instance.setState({ password: "" });
      const loginResponse = instance.onpressLoginButton();
      expect(loginResponse).toBeFalsy();
    });
    then("Login with invalid Email", () => {
      instance.setState({ email: "testtest.com", password: "Qweqwe123!" });
      const loginResponse = instance.onpressLoginButton();
      expect(loginResponse).toBeFalsy();
    });
    then("Login with valid Email and password", () => {
      instance.setState({ email: "test@test.com", password: "Qweqwe123!" });
      const loginResponse = instance.onpressLoginButton();
      expect(loginResponse).toBeTruthy();
    });
    then("user moving to signup tab", () => {
      instance.setState({ selectedTab: false });
      const wrapper = shallow(<SignupComponent {...signupProps} />);
      const touchableOpacity = wrapper.findWhere(
        (node) => node.prop("testID") === "merchant_check_box_id"
      );
      touchableOpacity.simulate("press");

      expect(wrapper).toBeTruthy();
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
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });
  });
});
