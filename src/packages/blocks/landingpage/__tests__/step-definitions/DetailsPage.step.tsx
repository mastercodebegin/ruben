import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import DetailsPage from "../../src/BlogPosts/DetailsPage";
import { render, fireEvent } from "@testing-library/react-native";

const feature = loadFeature(
  "./__tests__/features/DetailsPage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to DetailsPage screen", ({ given, when, then }) => {
    let DetailsPageBlock: any;

    given("I am a User loading DetailsPage", () => {
      DetailsPageBlock = render(
        <DetailsPage
          route={{ params: { type: "image", url: "https://www.test.com" } }}
        />
      );
      expect(DetailsPageBlock).toBeTruthy();
    });
    then("user trying to copy the url", () => {
      const { queryByTestId } = DetailsPageBlock;
      const TouchableOpacity: any = queryByTestId("copy_url_test_id");
      expect(TouchableOpacity).toBeTruthy();
      fireEvent.press(TouchableOpacity);
    });
    then("user trying to access video library", () => {
      const { getByTestId }= render(<DetailsPage
        route={{ params: { type: "video", url: "https://www.test.com" } }}
      />)
      const TouchableOpacity: any = getByTestId("play_video_id");
      expect(TouchableOpacity).toBeTruthy();
      fireEvent.press(TouchableOpacity);
    })
  });
});
