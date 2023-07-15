import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "../../../../framework/src/Helpers";
import Contactus from "../../src/ContactusScreen";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { shallow } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((_, callback) => callback()),
  },
  id: "Contactus",
};

const feature = loadFeature(
  "./__tests__/features/contactusScreen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    given("I am a User loading contactus", async () => {
      let mobileAccountLogInWrapper = shallow(<Contactus {...screenProps} />);
      let instance = mobileAccountLogInWrapper.instance() as Contactus;

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
          data: {
            name: "Jai",
            email: "abc@gamil.com",
            phone_number: "",
            description: "I have one query",
          },
        }
      );
      instance.addContactApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(screenProps.navigation.addListener).toBeCalled();
    });
    then("user entering name", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      const nameTextInput = getByTestId("name_test_id");

      fireEvent.changeText(nameTextInput, "test name");
      expect(nameTextInput.props.value).toBe("test name");
    });
    then("user entering email address", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      const emailTextInput = getByTestId("email_test_id");
      fireEvent.changeText(emailTextInput, "test@gmail.com");
      expect(emailTextInput.props.value).toBe("test@gmail.com");
    });
    then("user entering query", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      const queryInput = getByTestId("query_test_id");
      fireEvent.changeText(queryInput, "when I receive my order");
      expect(queryInput.props.value).toBe("when I receive my order");
    });
    then("user trying submit the query with invalid email address", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.changeText(getByTestId("email_test_id"), "testgmail.com");
      fireEvent.changeText(
        getByTestId("query_test_id"),
        "when I receive my order"
      );
      fireEvent.changeText(getByTestId("name_test_id"), "test name");
      fireEvent.press(getByTestId("submit_query_test_id"));
    });
    then("user trying to contact through email", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.press(getByTestId("open_email_test_id"));
      const specificView = getByTestId('open_email_test_id');
      expect(specificView).toBeDefined();
    });
    then("user trying to contact through instagram", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.press(getByTestId("open_instagram_test_id"));
      const specificView = getByTestId('open_instagram_test_id');
      expect(specificView).toBeDefined();
    })
    then("user trying to contact through website", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.press(getByTestId("open_web_test_id"));
      const specificView = getByTestId('open_web_test_id');
      expect(specificView).toBeDefined();
    })
    then("user trying submit the query", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.press(getByTestId("submit_query_test_id"));
    });
  });
});
