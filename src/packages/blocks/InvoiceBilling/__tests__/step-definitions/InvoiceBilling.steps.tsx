import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import InvoiceBilling from "../../src/InvoiceBilling";
import { fireEvent, render } from "@testing-library/react-native";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Alert } from "react-native";
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
  "./__tests__/features/InvoiceBilling-scenario.feature"
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
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "cart"
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              attributes: {
                order_items: { data: [{}] }
              }
            }
          ]
        }
      );
      instance.cartCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      const termsCondsList = exampleBlockA.findWhere(
        node => node.prop("testID") === "render_product_list_id"
      );
      termsCondsList.render();
    });

    then("InvoiceBilling will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    // then('I can enter text with out errors', () => {
    //     let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
    //     textInputComponent.simulate('changeText', 'hello@aol.com');
    // });

    // then('I can select the button with with out errors', () => {
    //     let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
    //     buttonComponent.simulate('press');
    //     expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
    // });
    then("I can see the invoice", () => {
      render(<InvoiceBilling {...screenProps} />);
    });

    then("I can share the the invoice through mail", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "share_invoice_id"
      );
      expect(buttonComponent).toBeTruthy();
      buttonComponent.simulate("press");
    });
    then("I can download the invoice", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "download_invoice_id"
      );
      expect(buttonComponent).toBeTruthy();
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      const showAlert = jest.spyOn(Alert, "alert");
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "back_btn_test_id"
      );
      expect(buttonComponent).toBeTruthy();
      buttonComponent.simulate("press");
      // const { getByTestId  } = render(<InvoiceBilling {...screenProps} />);
      // fireEvent.press(getByTestId("back_btn_test_id"))

      expect(showAlert).toHaveBeenCalledTimes(1);
      expect(showAlert).toBeCalled();

      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
