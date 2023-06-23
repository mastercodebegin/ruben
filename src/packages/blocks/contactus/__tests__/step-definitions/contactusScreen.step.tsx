import { defineFeature, loadFeature } from "jest-cucumber";
import { ShallowWrapper } from "enzyme";

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
    let ContactUsWrapper;
    // let getByTestId
    given("I am a User loading contactus", () => {
      const { getByTestId } = render(<Contactus {...screenProps} />);
      const nameTextInput = getByTestId("name_test_id");

      fireEvent.changeText(nameTextInput, "test name");
      expect(nameTextInput.props.value).toBe("test name");
      const emailTextInput = getByTestId("email_test_id");
      fireEvent.changeText(emailTextInput, "test@gmail.com");
      expect(emailTextInput.props.value).toBe("test@gmail.com");
      const queryInput = getByTestId("query_test_id");
      fireEvent.changeText(queryInput, "when I receive my order");
      expect(queryInput.props.value).toBe("when I receive my order");
    });
  });
});
