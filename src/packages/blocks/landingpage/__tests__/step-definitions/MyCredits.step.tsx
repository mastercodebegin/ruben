import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import MyCredits from "../../src/MyCredits/MyCredits";
import MyCreditsModal from "../../src/MyCredits/MyCreditDetailsModal";
import { render } from "@testing-library/react-native";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyCredits",
  route: {},
};

const feature = loadFeature("./__tests__/features/Mycredits-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to My credits screen", ({ given, when, then }) => {
    let SettingsBlock;
    given("users loading My credits screen", () => {
      SettingsBlock = render(<MyCredits {...screenProps} />);
      expect(SettingsBlock).toBeTruthy();
    });

    then("user can see my credits modal", () => {
      const MycreditsModal = render(<MyCreditsModal />);
      expect(MycreditsModal).toBeTruthy();
    });
  });
});
