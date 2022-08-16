import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Ordermanagement from "../../src/Ordermanagement";
import OrderDetails from "../../src/OrderDetails";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Ordermanagement"
};

const feature = loadFeature(
  "./__tests__/features/ordermanagement-scenario.web.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ordermanagement", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User loading ordermanagement", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();

      instance = OrderWrapper.instance() as Ordermanagement;

      const getOrdersAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrdersAPI.messageId
      );
      getOrdersAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            id: "34",
            type: "order",
            attributes: {
              id: 34,
              order_number: "OD00000034",
              amount: null,
              account_id: 3,
              coupon_code_id: 1,
              delivery_address_id: null,
              sub_total: "19.99",
              total: "82.59",
              order_items: [
                {
                  id: "33",
                  type: "order_item",
                  attributes: {
                    id: 33,
                    order_id: 34,
                    quantity: 1,
                    unit_price: "19.99",
                    total_price: "19.99",
                    old_unit_price: null,
                    status: "in_cart",
                    catalogue_id: 24,
                    catalogue_variant_id: 24
                  }
                }
              ]
            }
          }
        ]
      });
      instance.getOrdersAPICallId = getOrdersAPI.messageId;
      runEngine.sendMessage("Unit Test", getOrdersAPI);
    });

    when("I navigate to the ordermanagement", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
    });

    then("ordermanagement will load with out errors", () => {
      expect(OrderWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(OrderWrapper).toBeTruthy();
    });
  });

  test("User cancel an order", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to cancel an order", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
    });
    when("I click on cancel order", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({
        activeOrderId: 1,
        activeItemId: 1,
        isCancelVisible: !instance.state.isCancelVisible
      });
      expect(OrderWrapper).toBeTruthy();
    });
    then("I click on yes", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnCancelOrder = OrderWrapper.findWhere(
        node => node.prop("testID") === "yesCancel"
      );
      btnCancelOrder.simulate("press");
      expect(instance.cancelOrderDataRequest()).toBe(true);
      expect(OrderWrapper).toBeTruthy();
    });
    then("Rest Api will return success response", () => {
      const cancelOrderSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cancelOrderSucessRestAPI.messageId
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Order cancelled successfully"
        }
      );
      instance.cancelOrderAPICallId = cancelOrderSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", cancelOrderSucessRestAPI);
    });
  });

  test("User click on an order", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to click an order", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
    });

    when("I click on an order", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      expect(instance.getItemDetailDataRequest(1)).toBe(true);
      expect(OrderWrapper).toBeTruthy();
    });
    then("Rest Api will return success response", () => {
      const orderDetailSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      orderDetailSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        orderDetailSucessRestAPI.messageId
      );
      orderDetailSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "38",
            type: "order_item",
            attributes: {
              id: 38,
              order_id: 39,
              quantity: 1,
              unit_price: "19.99",
              total_price: "19.99",
              order: {
                id: 39,
                order_number: "OD00000039",
                amount: null,
                created_at: "2020-11-04T10:38:55.459Z",
                updated_at: "2020-11-04T11:45:46.720Z"
              },
              catalogue: {
                id: "12",
                type: "catalogue",
                attributes: {
                  tags: [],
                  reviews: [
                    {
                      id: 9,
                      catalogue_id: 12,
                      comment: "",
                      rating: 3,
                      created_at: "2020-11-04T11:27:33.254Z",
                      updated_at: "2020-11-04T11:27:33.254Z",
                      account_id: 3
                    }
                  ]
                }
              }
            }
          }
        }
      );
      instance.getItemDetailAPICallId = orderDetailSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", orderDetailSucessRestAPI);

      expect(OrderWrapper).toBeTruthy();

      let OrderDetailWrapper: ShallowWrapper;
      OrderDetailWrapper = shallow(<OrderDetails {...screenProps} />);
      expect(OrderDetailWrapper).toBeTruthy();
  

      // let detailScreenInstance:OrderDetails;
    });
    then("orderDetails will load with out errors", () => {
      expect(Ordermanagement).toBeTruthy();
    });
  });

  test("User rate an order", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to rate an order", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
    });

    when("I rate an order", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({ starCount: 4, comment: "Awesome product" });
      expect(instance.rateOrderDataRequest(1)).toBe(true);
      expect(OrderWrapper).toBeTruthy();
    });
    then("Rest Api will return success response", () => {
      const rateOrderSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rateOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        rateOrderSucessRestAPI.messageId
      );
      rateOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "12",
            type: "review",
            attributes: {
              id: 12,
              catalogue_id: 24,
              rating: 4,
              comment: "Awesome product",
              created_at: "2020-11-04T13:11:20.184Z",
              updated_at: "2020-11-04T13:11:20.184Z",
              account: {
                activated: true,
                country_code: null,
                email: "danil.kozub@gmail.com",
                first_name: null,
                full_phone_number: "",
                last_name: null,
                phone_number: null,
                type: "EmailAccount",
                created_at: "2020-09-30T08:29:11.544Z",
                updated_at: "2020-09-30T08:29:11.544Z",
                device_id: null,
                unique_auth_id: null
              }
            }
          }
        }
      );
      instance.rateOrderAPICallId = rateOrderSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", rateOrderSucessRestAPI);
    });
  });
});
