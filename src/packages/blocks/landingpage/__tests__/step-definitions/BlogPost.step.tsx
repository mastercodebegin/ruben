import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import BlogPost from "../../src/BlogPosts/BlogPost";
import BlogPostCard from "../../src/BlogPostCard";
import { render, fireEvent } from "@testing-library/react-native";
import {Header} from '../../src/BlogPosts/Header';

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
          setCreditDetailModal={jest.fn()}
          visible={false}
          setVisibleProfileModal={jest.fn()}
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
    then('user navigates to video library screen',()=>{
      const {getByTestId} =render(<Header {...screenProps} />)
      fireEvent.press(getByTestId('navigate_to_video_library_id'))
      expect(screenProps.navigation.navigate).toBeCalledWith("BlogPostStack",{screen:"VideoLibrary"});
      fireEvent.press(getByTestId('navigate_to_blogpost_id'))
      expect(screenProps.navigation.navigate).toBeCalledWith('BlogPostStack',{screen:"BlogPost"});
    })
  });
});
