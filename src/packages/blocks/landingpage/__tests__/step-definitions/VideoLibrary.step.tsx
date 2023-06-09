import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import Inventory from "../../src/BlogPosts/VideoLibrary";
import { render, fireEvent } from "@testing-library/react-native";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature("./__tests__/features/VideoLibrary-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Video Library screen", ({ given, when, then }) => {
    let InventoryBlock: any;
    given("I am a User loading Video Library screen", () => {
      InventoryBlock = render(
        <Inventory
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{videoLibrary:[{},{}]}}
          firstTime={false}
          currentUser="user"
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      expect(InventoryBlock).toBeTruthy();
    });
  });
});
