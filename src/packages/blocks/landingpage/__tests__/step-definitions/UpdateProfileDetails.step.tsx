import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UpdateProfileModal from "../../src/MyProfile/UpdateProfileModal";
import { render, fireEvent } from "@testing-library/react-native";

const navigation = {
  navigate: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
};

const feature = loadFeature(
  "./__tests__/features/UpdateProfile-scenario.feature"
);
const simulateTextInput = (testId: string, text: string) => {
  const { queryByTestId } = render(
    <UpdateProfileModal
      setCreditDetailModal={jest.fn()}
      updateCartDetails={jest.fn()}
      cartDetails={[]}
      visible={false}
      setVisibleProfileModal={jest.fn()}
      setState={() => {}}
      firstTime={false}
      currentUser={"user"}
      route={{}}
      state={{
        profileImage: { path: "www.test.com" },
        instagram_link: "https://instagram.com/12",
        whatsapp_link: "https://instagram.com/12",
        facebook_link: "https://instagram.com/12",
        show_loader: true,
        name:'test name',
        email:'test@test.com',
        phone_number:'9898989898',
        about_me:'about me',

      }}
      {...screenProps}
    />
  );
  const input: any = queryByTestId(testId);
  fireEvent.changeText(input, text);
  expect(input.props.value).toBe(text);
};
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
      Linking: {
        openURL: jest.fn((url) => Promise.resolve()),
      },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to update profile screen", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: UpdateProfileModal;

    given("I am a User loading update profile screen", () => {
      landingPageBlock = shallow(
        <UpdateProfileModal
          setCreditDetailModal={jest.fn()}
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          firstTime={false}
          currentUser={"user"}
          route={{}}
          state={{
            profileImage: { path: "www.test.com" },
            instagram_link: "https://instagram.com/12",
            whatsapp_link: "https://instagram.com/12",
            facebook_link: "https://instagram.com/12",
            show_loader: true,
          }}
          {...screenProps}
        />
      );
    });

    when("I navigate to the update profile screen", () => {
      instance = landingPageBlock.instance() as UpdateProfileModal;
      instance.componentDidMount();
    });
    then("user selecting image from storage", () => {
      landingPageBlock = shallow(
        <UpdateProfileModal
          setCreditDetailModal={jest.fn()}
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          firstTime={false}
          currentUser={"user"}
          route={{}}
          state={{
            profileImage: { path: "www.test.com" },
            instagram_link: "https://instagram.com/12",
            whatsapp_link: "https://instagram.com/12",
            facebook_link: "https://instagram.com/12",
            show_loader: true,
          }}
          {...screenProps}
        />
      );
      let instance = landingPageBlock.instance() as UpdateProfileModal;
      instance.forceUpdate();

      const touchableOpacity = landingPageBlock.find(
        '[testID="select_image_from_storage_id"]'
      );
      touchableOpacity.simulate("press");
    });
    then("user filling all the text fields", () => {
      simulateTextInput("name_test_id", "test name");
      simulateTextInput("email_test_id", "test@test.com");
      simulateTextInput("phone_number_test_id", "9898989898");
      simulateTextInput("about_me_test_id", "about me");
      simulateTextInput("instagram_test_id", "https://instagram.com/12");
      simulateTextInput("whatsapp_test_id", "https://instagram.com/12");
      simulateTextInput("facebook_test_id", "https://instagram.com/12");
    });
    then("user saving al the details", () => {
      landingPageBlock = shallow(
        <UpdateProfileModal
          setCreditDetailModal={jest.fn()}
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          firstTime={false}
          currentUser={"user"}
          route={{}}
          state={{
            profileImage: { path: "www.test.com" },
            instagram_link: "https://instagram.com/12",
            whatsapp_link: "https://instagram.com/12",
            facebook_link: "https://instagram.com/12",
            show_loader: true,
          }}
          {...screenProps}
        />
      );
      const touchableOpacity = landingPageBlock.find(
        '[testID="save_details_id"]'
      );
      touchableOpacity.simulate("press");
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
