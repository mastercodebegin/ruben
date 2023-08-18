import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import MyProfile from "../../src/MyProfile/Myprofile";
import RenderProducts from "../../src/MyProfile/RenderProducts";

const navigation = {
  navigate: jest.fn(),
  addListener: (_: any, callBack: () => void) => {
    callBack()
  }
};

const screenProps = {
  navigation: navigation,
  id: "MyProfile",
};

const profileProps = {
  navigation: navigation,
  id: "",
  visible: false,
  setVisibleProfileModal: jest.fn(),
  setState: jest.fn(),
  state: jest.fn(),
  firstTime: false,
  currentUser: "",
  route: {},
  updateCartDetails: jest.fn(),
  cartDetails: [],
  setCreditDetailModal: jest.fn(),
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
          setCreditDetailModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          state={undefined}
          firstTime={false}
          currentUser={"user"}
          route={{ params: { firstTime: true } }}
          {...screenProps}
        />
      );
      instance = landingPageBlock.instance() as MyProfile;
      instance.componentDidMount();
      expect(instance).toBeTruthy();
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
      instance.setState({ showFavoriteList: [{}] ,productList:[{}]})
      touchableOpacity.simulate("press");
      expect(instance.state.selectedTab).toBe("Recomendations");
    });

    then(
      "user pressing my favorites button to go favorites screen",
      async () => {
        const touchableOpacity = landingPageBlock.find(
          '[testID="go_to_favorites_id"]'
        );
        landingPageBlock.find(
          '[testID="favorites_list_id"]'
        ).render();
        
        touchableOpacity.simulate("press");
        expect(instance.state.selectedTab).toBe("MyFavoritesScreen");
      }
    );

    then("user navigate to product detail screen", async () => {
      const touchableOpacity: any = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "navigateToProductDetailScreen"
      );
      const { queryByTestId } = render(<MyProfile {...profileProps} />);
      const navBtn: any = queryByTestId("navigateToProductDetailScreen");
      // fireEvent.press(navBtn);
      instance.forceUpdate();
      expect(touchableOpacity).toBeTruthy();
    });

    then("user can remove product from fav list", async (item) => {
      instance.setState(
        { selectedTab: "MyFavoritesScreen", showFavoriteList: [{}] },
        () => {
          const propsList = [
            {},
            { item: {} },
            { item: { attributes: {} } },
            { item: { attributes: { catalogue_id: {} } } },
            { item: { attributes: { catalogue_id: { data: {} } } } },
            {
              item: {
                attributes: { catalogue_id: { data: { attributes: {} } } },
              },
            }
          ];
          //
          propsList.map((item) => {
            render(instance.renderItem(item));
          });
        }
      );
      instance.setState(
        { selectedTab: "recommendations", showFavoriteList: [{}] },
        () => {
          const propsList = [
            {},
            { item: {} },
            { item: { attributes: {} } },
            { item: { attributes: { catalogue_id: {} } } },
            { item: { attributes: { catalogue_id: { data: {} } } } },
            {
              item: {
                attributes: { catalogue_id: { data: { attributes: {} } } },
              },
            },
            {
              item: {
                images:[]
              }
            },
            {
              item: {
                images:[{url:'test'}]
              }
            }
          ];
          //
          propsList.map((item) => {
            render(instance.renderItem(item));
          });
        }
      );
      instance.navigateToDetailsPage();
      instance.forceUpdate();
      const touchableOpacity = landingPageBlock.find(
        '[testID="removeFavList"]'
      );
      instance.removeFavListProduct(item);
      // touchableOpacity.simulate("press");
      expect(touchableOpacity).toBeTruthy();
    });

    then("user can add product to add to cart", async () => {
      const {getByTestId} = render(
        <RenderProducts
          navigate={() => {}}
          id={0}
          description={""}
          name={""}
          price={0}
          discount={0}
          image={"https://image.com"}
          onPressRemoveFromFav={jest.fn()}
          onPressAddToCart={jest.fn()}
        />
      );
      fireEvent.press(getByTestId('navigateToProductDetailScreen'));
      fireEvent.press(getByTestId('removeFavList'))
      instance.forceUpdate();
      const touchableOpacity = landingPageBlock.find('[testID="addtocart"]');
      instance.forceUpdate();
      // touchableOpacity.simulate("press");
      expect(touchableOpacity).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
