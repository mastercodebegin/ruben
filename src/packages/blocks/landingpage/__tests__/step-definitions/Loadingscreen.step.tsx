import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import LoadingScreen from "../../src/LoadingScreen";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
};

const feature = loadFeature(
  "./__tests__/features/LoadingScreen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to loading screen", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LoadingScreen;

    given("I am a User clicking shared url", () => {
      landingPageBlock = shallow(
        <LoadingScreen
          route={{ params: { blog: true, id: 21 } }}
          {...screenProps}
        />
      );
    });

    when("I can see the loader while fetching the details", () => {
      instance = landingPageBlock.instance() as LoadingScreen;
      instance.componentDidMount();
    });
    given("I am a User trying to open blog post using shared url", () => {
      let mobileAccountLogInWrapper = shallow(
        <LoadingScreen
          route={{ params: { blog: true, id: 21 } }}
          {...screenProps}
        />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as LoadingScreen;

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "2",
            type: "post",
            attributes: {
              id: 2,
              name: "new blog post",
              description:
                "Ready to take code sharing to the next level? Xamarin.Forms is an open source mobile UI framework from Microsoft for building iOS, Android, & Windows apps with .NET from a single shared codebase.",
              enable: null,
              account_id: 325,
              created_at: "2 months ago",
              updated_at: "2023-03-27T09:21:55.846Z",
              model_name: "BxBlockPosts::Post",
              images: [
                {
                  id: 479,
                  filename: "close.png",
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDhCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f37bf34d5c999719b0670318b98490169dff3b6d/close.png",
                  type: "image",
                },
              ],
              videos: [],
            },
          },
        }
      );
      instance.getBlogPostId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    given("opening product link", () => {
      let mobileAccountLogInWrapper = shallow(
        <LoadingScreen
          route={{ params: { blog: true, id: 21 } }}
          {...screenProps}
        />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as LoadingScreen;
      instance.getProductDetails(27);
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "27",
            type: "catalogue",
            attributes: {
              category_id: 1,
              brand_id: null,
              tags: [],
              reviews: [],
              name: "chicken briyani",
              sku: "vrj",
              description: "vr",
              manufacture_date: "2023-07-09T00:00:00.000Z",
              length: 0.8,
              breadth: 0.33,
              height: 0.488,
              stock_qty: 3,
              availability: "out_of_stock",
              weight: "0.44",
              price: 455.0,
              recommended: true,
              on_sale: true,
              sale_price: "93.0",
              discount: "344.0",
              farm_description: null,
              farm_title: null,
              images: [
                {
                  id: 510,
                  filename: "facebook.png",
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdjRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e14620b74ecbb2224397ddaa2bfe7b73f9686fc9/facebook.png",
                  type: "image",
                },
              ],
              profile_images: [
                {
                  id: 510,
                  filename: "facebook.png",
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdjRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e14620b74ecbb2224397ddaa2bfe7b73f9686fc9/facebook.png",
                  type: "image",
                },
              ],
              profile_photos: [
                {
                  id: 510,
                  filename: "facebook.png",
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdjRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e14620b74ecbb2224397ddaa2bfe7b73f9686fc9/facebook.png",
                  type: "image",
                },
              ],
              average_rating: 0,
              catalogue_variants: [],
            },
          },
        }
      );
      instance.getProductDetailsId = msgValidationAPI.messageId;
      instance.getVideoLibrary();
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("user opening blog post link", () => {
      landingPageBlock.setProps({
        params: { product: true, id: 21 },
        ...screenProps,
      });
      instance.forceUpdate();
      instance.componentDidMount();
      instance.videoLibraryCallback({},false)
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
