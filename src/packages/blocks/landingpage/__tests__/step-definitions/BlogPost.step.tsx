import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import BlogPost from "../../src/BlogPosts/BlogPost";
import { render } from "@testing-library/react-native";

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
  "./__tests__/features/BlogPost-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to Blog post screen", ({ given, when, then }) => {
    let AboutUsBlock;

    given("I am a User loading Blog posts", () => {
      AboutUsBlock = render(
        <BlogPost
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
  });
});
