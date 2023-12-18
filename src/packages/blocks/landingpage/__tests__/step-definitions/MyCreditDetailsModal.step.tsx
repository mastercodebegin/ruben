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
      instance.setState({handleAnimalCutsDropDown:true})
      const animalCutsOptionsListId = ModalBlock.findWhere(
        (node) => node.prop("testID") === "animalCutsOptionsListId"
      );
     const data= animalCutsOptionsListId.renderProp('renderItem')({
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
      animalCutsOptionsListId.renderProp('renderItem')({
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
      animalCutsOptionsListId.renderProp("keyExtractor")({id:0})
    })

    then("user can enter the nearest location", () => {
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
      instance.handleAddressOptionChange(true ,{id:1,attributes:{address:'test'}});
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
