import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ShoppingCartOrders from '../../src/ShoppingCartOrders'
import AddShoppingCartOrderItem from '../../src/AddShoppingCartOrderItem'

export const configJSON = require('../../config.json')
import { _ } from '../../../../framework/src/IBlock'

const screenProps = {
  navigation: {
    navigate: jest.fn()
  },
  id: 'ShoppingCartOrders'
}

const screenPropsForAdd = {
  navigation: {
    navigate: jest.fn()
  },
  id: 'AddShoppingCartOrderItem'
}

const feature = loadFeature('./__tests__/features/shoppingcart-scenario.feature')

const testOrderData = [
  {
    id: 2,
    type: "order",
    attributes: {
      status: "scheduled",
      total_fees: 0.0,
      total_items: 0,
      total_tax: 0.0,
      customer: {
        data: {
          id: 1,
          type: "account",
          attributes: {
            activated: true,
            country_code: null,
            email: "tester@me.com",
            first_name: "test",
            full_phone_number: "",
            last_name: "account",
            phone_number: null,
            type: "EmailAccount",
            created_at: "2022-01-11T15:22:38.266Z",
            updated_at: "2022-01-11T15:22:38.266Z",
            device_id: null,
            unique_auth_id: null
          }
        }
      },
      address: {
        data: null
      },
      order_items: {
        data: []
      }
    }
  }
]

const testOrderItems = [
  {
    id: 1,
    attributes: {
      price: 1,
      quantity: 10,
      taxable: true,
      taxable_value: 1,
      catalogue: {
        data: {
          attributes: {
            name: "catalogue1"
          }
        }
      }
    }
  }
]

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to ShoppingCartOrders', ({ given, when, then }) => {
    let ShoppingCartOrdersWrapper: ShallowWrapper
    let instance: ShoppingCartOrders

    given('I am a User loading ShoppingCartOrders', () => {
      ShoppingCartOrdersWrapper = shallow(<ShoppingCartOrders {...screenProps} />)
    })

    when('I navigate to the ShoppingCartOrders', () => {
      instance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);


      const getFailOrderStatusMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getFailOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getFailOrderStatusMessage.messageId
      );

      instance.getOrdersApiCallId = getFailOrderStatusMessage.messageId;
      runEngine.sendMessage("Unit Test", getFailOrderStatusMessage);
      
      const getOrderStatusMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrderStatusMessage.messageId
      );

      getOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testOrderData,
        }
      );
      instance.getOrdersApiCallId = getOrderStatusMessage.messageId;
      runEngine.sendMessage("Unit Test", getOrderStatusMessage);

      const showOrderStatusMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      showOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        showOrderStatusMessage.messageId
      );

      // showOrderStatusMessage.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     data: testOrderItems,
      //   }
      // );
      instance.showOrderApiCallId = showOrderStatusMessage.messageId;
      runEngine.sendMessage("Unit Test", showOrderStatusMessage)
      
    })

    then('I can click the button', () => {
      let buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('testID') === 'hideKeyboard'
      )
      buttonComponent.simulate('press')

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('testID') === 'showOrderItems'
      )
      buttonComponent.simulate('press')

      instance.setState({ orderItems: testOrderItems })
      instance.setState({ isVisible: true })

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('testID') === 'deleteOrderItem'
      )
      buttonComponent.simulate('press')

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('testID') === 'closeModal'
      )
      buttonComponent.simulate('press')

      instance.setState({ isVisible: false })

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('testID') === 'btnNavigateToAddOrderItem'
      )
      buttonComponent.simulate('press')

      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })

    then('ShoppingCartOrders will load with out errors', () => {
      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(ShoppingCartOrdersWrapper).toBeTruthy()
    })
  })

  test('User navigates to AddShoppingCartOrderItem', ({ given, when, then }) => {
    let AddShoppingCartOrderItemWrapper: ShallowWrapper
    let instance: AddShoppingCartOrderItem

    given('I am a User loading AddShoppingCartOrderItem', () => {
      AddShoppingCartOrderItemWrapper = shallow(<AddShoppingCartOrderItem {...screenPropsForAdd} />)
    })

    when('I navigate to the AddShoppingCartOrderItem', () => {
      instance = AddShoppingCartOrderItemWrapper.instance() as AddShoppingCartOrderItem
    })

    then('I can input the information', () => {
      let textInputComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'inputQuantity'
      )
      textInputComponent.simulate('changeText', '1')

      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'btnTaxable'
      )
      buttonComponent.simulate('changeValue', true)

      textInputComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'inputTaxableValue'
      )
      textInputComponent.simulate('changeText', '1')
    })

    then('I can click the button', () => {
      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'hideKeyboard'
      )
      buttonComponent.simulate('press')

      buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'btnNavigateToShoppingCartOrders'
      )
      buttonComponent.simulate('press')

      buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('testID') === 'btnAddOrderItem'
      )
      buttonComponent.simulate('press')
    })

    then('AddShoppingCartOrderItem will be added with out errors', () => {
      expect(AddShoppingCartOrderItemWrapper).toBeTruthy()
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(AddShoppingCartOrderItemWrapper).toBeTruthy()
    })
  })
})
