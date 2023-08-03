import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import LandingPage from "../../src/LandingPage";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
const navigation = {
  navigate: jest.fn(),
  reset:jest.fn()
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
};

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to LandingPage", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;

    given("I am a User loading LandingPage", () => {
      landingPageBlock = shallow(
        <LandingPage
          setCreditDetailModal={jest.fn()}
          updateCartDetails={jest.fn()}
          cartDetails={[]}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={undefined}
          state={{
            profileImage: 'dfghjk',
            name:'name56'
          }}
          firstTime={false}
          currentUser={"user"}
          route={undefined}
          {...screenProps}
        />
      );
    });

    when("I navigate to the LandingPage", () => {
      instance = landingPageBlock.instance() as LandingPage;
      instance.goToLandingPage()
      instance.goToHome()
      instance.goToMyCreditsScreen()
      instance.aboutusCallback({},false)
    });

    then("LandingPage will load with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });
    then("I can see the blog posts on landingPage", () => {
      instance.setState({ imageBlogList: [{}] });
      instance.addToCart(20);
      instance.addProduct();
      instance.forceUpdate();
      instance.AddToFavorites(20);
      instance.addProduct();
      
    });

    then("user pressing add to cart button",()=>{
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
          data: [
            {
              email_validation_regexp:
                "^[a-zA-Z0-9.!\\#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
              password_validation_regexp:
                "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
              password_validation_rules:
                "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_).",
            },
          ],
        }
      );
      instance.addToCartId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.addToCartCallBack(
        {
          data: {
            id: "100",
            type: "order",
            attributes: {
              status: "scheduled",
              total_fees: null,
              total_items: null,
              total_tax: null,
              customer: {
                data: {
                  id: "940",
                  type: "account",
                  attributes: {
                    activated: true,
                    country_code: null,
                    email: "incresas56es@gmail.com",
                    first_name: null,
                    full_phone_number: "",
                    last_name: null,
                    phone_number: null,
                    type: "EmailAccount",
                    created_at: "2023-06-21T07:09:51.496Z",
                    updated_at: "2023-06-21T07:09:51.496Z",
                    device_id: null,
                    unique_auth_id: "55ajc8U3xLi6HUPgyc2l6wtt",
                  },
                },
              },
              address: {
                data: null,
              },
              subtotal: ["93.0"],
              order_items: {
                data: [
                  {
                    id: "233",
                    type: "order_item",
                    attributes: {
                      price: 93.0,
                      quantity: 1,
                      taxable: true,
                      taxable_value: 0.1233,
                      other_charges: 0.124,
                      delivered_at: "2023-04-21T12:27:59.395Z",
                      catalogue: {
                        data: {
                          id: "21",
                          type: "catalogue",
                          attributes: {
                            category_id: null,
                            brand_id: null,
                            name: "raw",
                            description: "vegetable rice",
                            length: 0.6,
                            breadth: 0.33,
                            height: 0.488,
                            stock_qty: 3,
                            availability: "out_of_stock",
                            weight: "0.44",
                            price: 455.0,
                            on_sale: true,
                            sale_price: "93.0",
                            discount: "344.0",
                            farm_description: null,
                            farm_title: null,
                            subUoms: null,
                            hsnCode: null,
                            updatedBy: null,
                            status_desc: null,
                            assetTypeName: null,
                            entityId: null,
                            itemNo: null,
                            categoryCode: null,
                            updatedDate: null,
                            itemId: null,
                            uom: null,
                            assetOrConsumable: null,
                            createdDate: null,
                            productImage: null,
                            createdBy: null,
                            entityName: null,
                            barcode: null,
                            status: null,
                            images: [],
                            profile_images: [],
                            profile_photos: [],
                            average_rating: 0,
                            catalogue_variants: [],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        false
      );
      instance.checkValidation()
      instance.addToCartCallBack(null,true)
    })

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
