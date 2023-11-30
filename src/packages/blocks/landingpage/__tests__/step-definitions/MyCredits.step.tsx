import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import MyCredits from "../../src/MyCredits/MyCredits";
import Modal from "../../src/MyCredits/MyCreditDetailsModal";
import { render } from "@testing-library/react-native";
import { ShallowWrapper, shallow } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { configJSON } from "../../src/LandingPageController";
import { runEngine } from "../../../../framework/src/RunEngine";


const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyCredits",
  route: {},
};

const feature = loadFeature("./__tests__/features/Mycredits-scenario.feature");

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

  test("User navigates to My credits screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: MyCredits;
    given("users loading My credits screen", () => {
    //   SettingsBlock = render(<MyCredits visible={false} setVisibleProfileModal={function (): void {
    //     throw new Error("Function not implemented.");
    //   }} setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
    //     throw new Error("Function not implemented.");
    //   }} cartDetails={[]} setCreditDetailModal={function (): void {
    //     throw new Error("Function not implemented.");
    //   }} {...screenProps} />);
    //   expect(SettingsBlock).toBeTruthy();
    // });
    SettingsBlock = shallow(
      <MyCredits
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
    instance = SettingsBlock.instance() as MyCredits;
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
            "id": "96",
            "type": "category",
            "attributes": {
                "id": 96,
                "name": "Chuck Eye Steak",
                "icon": null,
                "enable": true,
                "rank": null,
                "created_at": "2023-05-23T05:49:09.383Z",
                "updated_at": "2023-10-11T14:29:43.802Z",
                "statusDescription": true,
                "categoryImage": null,
                "description": "Chuck Eye Steak",
                "categoryCode": null,
                "categoryId": 33208,
                "parentId": 33190,
                "status": 0,
                "catalogue": {
                    "catalogues_count": 1,
                    "catalogues": {
                        "data": [
                            {
                                "id": "633",
                                "type": "catalogue",
                                "attributes": {
                                    "category_id": 96,
                                    "brand_id": null,
                                    "name": null,
                                    "description": "Beef, Chuck Eye Steak, 1 Pound Two Steaks",
                                    "length": null,
                                    "breadth": null,
                                    "height": null,
                                    "stock_qty": null,
                                    "recommended": true,
                                    "availability": null,
                                    "weight": null,
                                    "price": 12.0,
                                    "on_sale": null,
                                    "sale_price": null,
                                    "discount": null,
                                    "farm_description": null,
                                    "farm_title": null,
                                    "subUoms": "[{\"UOM\":\"EA\",\"Qty\":1,\"isDefault\":true}]",
                                    "hsnCode": "",
                                    "updatedBy": null,
                                    "status_desc": "Active",
                                    "assetTypeName": "Trading/Finished Goods Item",
                                    "entityId": "792",
                                    "itemNo": "33",
                                    "categoryCode": "Chuck Eye Steak",
                                    "updatedDate": "2023-05-01",
                                    "itemId": "618052",
                                    "uom": "EA",
                                    "assetOrConsumable": "6",
                                    "createdDate": "2023-03-23",
                                    "productImage": "",
                                    "createdBy": null,
                                    "entityName": "Maranatha",
                                    "barcode": "",
                                    "status": "0",
                                    "images": [],
                                    "profile_images": [],
                                    "profile_photos": [],
                                    "average_rating": 0,
                                    "catalogue_variants": []
                                }
                            }
                        ]
                    }
                },
                "selected_sub_categories": null
            }
        },
        ],
      }
    );
    instance.getAddProductId = msgValidationAPI.messageId;
    runEngine.sendMessage("Unit Test", msgValidationAPI);
  });

    then("click on my credit detail modal", () => {
      SettingsBlock = shallow(<MyCredits visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      }} setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      }} cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      }} {...screenProps} />)
      const touchableOpacity = SettingsBlock.find(
        '[testID="detailsModal"]'
      );
      // touchableOpacity.simulate("press");
    })

    then("user can see remaning Products",()=>{
      const productList = SettingsBlock.findWhere(
        (node) => node.prop("testID") === "remaningProduct"
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

  then("user can select value from  drop down",()=>{
          instance.getRemainingProduct()
    // const animalCutsDropDown = SettingsBlock.findWhere(
    //   (node) => node.prop("testID") === "animalCutsDropDown"
    // );   
    // console.log('data====',animalCutsDropDown);
    //console.log('data====',SettingsBlock);
    
    // animalCutsDropDown.simulate('press');

    // const animalCutsOption = SettingsBlock.findWhere(
    //   (node) => node.prop("testID") === "animalCutsOptionsListId"
    // ); 
    // animalCutsOption.renderProp('renderItem')({
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
    // animalCutsOption.renderProp("keyExtractor")({id:0})  
});

    // then("user can see my credits modal", () => {
    //   const MycreditsModal = render(<Modal navigation={undefined} id={""} visible={false} setVisibleProfileModal={function (): void {
    //     throw new Error("Function not implemented.");
    //   }} setState={undefined} state={undefined} firstTime={false} currentUser={""} route={undefined} updateCartDetails={function (data: any): void {
    //     throw new Error("Function not implemented.");
    //   }} cartDetails={[]} setCreditDetailModal={function (): void {
    //     throw new Error("Function not implemented.");
    //   }} />);
    //   expect(MycreditsModal).toBeTruthy();
    // });
  })
});
