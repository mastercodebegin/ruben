import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow } from "enzyme";
import { ExplorePage } from "../../src/ExploreStore/ExplorePage";
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

const feature = loadFeature(
  "./__tests__/features/ExplorePage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to ExplorePage", ({ given, when, then }) => {
    let ExploreBlock;

    given("I am a User loading ExplorePage", () => {
      ExploreBlock = render(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{ selectedSub: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
    then("render flatlist", () => {
      render(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{ subcategories: [{}, {}], categories: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
  });
});
