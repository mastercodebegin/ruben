import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import OrdersScreen from "../../src/Ordermanagement";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { fireEvent, render } from "@testing-library/react-native";
import RenderItem from '../../src/RenderItem';
import {MyOrderHeader} from '../../src/Header';

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};
const apiResponse = {
  data: [
    {
      attributes: {
        status:"on_going",
        order_items: {
          data: [{
            attributes: {
              address: { data: null },
              bill_to: { data: null },
              created_at: "2023-06-16T07:16:45.912Z",
              customer: { data: [Object] },
              delivered_at: "2023-06-19",
              discount_amount: null,
              order_enable: false,
              order_items: { data: [Array] },
              order_no: null,
              shipping_address: { data: null },
              shipping_charge: null,
              status: "scheduled",
              subtotal: 0,
              total: null,
              total_fees: 0,
              total_items: null,
              total_tax: null,
              updated_at: "2023-06-16T07:16:45.912Z"
            }
           }
          ]}
       
      },
      id: "86",
      type: "order",
    },
  ],
}

const feature = loadFeature("./__tests__/features/ordermanagement-scenario.feature");
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

  test("User navigates to orders screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: OrdersScreen;

    given("users loading orders screen", () => {
      SettingsBlock = shallow(<OrdersScreen {...screenProps} />);
      instance = SettingsBlock.instance() as OrdersScreen;
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        apiResponse
      );
      instance.getIncomingOrdersId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
    then("user pressing previous orders button", () => {
      instance.getPreviousOrders();
      instance.filterWithDate('','','');
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        apiResponse
      );
      instance.getPreviousOrdersId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    })
    then("user trying to accept the order", () => {
      instance.acceptDeclineOrders(1,false)
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        apiResponse
      );
      instance.acceptDeclineOrdersId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);      
    });
    then("user trying to filter the orders with date", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        apiResponse
      );
      instance.filterOrdersWithDateId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      const setOrderNo = jest.fn();
      const searchOrder = jest.fn()
      const props:any = {
        markedDates: {},
        minDate: "",
        navigation: screenProps.navigation,
        onDaySelect: jest.fn(),
        onOpen: jest.fn(),
        onclose: jest.fn(), 
        orderNo: "333",
        searchOrder,
        selected: "previous",
        selectedDay: '',
        setOrderNo,
        setSelected: jest.fn()
      };
      
      const { getByTestId, rerender } = render(
        <MyOrderHeader
          {...props}
        />
      );
      fireEvent.press(getByTestId('incoming_orders_test_id'));
      rerender(
      <MyOrderHeader
        {...{...props,selected:'incoming'}}
      />)
      fireEvent.press(getByTestId('previous_orders_test_id'));
      fireEvent.changeText(getByTestId('search_order_test_id'),'8575');
      expect(setOrderNo).toBeCalledWith('8575');
      fireEvent.press(getByTestId('search_order_button_test_id'));
      fireEvent.press(getByTestId('calendar_test_id'));
      expect(searchOrder).toBeCalledWith('333');
      expect(instance.state.incomingOrders).toBe(apiResponse.data);
    })
    then('users can see available orders list', () => {
      const ordersList = SettingsBlock.find('[testID="orders_list_id"]');
      const props: any = ordersList.props();
      // const { getByTestId } = render(props.ListHeaderComponent)
      ordersList.render();
      instance.setState({ isSearching: true, searchResult: [] });
      ordersList.render();
      // fireEvent.press(getByTestId('incoming_orders_test_id'));
      const data = [null, {}, { attributes: {} }]
      data.forEach((data) => {
        render(<RenderItem item={data} />);
      })
      const increaseBtn = jest.fn();
      const { getByTestId } = render(<RenderItem item={apiResponse.data[0]} acceptDeclineOrders={increaseBtn} selectedTab="incoming" />);
      fireEvent.press(getByTestId('decline_test_id'));
      fireEvent.press(getByTestId('accept_test_id'));
      expect(increaseBtn).toBeCalled()

    });
    then('user selecting date on calendar', () => {
      instance.onDaySelect('03-04-2023');
      expect(instance.state.selectedDate.startDate).toBe('03-04-2023');
      expect(instance.handleCalendarClose()).toBe('no')
      expect(instance.state.selectedDate.endDate).toBe('');
      instance.onDaySelect('05-04-2023');
      expect(instance.state.selectedDate.endDate).toBe('05-04-2023');
      expect(instance.handleCalendarClose()).toBe('yes')
      instance.onCloseCalendar();
      
    })
    then('user trying to search orders with order id', () => {
      instance.searchOrder(123);
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        apiResponse
      );
      instance.searchOrdersWithNumberId = msgValidationAPI.messageId;
      instance.searchOrder(1234);
      instance.setSelected('incoming');
      instance.setSelected('previous');
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(instance.state.searchResult).toBe(apiResponse.data);
    })
  });
});
