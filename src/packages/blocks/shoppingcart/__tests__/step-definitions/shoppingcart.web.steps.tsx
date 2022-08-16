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
import ShoppingCartOrders from '../../src/ShoppingCartOrders.web'
import AddShoppingCartOrderItem from '../../src/AddShoppingCartOrderItem.web'

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

const feature = loadFeature('./__tests__/features/shoppingcartweb-scenario.feature')

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
      instance.setState({ orderList: testOrderData })
    })

    then('I can click the button', () => {
      let buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'showOrderItems'
      )
      buttonComponent.simulate('click')

      instance.setState({ orderItems: testOrderItems })
      instance.setState({ isVisible: true })

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'deleteOrderItem'
      )
      buttonComponent.simulate('click')

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'closeModal'
      )
      buttonComponent.simulate('click')

      instance.setState({ isVisible: false })

      buttonComponent = ShoppingCartOrdersWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnNavigateToAddOrderItem'
      )
      buttonComponent.simulate('click')

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
        node => node.prop('data-test-id') === 'inputQuantity'
      )
      textInputComponent.simulate('change', {
        target: { value: '1' }
      })

      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnTaxable'
      )
      buttonComponent.simulate('click', true)

      textInputComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'inputTaxableValue'
      )
      textInputComponent.simulate('change', {
        target: { value: '1' }
      })
    })

    then('I can click the button', () => {
      let buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnNavigateToShoppingCartOrders'
      )
      buttonComponent.simulate('click')

      buttonComponent = AddShoppingCartOrderItemWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnAddOrderItem'
      )
      buttonComponent.simulate('click')

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
