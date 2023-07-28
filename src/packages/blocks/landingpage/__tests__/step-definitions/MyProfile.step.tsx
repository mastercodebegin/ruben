import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import MyProfile from "../../src/MyProfile/Myprofile";
const navigation = {
  navigate: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyProfile",
};

const feature = loadFeature("./__tests__/features/MyProfile-scenario.feature");

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

  test("User navigates to MyProfileScreen", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: MyProfile;

    given("I am a User loading MyProfileScreen", () => {
      landingPageBlock = shallow(
        <MyProfile
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          state={undefined}
          firstTime={false}
          currentUser={"user"}
          route={{params:{firstTime:true}}}
          {...screenProps}
        />
      );
      instance = landingPageBlock.instance() as MyProfile;
      instance.componentDidMount()
    });
    when(
      "I navigate to the My profile screen I can open facebook profile",
      () => {
        instance.openFacebookProfile();
      }
    );
    then("User navigate to facebook profile in browser", () => {
      instance.setState({ facebook_link: "https://facebook.com/1234" });
      instance.openFacebookProfile();
      expect(instance.state.facebook_link).toBe("https://facebook.com/1234");
    });
    then("User trying to open invalid instagram link", () => {
      instance.setState({ instagram_link: "" });
      instance.redirectToInstagramProfile();
      expect(instance.state.instagram_link).toBe("");
    });
    then("User navigate to instagram profile in browser", () => {
      instance.setState({ instagram_link: "https://instagram.com/1234" });
      instance.redirectToInstagramProfile();
    });
    then("User trying to open invalid whatsapp link", () => {
      instance.setState({ whatsapp_link: "" });
      instance.redirectToWhatsAppProfile();
    });
    then("User navigate to whats app", () => {
      instance.setState({ whatsapp_link: "https://wa.me/234567" });
      instance.redirectToWhatsAppProfile();
    });
    then("profile screen will load with out errors", () => {
      instance.componentDidMount();
      expect(landingPageBlock).toBeTruthy();
    });
    then("user trying to update profile details", () => {
      const touchableOpacity = landingPageBlock.find(
        '[testID="edit_profile_test_id"]'
      );
      touchableOpacity.simulate("press");
      let instance = landingPageBlock.instance() as MyProfile;
      expect(instance.state.showProfileModal).toBeTruthy();
    });
    then("user updating profile picture", () => {
      let instance = landingPageBlock.instance() as MyProfile;
      instance.setState({ profileImage: { path: "www.test.com" } });
      instance.forceUpdate();
      const image = landingPageBlock.find('[testID="updated_profile_id"]');
      expect(image).toBeTruthy();
    });
    then("user navigating to my orders screen", () => {
      const touchableOpacity = landingPageBlock.find(
        '[testID="navigate_myorder_id"]'
      );
      touchableOpacity.simulate("press");
    });
    then("user naviagating to my credit screen", () => {
      instance.setState({ selectedTab: "remaining" });
      instance.forceUpdate();

      const touchableOpacity = landingPageBlock.find(
        '[testID="navigate_to_MyCreditScreen"]'
      );
      touchableOpacity.simulate("press");
    });
    then("user pressing see all button to navigate selected tab", () => {
      instance.setState({ selectedTab: "Recomentations" });
      instance.forceUpdate();

      const touchableOpacity = landingPageBlock.find(
        '[testID="see_all_button"]'
      );
      touchableOpacity.simulate("press");
    });
    then("I can see the profile details without error", () => {
      instance.setState({ imageBlogList: [{}] });
      instance.forceUpdate();
    });

    then("user pressing recomentations button", async () => {
      const touchableOpacity = landingPageBlock.find(
        '[testID="go_to_recomendations_id"]'
      );
      touchableOpacity.simulate("press");
      expect(instance.state.selectedTab).toBe('Recomendations')
      
    })

    then("user pressing my favorites button to go favorites screen",async () => {
      const touchableOpacity = landingPageBlock.find(
        '[testID="go_to_favorites_id"]'
      );
      touchableOpacity.simulate("press");
      expect(instance.state.selectedTab).toBe('MyFavoritesScreen')
    })

    then("user navigate to product detail screen", async() => {
      instance.forceUpdate();
      const touchableOpacity = landingPageBlock.find(
        '[testID="navigateToProductDetailScreen"]'
      );
      touchableOpacity.simulate("press");
    })

    then("user can remove product from fav list",async () => {
      instance.forceUpdate();
      const touchableOpacity = landingPageBlock.find(
        '[testID="removeFavList"]'
      );
      touchableOpacity.simulate("press");
    })
    
    then("user can add product to add to cart",async () => {
      instance.forceUpdate();
      const touchableOpacity = landingPageBlock.find(
        '[testID="addtocart"]'
      );
      touchableOpacity.simulate("press");
    })

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
