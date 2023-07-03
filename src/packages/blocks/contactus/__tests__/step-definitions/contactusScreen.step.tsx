import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "../../../../framework/src/Helpers";
import Contactus from "../../src/ContactusScreen";
const navigation = require("react-navigation");
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: navigation,
  id: "Contactus",
};

const feature = loadFeature(
  "./__tests__/features/contactusScreen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    given("I am a User loading contactus", async () => {
      render(<Contactus {...screenProps} />);
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
    then("user trying submit the query", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      fireEvent.press(getByTestId("submit_query_test_id"));
    });
  });
});
