import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import BlogPost from "../../src/BlogPosts/BlogPost";
import BlogPostCard from "../../src/BlogPostCard";
import { render, fireEvent } from "@testing-library/react-native";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "BlogPost",
  route: {},
};

const feature = loadFeature("./__tests__/features/BlogPost-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("@react-navigation/native", () => ({
      useNavigation: jest.fn(() => navigation),
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
    then("user able to see blog posts", () => {
      const { getByTestId } = render(<BlogPostCard item={{}} />);

      fireEvent.press(getByTestId("navigate_to_details_page_test_id"));
    });
  });
});
