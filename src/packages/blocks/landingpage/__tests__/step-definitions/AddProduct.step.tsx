import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import AddProduct from "../../src/AddProducts/AddProduct";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Dropdown } from "../../../../components/src/DropDown/src";
import { render, fireEvent } from "@testing-library/react-native";
import { Text, View } from "react-native";

const configJSON = require("../../src/config");

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "AddProduct",
  route: {},
};

const feature = loadFeature("./__tests__/features/AddProduct-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("../../../../components/src/ShowToast", () => ({
      showToast: jest.fn(),
    }));
    jest.doMock("@react-navigation/native", () => ({
        useNavigation: jest.fn(() => navigation),
      }));
  });

  test("User navigates to add product screen", ({ given, when, then }) => {
    let AddProductBlock: ShallowWrapper;
    let instance: AddProduct;

    given("users loading add product screen", () => {
        AddProductBlock = shallow(
        <AddProduct
          setCreditDetailModal={jest.fn()}
          visible={false}
          setVisibleProfileModal={jest.fn()}
          setState={() => {}}
          state={{}}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = AddProductBlock.instance() as AddProduct;
      instance.componentDidMount();
      instance.setState({ show_loader: true });

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAddProduct
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "9",
              type: "content",
              attributes: {
                id: 9,
                title: "some content",
                description: "some descripiton",
                created_at: "2023-04-19T11:38:41.811Z",
                updated_at: "2023-04-19T11:38:41.865Z",
                photo: {
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3841748f0d85a371a9a7c97a5b36ecb6dfe4ec80/icons8-image-100.png",
                },
              },
            },
          ],
        }
      );
      instance.getAddProductId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("load dropdown", () => {
        var categoryList: Array<object> = [
          {
            title: "Cow",
            id: 0,
          },
          {
            title: "Fish",
            id: 1,
          },
          {
            title: "Beer",
            id: 2,
          },
          {
            title: "Dog",
            id: 3,
          },
        ];
        const { getByTestId, queryByTestId } = render(
            //@ts-ignore
          <View testID="dropdown-wrapper">
            <Dropdown
              data={categoryList}
              maxHeight={400}
              placeholder="Cow"
              onChange={(item: any) => { }}
              renderItem={(item: any) => {
                return (
                  <View>
                    <Text>{item?.title}</Text>
                  </View>
                );
              }}
              value={categoryList}
            />
          </View>
        );
        expect(getByTestId("dropdown-wrapper")).toBeTruthy();
      });
      
    then("goBack navigation",()=>{
        let btn = AddProductBlock.findWhere((node) => node.prop('testID') === "goBack");
        btn.simulate('press')
    });
    then("add More Products",()=>{
        let btn = AddProductBlock.findWhere((node) => node.prop('testID') === "addMore");
        btn.simulate('press')
    });
    then('users can see available product list', () => {
        const productList = AddProductBlock.findWhere(
            (node) => node.prop("testID") === "Product_list_id"
          );          
           const productsList= [
              { id: 1, name: 'Product 1' },
              { id: 2, name: 'Product 2' },
            ];
          instance.setState({productsList:productsList})
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
      });
  });
});
