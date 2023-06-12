import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import Inventory from "../../src/Inventory/Inventory";
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

const feature = loadFeature("./__tests__/features/Inventory-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Inventory", ({ given, when, then }) => {
    let InventoryBlock: any;
    given("I am a User loading Inventory", () => {
      InventoryBlock = render(
        <Inventory
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{}}
          firstTime={false}
          currentUser="user"
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      expect(InventoryBlock).toBeTruthy();
    });
    then("user searching with product name", () => {
      const { queryByTestId } = InventoryBlock;
      const input: any = queryByTestId("search_product_id");
      fireEvent.changeText(input, "beef");
      expect(input.props.value).toBe("beef");
    });
  });
});
