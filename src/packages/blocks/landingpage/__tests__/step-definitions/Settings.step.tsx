import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Settings from "../../src/SettingsTab/Settings";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature("./__tests__/features/Settings-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
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

  test("User navigates to settings screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: Settings;

    given("users loading settings screen", () => {
      SettingsBlock = shallow(
        <Settings
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
      instance = SettingsBlock.instance() as Settings;
      instance.componentDidMount();
    });
    then("User pressing about us button to navigate to about us screen", () => {
      const touchableOpacity = SettingsBlock.find(
        '[testID="about_us_screen_test_id"]'
      );
      touchableOpacity.simulate("press");
      expect(navigation.navigate).toHaveBeenLastCalledWith("AboutUs");
    });
    then(
      "User pressing Analytics Screen button to navigate to Analytics screen",
      () => {
        const touchableOpacity = SettingsBlock.find(
          '[testID="analytics_screen_test_id"]'
        );
        touchableOpacity.simulate("press");
        expect(navigation.navigate).toHaveBeenLastCalledWith("AnalyticsScreen");
      }
    );
    then(
      "User pressing Terms & conditions Screen button to navigate to Terms & conditions screen",
      () => {
        const touchableOpacity = SettingsBlock.find(
          '[testID="terms_and_conditions_screen_test_id"]'
        );
        touchableOpacity.simulate("press");
        expect(navigation.navigate).toHaveBeenLastCalledWith(
          "TermsAndCondition"
        );
      }
    );
    then(
      "User pressing my orders Screen button to navigate to  my orders screen",
      () => {
        const touchableOpacity = SettingsBlock.find(
          '[testID="my_order_test_id"]'
        );
        touchableOpacity.simulate("press");
        expect(navigation.navigate).toHaveBeenLastCalledWith("MyOrdersScreen");
      }
    );

    then("User pressing delete account button", () => {
      const touchableOpacity = SettingsBlock.find(
        '[testID="delete_account_id"]'
      );
      touchableOpacity.simulate("press");
      expect(touchableOpacity).toBeTruthy();
    });
    then("User pressing logout button", () => {
      const touchableOpacity = SettingsBlock.find('[testID="log_out_id"]');
      touchableOpacity.simulate("press");
      expect(touchableOpacity).toBeTruthy();
    });
    then("User pressing cold packaging trigget", () => {
      const touchableOpacity = SettingsBlock.find(
        '[testID="cold_packaging_test_id"]'
      );
      touchableOpacity.simulate("valueChange", true);
      expect(instance.state.coldPackagingFee).toBeTruthy();
    });
    then("User pressing lifetime subscribing trigger", () => {
      const touchableOpacity = SettingsBlock.find(
        '[testID="lifetime_subscription_test_id"]'
      );
      touchableOpacity.simulate("valueChange", true);
      expect(instance.state.coldPackagingFee).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(SettingsBlock).toBeTruthy();
    });
  });
});
