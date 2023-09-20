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
const searchResponse = {
  product: [
    {
      id: 626,
      brand_id: null,
      name: null,
      sku: null,
      description: "Chicken Small Breast",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      availability: null,
      stock_qty: null,
      weight: null,
      price: 9,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      created_at: "2023-07-18T11:15:50.712Z",
      updated_at: "2023-07-18T11:15:50.712Z",
      block_qty: null,
      farm_description: null,
      farm_title: null,
      profile_images: null,
      profile_photos: null,
      subUoms: '[{"UOM":"EA","Qty":1,"isDefault":true}]',
      hsnCode: "",
      updatedBy: "Maranatha ",
      status_desc: "Active",
      assetTypeName: "Trading/Finished Goods Item",
      criticality: "",
      entityId: "792",
      itemNo: "27",
      categoryCode: "Chicken.",
      updatedDate: "2023-03-24",
      itemId: "618046",
      manufacture: "",
      uom: "EA",
      assetOrConsumable: "6",
      createdDate: "2023-03-23",
      createdBy: null,
      entityName: "Maranatha",
      barcode: "",
      status: "0",
      category_id: 90,
      productImage: "",
    },
  ],
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
          setCreditDetailModal={jest.fn()}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={() => { } }
          state={{ show_SortingDropdown: true }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = AboutUsBlock.instance() as ExplorePage;

      instance.setState({show_SortingDropdown:true,categories:[{},{}],subcategories:[{},{}]},()=>{
        const { getByTestId } = render(<ExplorePage
          setCreditDetailModal={jest.fn()}
          visible={false}
        setVisibleProfileModal={jest.fn()}
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
     setCreditDetailModal={jest.fn()}
     visible={false}
     setVisibleProfileModal={jest.fn()}
     setState={() => { } }
     state={{ show_SortingDropdown: true }}
     firstTime={false}
     currentUser={""}
     updateCartDetails={() => { } }
     cartDetails={[]}
     {...screenProps}
   />)
      fireEvent(getByTestId('products_list_id'), 'onEndReached');
      fireEvent(getByTestId('products_list_id2'), 'onEndReached');
      fireEvent.press(getByTestId('add_product_test_id'))
      expect(screenProps
        .navigation.navigate).toBeCalledWith('AddProducts')
      fireEvent.press(getByTestId('inventory_test_id'))
      expect(screenProps.navigation.navigate).toBeCalledWith('Inventory');
    })
    then('user trying to search the products with name', () => {
      const searchTextField = AboutUsBlock.findWhere(
        (node) => node.prop("testID") === "productSearch");
      searchTextField.simulate('changeText', 'chicken');
      searchTextField.props().onSubmitEditing();
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        searchResponse
      );
      instance.getSearchProductId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(instance.state.searchText).toBe('chicken');
    });

  });
});
