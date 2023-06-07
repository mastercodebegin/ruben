import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import OrdersScreen from "../../src/OrdersScreen/OrdersScreen";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature("./__tests__/features/Orders-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("../../../../components/src/utils", () => ({
      store: {
        getState: jest.fn(() => ({
          currentUser: "user",
        })),
        dispatch: jest.fn(),
      },
    }));
  });

  test("User navigates to orders screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;

    given("users loading orders screen", () => {
      SettingsBlock = shallow(
        <OrdersScreen
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
    });
  });
});
