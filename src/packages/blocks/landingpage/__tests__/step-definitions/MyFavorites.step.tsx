import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import MyFavorites from "../../src/MyFavorites/MyFavorites";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { render } from "@testing-library/react-native";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyFavorites",
  route: {},
};
const favoritesMockedRes = {
  id: "RestAPIResponceMessage",
  properties: {
    RestAPIResponceDataMessage: "a2527c01-1ccc-4fd4-b0c8-cca1890f8cdc",
    RestAPIResponceSuccessMessage: {
      data: [
        {
          id: "93",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: { data: null },
            created_at: "2023-05-05T12:34:48.713Z",
            updated_at: "2023-05-05T12:34:48.713Z",
          },
        },
        {
          id: "94",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: { data: null },
            created_at: "2023-05-05T12:35:59.686Z",
            updated_at: "2023-05-05T12:35:59.686Z",
          },
        },
        {
          id: "188",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: {
              data: {
                id: "10",
                type: "catalogue",
                attributes: {
                  category_id: 1,
                  brand_id: null,
                  tags: [],
                  reviews: [],
                  name: "raw",
                  sku: "vrj",
                  description: "vr",
                  manufacture_date: "2023-07-09T00:00:00.000Z",
                  length: 0.8,
                  breadth: 0.33,
                  height: 0.488,
                  stock_qty: 3,
                  availability: "out_of_stock",
                  weight: "0.44",
                  price: 455,
                  recommended: true,
                  on_sale: true,
                  sale_price: "93.0",
                  discount: "344.0",
                  farm_description: null,
                  farm_title: null,
                  images: [],
                  profile_images: [],
                  profile_photos: [],
                  average_rating: 0,
                  catalogue_variants: [],
                },
              },
            },
            created_at: "2023-05-18T10:35:13.353Z",
            updated_at: "2023-05-18T10:35:13.353Z",
          },
        },
        {
          id: "118",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: {
              data: {
                id: "7",
                type: "catalogue",
                attributes: {
                  category_id: 6,
                  brand_id: null,
                  tags: [],
                  reviews: [],
                  name: "raw",
                  sku: "vrj",
                  description: "vr",
                  manufacture_date: "2023-07-09T00:00:00.000Z",
                  length: 0.8,
                  breadth: 0.33,
                  height: 0.488,
                  stock_qty: 3,
                  availability: "out_of_stock",
                  weight: "0.44",
                  price: 455,
                  recommended: true,
                  on_sale: true,
                  sale_price: "93.0",
                  discount: "344.0",
                  farm_description: null,
                  farm_title: null,
                  images: [],
                  profile_images: [],
                  profile_photos: [],
                  average_rating: 0,
                  catalogue_variants: [],
                },
              },
            },
            created_at: "2023-05-08T08:41:05.645Z",
            updated_at: "2023-05-08T08:41:05.645Z",
          },
        },
        {
          id: "122",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: {
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
                  price: 455,
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
            },
            created_at: "2023-05-08T09:51:11.057Z",
            updated_at: "2023-05-08T09:51:11.057Z",
          },
        },
      ],
    },
  },
  messageId: "3923c6be-6ebf-409a-a4b4-f8d25111bb6d",
};

const feature = loadFeature(
  "./__tests__/features/MyFavorites-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("../../../../components/src/utils", () => ({
      store: {
        getState: jest.fn(() => ({
          currentUser: "user",
        })),
        dispatch: jest.fn(),
      },
    }));
  });

  test("User navigates to About us screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: MyFavorites;

    given("users loading About us screen", () => {
      SettingsBlock = shallow(<MyFavorites {...screenProps} />);
      instance = SettingsBlock.instance() as MyFavorites;
      instance.componentDidMount();
    });
    then("user can see the favorite products list", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        favoritesMockedRes
      );
      instance.getFavoritesId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.forceUpdate();
      const MyFavoritesRender = render(<MyFavorites {...screenProps} />)
      expect(MyFavoritesRender).toBeTruthy()
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(SettingsBlock).toBeTruthy();
    });
  });
});
