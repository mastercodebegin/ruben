import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import MyCreditDetailsModal from "../../src/MyCredits/MyCreditDetailsModal";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature(
  "./__tests__/features/MyCreditDetailsModal-scenario.feature"
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

  test("Modal visible to MyCreditDetailsModal", ({ given, when, then }) => {
    let ModalBlock: ShallowWrapper;
    let instance: MyCreditDetailsModal;
    given("MyCreditDetailsModal component", () => {
        ModalBlock = shallow(
            //@ts-ignore
        <MyCreditDetailsModal
                visible={false} />
      );
      instance = ModalBlock.instance() as MyCreditDetailsModal;
    });

    then("user can change handleAddressOptionChange", () => {
      instance.handleAddressOptionChange(true ,{id:1,attributes:{address:'test'}});
      const productList = ModalBlock.findWhere(
        (node) => node.prop("testID") === "deliverOption"
      );
      instance.setState({setDeliverOption:""})         
      productList.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
      productList.renderProp("keyExtractor")({id:0})
     
    })

    then("user can click on handleAnimatCuts", () => {
      const animalCutsDropDown = ModalBlock.findWhere(
        (node) => node.prop("testID") === "animalCutsDropDown"
      );
      animalCutsDropDown.simulate('press')

      const animalCutsOptionsListId = ModalBlock.findWhere(
        (node) => node.prop("testID") === "animalCutsOptionsListId"
      );
     const data = animalCutsOptionsListId.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            duration: 'Monthly',
            currency: 'USD',
            amount: '250',
            plan_name: 'Monthly'
          }
        }, index: 0
      })
            let handleAnimatCuts = data.findWhere((node) => node.prop('testID') === "handleAnimatCuts");

            handleAnimatCuts.simulate('press')
    });

    then("user can click on animalCutsDropDown", () => {
      let animalCutsDropDown = ModalBlock.findWhere((node) => node.prop('testID') === "animalCutsDropDown");
      animalCutsDropDown.simulate('press')
    });


    then("list of animalCutsOptionsListId", () => {
      instance.handleAddressOptionChange(false ,{id:1,attributes:{address:'test'}});
      const animalCutsOptionsListId = ModalBlock.findWhere(
        (node) => node.prop("testID") === "animalCutsOptionsListId"
      );
      // animalCutsOptionsListId.renderProp('renderItem')({
      //   item: {
      //     id: 2,
      //     attributes: {
      //       id: 2,
      //       duration: 'Monthly',
      //       currency: 'USD',
      //       amount: '250',
      //       plan_name: 'Monthly'
      //     }
      //   }, index: 0
      // })
      // animalCutsOptionsListId.renderProp("keyExtractor")({id:0})
    })

    then("user can enter the nearest location", () => {
      instance.getProductByCategory();
      instance.receiveCallback("message");
      instance.getOrderList();
      instance.handleLoadMore();
      instance.handleDeliverOptionChange({});

      instance.handleIncreaseAnimalCuts({id:1},0,1,1);
      //instance.handleDecreaseAnimalCuts({id:1,name:'abc',quantity:20},1,4);
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
      instance.getRemainingProduct(9)
      instance.getProfileDetails()
      instance.getViewAllProduct(5)
      instance.shareProducts(5)
      instance.getFavorites()
      instance.removeFavListProduct(true)
      instance.getSlotsAndMerchantAddressHandler()
      instance.getUserAddress()
      // instance.setState({animalPortions:[{id:1,name:'test','quantity':6}]})
      // instance.handleIncreaseAnimalCuts(0,0,80,9)
      let name_test_id = ModalBlock.findWhere((node) => node.prop('testID') === 'name_test_id');
      instance.setState({nearestLocation:""})
      name_test_id.simulate('changeText', 'hello@aol.com');
    });
  
    then("user can click on address_change", () => {
instance.setState({setDeliverOption:'Shipping'})
      let addressFlatList = ModalBlock.findWhere((node) => node.prop('testID') === "addressFlatList");
      const data=addressFlatList.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            time: 'Monthly'          }
        }, index: 0
      })
      let address_change = data.findWhere((node) => node.prop('testID') === "address_change");
      address_change.simulate('press')
    });

    then("list of avaialbleSlots", () => {
      instance.setState({setDeliverOption:'Pickup'})
      //instance.handleAddressOptionChange(true ,{id:1,attributes:{address:'test'}});
      const avaialbleSlots = ModalBlock.findWhere(
        (node) => node.prop("testID") === "avaialbleSlots"
      );
      avaialbleSlots.renderProp('renderItem')({
        item: {
          id: 2,
          attributes: {
            id: 2,
            time: 'Monthly'          }
        }, index: 0
      })
      avaialbleSlots.renderProp("keyExtractor")({id:0})
    })
  });
});
