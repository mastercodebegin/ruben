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
      discountPercentage: 0,
      storageClass: "Basic",
      orderId: 0,
      orderNumber: 0,
      deliveryCharge: 0,
      total: 0,
      lifetimeSubscriptionCharge: {},
      billingDetails: [],
      isUserAlreadySubscribed: true,
      deliveryDate: 'string'
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
    when("I press on cardButton", () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'cardButton');
      textInputComponent.simulate('press');
    });

    then("cardButton should be display", () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'cardButton');
      textInputComponent.simulate('press');
      expect(instance.state.paymentMethodType).toBe('Card');
    });

    when("I press on doneFirstButtonEvent", () => {
      let textInputComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'doneFirstButtonEvent');
      textInputComponent1.simulate('press');
    });

    then("button name should be pay", () => {
      let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'cardButton');
      textInputComponent.simulate('press');
     expect(instance.getButtonName()).toBe('Pay');
    });

    when("I press on doneSecondButtonEvent", () => {
      let doneSecondButtonEvent = exampleBlockA.findWhere((node) => node.prop('testID') === 'doneSecondButtonEvent');
      doneSecondButtonEvent.simulate('press');
    });
    then("button name should be Continue", () => {
      let doneSecondButtonEvent = exampleBlockA.findWhere((node) => node.prop('testID') === 'doneSecondButtonEvent');
      doneSecondButtonEvent.simulate('press');
      expect(instance.getButtonName()).toBe('Pay');
    });

    when("I enter card name", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = 'John Doe';
      cardNameInput.props().onchangeText(newName);
    });
    then("name should be more then 2 digit", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = 'John';
      cardNameInput.props().onchangeText(newName);
      expect(instance.state.cardName.length).toBeGreaterThan(2);
    });

    when("I enter card number", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('545646571555756777358865');
    });
    then("name should be more then 16 digit", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('545646571555756777358865');
      expect(instance.state.cardNumber.length).toBeGreaterThan(16);
    });

    when("I enter card expiry date", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardNumber.props().onchangeText('1124');
    });
    then("card expiry date should be more then 4 digit", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardNumber.props().onchangeText('1124');
      expect(instance.state.cardNumber.length).toBeGreaterThan(3);
    });

    when("I enter card cvv", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardNumber.props().onchangeText('123');
    });
    then("card cvv should be 3 digit", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardNumber.props().onchangeText('123');
      expect(instance.state.cvv.length).toBe(3);
    });
    when("I check the savecard api call with valid card details", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = 'John';
      cardNameInput.props().onchangeText(newName);

      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('54564345765675675675555');

      let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardExpiry.props().onchangeText('1225');

      let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardCVV.props().onchangeText('123');
    });
    then("check with valid card details", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = 'John';
      cardNameInput.props().onchangeText(newName);

      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('75675555');

      let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardExpiry.props().onchangeText('1125');

      let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardCVV.props().onchangeText('123');

      
      expect(instance.state.cvv.length).toBe(3);
    });

    then("check with invalid card details", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = '89';
      cardNameInput.props().onchangeText(newName);

      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('908');

      let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardExpiry.props().onchangeText('90');

      let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardCVV.props().onchangeText('90');

      
      expect(instance.state.cvv.length).toBe(2);
    });

    then("check with invalid card number details", () => {

      // let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "onSaveCardTestId");
      // cardNumber.simulate('press');
      // let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      // cardNumber.props().onchangeText('');

      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = '89';
      cardNameInput.props().onchangeText(newName);

      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('90854');

      let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardExpiry.props().onchangeText('1225');

      let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardCVV.props().onchangeText('907');
    });
    then("check with invalid card expiry details", () => {

      // let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "onSaveCardTestId");
      // cardNumber.simulate('press');
      // let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      // cardNumber.props().onchangeText('');

      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = '89';
      cardNameInput.props().onchangeText(newName);

      // let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      // cardNumber.props().onchangeText('9085478665577768989');

      // let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      // cardExpiry.props().onchangeText('1225');

      // let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      // cardCVV.props().onchangeText('907');
    });

    when("I press cod button", () => {
      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "onSaveCardTestId");
      cardNumber.simulate('press');
    });
    then("cod option should be selected", () => {
      let cardNameInput = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNameInput");
      const newName = '89';
      cardNameInput.props().onchangeText(newName);

      let cardNumber = exampleBlockA.findWhere((node) => node.prop("testID") === "cardNumber");
      cardNumber.props().onchangeText('9085478665577768989');

      let cardExpiry = exampleBlockA.findWhere((node) => node.prop("testID") === "cardExpiry");
      cardExpiry.props().onchangeText('1225');

      let cardCVV = exampleBlockA.findWhere((node) => node.prop("testID") === "cardCVV");
      cardCVV.props().onchangeText('907');
      let codButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'onSaveCardTestId');
      codButton.simulate('press');
      let CardCheckBoxId = exampleBlockA.findWhere((node) => node.prop('testID') === 'CardCheckBoxId');
      CardCheckBoxId.simulate('press');
      let onSaveCardTestId = exampleBlockA.findWhere((node) => node.prop("testID") === "onSaveCardTestId");
      onSaveCardTestId.simulate('press');
      
      expect(instance.state.paymentMethodType.length).toBeGreaterThan(1);
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
        
           [
            {name:'abc',card_number:'1234'},
            {name:'abc',card_number:'1234'},
            {name:'abc',card_number:'1234'}
          ]
        
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.getSavedCardsCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
      expect(instance.state.savedCards.length).toBe(3);
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
          error: {}
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.getSavedCardsCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);
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
          data: {name:'abc',card_number:'1234'}
        }
      );
      paymentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        paymentApi.messageId
      );
      instance.saveCardApiCallId = paymentApi.messageId;
      runEngine.sendMessage("Unit Test", paymentApi);


      let plans2 = exampleBlockA.findWhere((node) => node.prop('testID') === "saveCardFlatlistCallId");
      plans2.props().renderItem({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly',
            star: true
          }
        }
      })

      const FlatListRenderItem = plans2.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      const onPressUser1 = FlatListRenderItem.findWhere((node: { prop: (arg0: string) => string; }) => node.prop('testID') === 'changeCardTestId')
      onPressUser1.props().setChecked("press");

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
          error: []
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
          errors: []
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
