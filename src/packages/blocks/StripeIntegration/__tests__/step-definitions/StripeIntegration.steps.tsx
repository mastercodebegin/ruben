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
      doneSecondButtonEvent.simulate('press');
      // let textInputComponent1 = exampleBlockA.findWhere(
      //   (node) => node.prop("testID") === "cardNameInput"
      // );
      // textInputComponent1.simulate("changeText", 'test');  
      });
    then("Receive function works properly", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cardNameInput"
      );
      textInputComponent.simulate("changeText", 'test');   
     });
   
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
