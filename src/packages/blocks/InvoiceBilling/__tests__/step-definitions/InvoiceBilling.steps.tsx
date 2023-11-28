import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import InvoiceBilling from "../../src/InvoiceBilling";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Alert } from "react-native";
import RenderHeader from "../../src/RenderHeader";
import RenderFooter from "../../src/RenderFooter";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "InvoiceBilling",
  route: {
    params: {
      name: "test name",
      subtotal: 90,
      total: 0,
    },
  },
};

const feature = loadFeature(
  "./__tests__/features/InvoiceBilling-scenario.feature"
);

const sampleResponse = {
  attributes: {
    order_items: {
      data: [
        { id: 1, name: 'Product A', price: 20.0 },
        { id: 2, name: 'Product B', price: 15.0 },
      ]
    },
  },
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to InvoiceBilling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am a User loading InvoiceBilling", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
    });

    when("I navigate to the InvoiceBilling", () => {
      instance = exampleBlockA.instance() as InvoiceBilling;
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "cart"
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "371",
            type: "order",
            attributes: {
              status: "on_going",
              total_fees: 18.99,
              total_items: null,
              total_tax: null,
              order_no: 827846771,
              created_at: "2023-08-04T06:21:51.177Z",
              updated_at: "2023-08-04T06:22:53.266Z",
              order_enable: false,
              customer: {
                data: {
                  id: "1299",
                  type: "account",
                  attributes: {
                    activated: true,
                    country_code: null,
                    email: "selvapdf@gmail.com",
                    first_name: null,
                    full_phone_number: "",
                    last_name: null,
                    phone_number: null,
                    type: "EmailAccount",
                    created_at: "2023-08-04T06:20:21.846Z",
                    updated_at: "2023-08-04T06:23:25.208Z",
                    device_id: null,
                    unique_auth_id: "qhPjQEfShuPlBotjht0Yagtt",
                  },
                },
              },
              address: {
                data: {
                  id: "158",
                  type: "address",
                  attributes: {
                    latitude: null,
                    longitude: null,
                    address: "Natalie,\nchennai",
                    address_type: "Office",
                  },
                },
              },
              subtotal: [18.99],
              bill_to: {
                id: 158,
                account_id: 1299,
                address: "Natalie,\nchennai",
                name: "selva",
                flat_no: "27",
                zip_code: "6111112",
                phone_number: "9898989898",
                deleted_at: null,
                latitude: null,
                longitude: null,
                residential: true,
                city: null,
                state_code: null,
                country_code: null,
                state: "TN",
                country: "IND",
                address_line_2: null,
                address_type: "Office",
                address_for: "shipping",
                is_default: true,
                landmark: null,
                created_at: "2023-08-04T06:22:53.257Z",
                updated_at: "2023-08-04T06:22:53.257Z",
              },
              shipping_address: {
                id: 158,
                account_id: 1299,
                address: "Natalie,\nchennai",
                name: "selva",
                flat_no: "27",
                zip_code: "6111112",
                phone_number: "9898989898",
                deleted_at: null,
                latitude: null,
                longitude: null,
                residential: true,
                city: null,
                state_code: null,
                country_code: null,
                state: "TN",
                country: "IND",
                address_line_2: null,
                address_type: "Office",
                address_for: "shipping",
                is_default: true,
                landmark: null,
                created_at: "2023-08-04T06:22:53.257Z",
                updated_at: "2023-08-04T06:22:53.257Z",
              },
              order_items: {
                data: [
                  {
                    id: "1053",
                    type: "order_item",
                    attributes: {
                      price: 18.99,
                      quantity: 1,
                      taxable: true,
                      taxable_value: 0.1233,
                      other_charges: 0.124,
                      delivered_at: "2023-04-21T12:27:59.395Z",
                      payment_type: "card",
                      catalogue: {
                        data: {
                          id: "607",
                          type: "catalogue",
                          attributes: {
                            category_id: 94,
                            brand_id: null,
                            name: null,
                            description: "Beef, Denver Steak, Small(8-12 OZ)",
                            length: null,
                            breadth: null,
                            height: null,
                            stock_qty: null,
                            availability: null,
                            weight: null,
                            price: 18.99,
                            on_sale: null,
                            sale_price: null,
                            discount: null,
                            farm_description: null,
                            farm_title: null,
                            subUoms: '[{"UOM":"EA","Qty":1,"isDefault":true}]',
                            hsnCode: "",
                            updatedBy: "Maranatha ",
                            status_desc: "Active",
                            assetTypeName: "Trading/Finished Goods Item",
                            entityId: "792",
                            itemNo: "1",
                            categoryCode: "Denver Steak",
                            updatedDate: "2023-03-24",
                            itemId: "618020",
                            uom: "EA",
                            assetOrConsumable: "6",
                            createdDate: "2023-03-23",
                            productImage: "",
                            createdBy: null,
                            entityName: "Maranatha",
                            barcode: "",
                            status: "0",
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
        }
      );
      instance.getInvoiceDetailsId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      const termsCondsList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "render_product_list_id"
      );
      termsCondsList.render();
    });

    then("InvoiceBilling will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    then("I can see the invoice", () => {
      const props = {
        billingAddress: {},
        shippingAddress: {},
        deliveryDate: "",
      };
      render(<InvoiceBilling {...screenProps} />);
      render(<RenderHeader {...props} />);
      const propsList = [{},
        { subTotal: 10, total: 10 },
        { params: null, subTotal: 10, total: 10 },
        {
          params: { discount: 20,lifetimeSubscription:20 },
          subTotal: 10, total: 10
        }];
      //discount
      propsList.forEach((item) => {
        render(<RenderFooter {...item} />);
      })
      const { findByText } = render(<RenderFooter {...propsList[3]} />);
      expect(findByText('Sub Total')).toBeTruthy();
    });

    then("I can share the the invoice through mail", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "share_invoice_id"
      );
      expect(buttonComponent).toBeTruthy();
      buttonComponent.simulate("press");
    });
    then("I can download the invoice", async () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "download_invoice_id"
      );
      waitFor(() => {
        buttonComponent.simulate("press");
      });
      expect(instance.state.showLoader).toBe(true);
      instance.setState({ pdfUrl: "file:///user/test/test.pdf" });
      let shareBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "share_invoice_id"
      );
      shareBtn.simulate("press");
      buttonComponent.simulate("press");
      jest.runAllTimers();
    });

    then("I can write function cases", () => {
      instance.doButtonPressed();
      instance.downloadInvoice();
      instance.setEnableField();
      instance.setInputValue("");
      instance.getCartCallBack(sampleResponse);
      instance.btnShowHideProps.onPress();
      instance.btnExampleProps.onPress();
      instance.txtInputWebProps.onChangeText('');
      instance.getCartCallBack([],true);
  });

    then("I can leave the screen with out errors", () => {
      const showAlert = jest.spyOn(Alert, "alert");
      // const { getByTestId } = render(<InvoiceBilling {...screenProps} />);
      // fireEvent.press(getByTestId("back_btn_test_id"));

      // expect(showAlert).toHaveBeenCalledTimes(1);
      // expect(showAlert).toBeCalled();

      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
