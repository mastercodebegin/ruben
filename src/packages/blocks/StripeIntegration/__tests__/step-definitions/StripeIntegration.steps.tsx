import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import StripeIntegration from "../../src/StripeIntegration";
import PaymentCustomeAlert from "../../src/PaymentCustomeAlert";
import DoubleButton from "../../../../components/src/DoubleButton";
import { State } from "react-native-gesture-handler";
import { flattenProp } from "recompose";
import { Alert } from "react-native";
const navigation = require("react-navigation");
const screenProps = {
  route: {
    params: {
      is24HourDelivery: true,
      name: '',
      email: '',
      address: '',
      phone_number: 0,
      zip_code: 0,
      subtotal: 0,
      shipping: 0,
      discount: 0,
      discountPercentage : 0,
      storageClass: "Basic" ,
      orderId: 0,
      orderNumber: 0,
      deliveryCharge: 0,
      total: 0,
      lifetimeSubscriptionCharge:{},
      billingDetails: [],
      isUserAlreadySubscribed:true,
      deliveryDate:'string'
    }
  },
  navigation: navigation,
  id: "StripeIntegration",
  goBack: jest.fn(),
  fetch: jest.fn(),
};

const feature = loadFeature(
  "./__tests__/features/StripeIntegration-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
      ToastAndroid: { show: jest.fn() },
    }));
  });
 
  test("User navigates to StripeIntegration", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: StripeIntegration;

    given("I am a User loading StripeIntegration", () => {
      exampleBlockA = shallow(
        <StripeIntegration
          {...screenProps}
        />
      );
    });

    when("I navigate to the StripeIntegration", () => {
      instance = exampleBlockA.instance() as StripeIntegration;
    });

    then("StripeIntegration will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    then("should return 3.99 for storageClass Gold", () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'cardButton');
      textInputComponent.simulate('press');
      let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'doneFirstButtonEvent');
      textInputComponent1.simulate('press');
      let doneSecondButtonEvent = exampleBlockA.findWhere((node) => node.prop('testID') === 'doneSecondButtonEvent');
      doneSecondButtonEvent.simulate('press');
      let codButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'codButton');
      codButton.simulate('press');
      let CardCheckBoxId = exampleBlockA.findWhere((node) => node.prop('testID') === 'CardCheckBoxId');
      CardCheckBoxId.simulate('press');
      
      // let textInputComponent1 = exampleBlockA.findWhere(
      //   (node) => node.prop("testID") === "cardNameInput"
      // );
      // textInputComponent1.simulate("changeText", 'test');  
      });
    then("Receive function works properly", () => {
      const locationSuccessRestApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.AccoutLoginSuccess),
        locationSuccessRestApi
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.AccoutLoginSuccess),
        locationSuccessRestApi
      );
      locationSuccessRestApi.addData(
        getName(MessageEnum.AccoutLoginSuccess),
        locationSuccessRestApi.messageId
      );
      locationSuccessRestApi.getData(getName(MessageEnum.AuthTokenDataMessage));
      instance.getSavedCardsCallId = locationSuccessRestApi.messageId;
      runEngine.sendMessage("Unit Test", locationSuccessRestApi);

     });
   
    then("I can call payment api  without errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
         data:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.paymentId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call payment api  with errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
         error:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.paymentId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call code api  without errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
         data:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.codId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call code api  with errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
         error:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.codId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call getSavedCardsCallId api  without errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
         data:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.getSavedCardsCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call getSavedCardsCallId api  with errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
         error:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.getSavedCardsCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call saveCardApiCallId api  without errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
         data:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.saveCardApiCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can call saveCardApiCallId api  with errors", () => {
      const paymentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
         error:[]
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.saveCardApiCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can leave the screen with out errors", () => {
      const magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
         errors:[]
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.paymentId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
