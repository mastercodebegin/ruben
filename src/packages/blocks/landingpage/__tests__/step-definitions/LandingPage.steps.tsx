import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import LandingPage from "../../src/LandingPage";
const navigation = {
  navigate: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
};

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;

    given("I am a User loading LandingPage", () => {
      landingPageBlock = shallow(
        <LandingPage
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={undefined}
          state={undefined}
          firstTime={false}
          currentUser={"user"}
          route={undefined}
          {...screenProps}
        />
      );
    });

    when("I navigate to the LandingPage", () => {
      instance = landingPageBlock.instance() as LandingPage;
    });

    then("LandingPage will load with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });
    then("I can see the blog posts on landingPage", () => {
      instance.setState({ imageBlogList: [{}] });
      instance.forceUpdate();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
