import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {ExplorePage} from "../../src/ExploreStore/ExplorePage";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import {render,fireEvent} from "@testing-library/react-native";

const configJSON = require("../../src/config");

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature("./__tests__/features/explore-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to about us screen", ({ given, when, then }) => {
    let AboutUsBlock: ShallowWrapper;
    let instance: ExplorePage;

    given("users loading about us screen", () => {
      AboutUsBlock = shallow(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{show_SortingDropdown:true}}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = AboutUsBlock.instance() as ExplorePage;

      instance.setState({show_SortingDropdown:true,categories:[{},{}],subcategories:[{},{}]},()=>{
        const {getByTestId} =render(<ExplorePage  visible={false}
            setVisibleProfileModal={function(): void {
              throw new Error("Function not implemented.");
            }}
            setState={() => {}}
            state={{}}
            firstTime={false}
            currentUser={"user"}
            updateCartDetails={() => {}}
            cartDetails={[{}]} {...screenProps}/>)
            const btn = getByTestId('0selectFilter')
            const closBtn = getByTestId('closeDropdown')
            fireEvent.press(btn);
            fireEvent.press(closBtn);
            fireEvent(getByTestId('termsCondsList'), 'onEndReached');
      })

      const wrapper= shallow(instance.renderItem({item:{},index:1}))
      const touchableOpacity = wrapper.findWhere(
       (node) => node.prop("testID") === "1selectedSubscategory")
       touchableOpacity.simulate("press");

    });

    then('user can see the categories and sub categories',()=>{
   const {getByTestId}=  render( <ExplorePage
        visible={false}
        setVisibleProfileModal={function(): void {
          throw new Error("Function not implemented.");
        }}
        setState={() => {}}
        state={{show_SortingDropdown:true}}
        firstTime={false}
        currentUser={""}
        updateCartDetails={() => {}}
        cartDetails={[]}
        {...screenProps}
      />)
      fireEvent.press(getByTestId('add_product_test_id'))
      expect(screenProps
        .navigation.navigate).toBeCalledWith('AddProducts')
      fireEvent.press(getByTestId('inventory_test_id'))
      expect(screenProps.navigation.navigate).toBeCalledWith('Inventory');
    })


  });
});
