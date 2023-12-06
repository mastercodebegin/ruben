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

const filteredList = {
  inventory: {
    data: [
      { id: 1, name: 'Item 1', price: 10.99 },
      { id: 2, name: 'Item 2', price: 20.49 },
      { id: 3, name: 'Item 3', price: 5.99 },
    ]
  }
};

const newFilterList = {
  message: "No Inventory Present"
}

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
      instance.setState({productsList:[{title:"",category:"",price:""}]})
      instance.addProduct();
      instance.addToCart(20);
      instance.forceUpdate();
      instance.setState({productsList:[{category:""}]})
      instance.addProduct();
      instance.setState({productsList:[{price:""}]})
      instance.addProduct();
      instance.filterByCategoryApi("");
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
      instance.videoLibraryCallback({},{})
      instance.getSubcategoryCallback({},{})
      
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
      instance.setState({productsList:[{title:"abc",category:"wing",price:20}],
      animalPortions:[{name:"abc",category:"wing",quantity:20},{name:"abc",category:"wing",quantity:20}]})
      instance.addToCartId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.filterProductByCategoryId = msgValidationAPI.messageId;
      instance.recommendProductApiCallId= msgValidationAPI.messageId;
      // instance.remainingProductApiCallId = msgValidationAPI.messageId;
      // instance.getBlogPostsId =  msgValidationAPI.messageId;
      // instance.getVideoLibraryId = msgValidationAPI.messageId;
      // instance.getBlogPostsId = msgValidationAPI.messageId;
      // instance.getprofileDetailsId== msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.getProductByCategory();
      instance.checkValidation()
      instance.receiveCallback("message");
      instance.getOrderList();
      instance.handleLoadMore();
      instance.handleDeliverOptionChange({});

      instance.handleIncreaseAnimalCuts({id:1},0,1,1);
      instance.handleDecreaseAnimalCuts({id:1,name:'abc',quantity:20},1,4);
      instance.handleAnimalCutsOption('abc',9,9);
      instance.handleAnimalSelectSlots({});
      instance.showHideCreditDetailModal();
      instance.searchProductsCallback(true,{});
      instance.updateProfileCallback(true,{});
      instance.getFarmCallBack({},true);
      instance.profileDetailsCallback({data:{attributes:{}}});
      instance.getSubcategories("3");
      instance.addProduct();
      instance.setNotificationToken();
      instance.filterCategoryCallBack(filteredList);
      instance.filterCategoryCallBack(newFilterList);
      instance.shareProducts(2);
      instance.categoryCallback(null,[])
      instance.updateProfileCallback(null,[])
      instance.getCategory(1,true)
      instance.getCategories()
      instance.farmDetails(true)
      instance.getAboutUs()
      instance.getVideoBlog()
      instance.updateProfileDetails(true)
      instance.getRecommendProduct(true)
      instance.getRemainingProduct()
      instance.getProfileDetails()
      instance.getViewAllProduct(5)
      instance.shareProducts(5)
      instance.getFavorites()
      instance.removeFavListProduct(true)
      instance.getSlotsAndMerchantAddressHandler()
      instance.getUserAddress()
    })

    then("user can see imgBlogPost",()=>{
      const imgBlogPost = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "imgBlogPost"
      );
      imgBlogPost.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            time: 'Monthly'          }
        }, index: 0
      })
      imgBlogPost.renderProp("keyExtractor")({id:0})
      instance.setState({animalPortions:[{name:"abc",category:"wing",quantity:0},{name:"abc",category:"wing",quantity:0}]})

      instance.handleDecreaseAnimalCuts({id:1,name:'abc',quantity:0},1,4);
      instance.handleAnimalCutsOption('abc1',9,9);


    })

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
