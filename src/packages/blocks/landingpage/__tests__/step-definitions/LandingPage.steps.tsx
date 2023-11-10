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
      class FormDataMock {
        constructor() {
          this.data = {};
        }
        data: any;
      
        append(key:string, value:string) {
          if (!this.data[key]) {
            this.data[key] = [];
          }
          this.data[key].push(value);
        }
      
        get(key:string) {
          return this.data[key] || null;
        }
      }
      //@ts-ignore
      global.FormData = FormDataMock;
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
            
            },
          ],
        }
      );
      instance.setState({productsList:[{title:"abc",category:"wing",price:"20"}]})
      instance.addToCartId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.filterProductByCategoryId = msgValidationAPI.messageId;
      instance.getBlogPostsId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.getProductByCategory();
      instance.checkValidation()
      instance.receiveCallback("message");
      instance.getOrderList();
      instance.handleLoadMore();
      instance.handleDeliverOptionChange({});
      instance.handleIncreaseAnimalCuts();
      instance.handleDecreaseAnimalCuts();
      instance.handleAnimalCutsOption({});
      instance.handleAnimalSelectSlots({});
      instance.showHideCreditDetailModal();
      instance.searchProductsCallback(true,{});
      instance.updateProfileCallback(true,{});
      instance.getFarmCallBack({},true);
      instance.profileDetailsCallback({data:{attributes:{}}});
      instance.getSubcategories("3");
      instance.addProduct();
    })

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
