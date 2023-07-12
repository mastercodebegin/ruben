import { defineFeature, loadFeature } from "jest-cucumber"
import React from "react";
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import StripeIntegration from "../../src/StripeIntegration"
import { cardNumberFormatter } from "../../src/StripeIntegration";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "StripeIntegration"
}

const feature = loadFeature('./__tests__/features/StripeIntegration-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({
            Platform: { OS: "web" },
            nativeModule: {},
        }));
    });

    test('User navigates to StripeIntegration', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: StripeIntegration;

        given('I am a User loading StripeIntegration', () => {
            exampleBlockA = shallow(<StripeIntegration {...screenProps} />);
        });

        when('I navigate to the StripeIntegration', () => {
            instance = exampleBlockA.instance() as StripeIntegration
        });

        then('StripeIntegration will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardNameInput');
            fireEvent.changeText(input, 'Card Holder name');
            expect(input.props.value).toBe('Card Holder name');
        });
        then('I can enter card number', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardNumber');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '4242');
            let formattedCard = cardNumberFormatter("4242", instance.state.cardNumber);
            instance.setState({cardNumber: formattedCard})
            expect(input.props.value).toBe('4242');
            expect(instance.state.cardNumber).toEqual("4242");

        });
        then('I can enter card expirtydate', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardExpiry');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '12/');
            instance.handleExpiryDate("12")
            expect(input.props.value).toBe('12/');
            expect(instance.state.expirtyDate).toEqual("12/");

        });
        then('I can enter cvv', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardCVV');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '123');
            instance.handleCVVTextInput("123")
            expect(input.props.value).toBe('123');
            expect(instance.state.cvv).toEqual("123");

        });

        then('I can select the button with with out errors', () => {

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
