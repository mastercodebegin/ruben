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
import PaymentCustomeAlert from "../../src/PaymentCustomeAlert";
import DoubleButton from "../../../../components/src/DoubleButton";
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
            instance = exampleBlockA.instance() as StripeIntegration
            instance.setState({ cardName: "Card Holder name" })
            expect(input.props.value).toBe('Card Holder name');
        });
        then('I can enter card number', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardNumber');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '42424');
            let formattedCard = cardNumberFormatter("42424", instance.state.cardNumber);
            instance.setState({ cardNumber: formattedCard })
            expect(input.props.value).toBe('4242 4');
            expect(instance.state.cardNumber).toEqual("4242 4");

        });
        then('I can enter card expirtydate', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardExpiry');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '12/');
            instance.handleExpiryDate("12")
            expect(input.props.value).toBe('12/');
            expect(instance.state.expirtyDate).toEqual("12/");
            if (instance.state.expirtyDate.length > 2) {
                instance.handleExpirtyMorethan3("12/", "23")
                instance.setState({ expirtyDate: "12/23" })
                expect(instance.state.expirtyDate).toEqual("12/23");
            }

        });
        then('I can enter cvv', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} />);
            const input = getByTestId('cardCVV');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '123');
            instance.handleCVVTextInput("123")
            instance.setState({ cvv: "123" })
            expect(input.props.value).toBe('123');
            expect(instance.state.cvv).toEqual("123");

        });

        then("Payment alert", async () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    {...screenProps}
                />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            instance.setState({ showPaymentAlert: true });
            const imgSource = require('../../../OrderSummary/assets/cart.png');
            console.log("check log instance-->", instance.state.showPaymentAlert)
            const mockCallBack = jest.fn();
            const { queryByTestId } = render(
                <PaymentCustomeAlert
                    visible={true} onpressClose={() => {
                        mockCallBack()
                        console.log("check click event on press")
                       // instance.setState({ showPaymentAlert: false });
                    }} onpressContinue={() => {
                        mockCallBack()
                        instance.setState({ isOrderSuccess: true });
                        instance.setState({ showPaymentAlert: false });
                        if (instance.state.isOrderSuccess) {
                            instance.props.navigation.navigate('InvoiceBilling')
                        }
                    }}
                    customeText={"Payment Failed"} customeDescription={"You earnd a discount coupon code. You can check this out in your profile or Reed Now!"}
                    iconImage={imgSource} isLoading={false} />
            );
            const closeDropdown: any = queryByTestId("paymentAlert");
            instance.setState({ showPaymentAlert: true });
            expect(instance.state.showPaymentAlert).toEqual(true);
            expect(closeDropdown).toBeTruthy();
            fireEvent.press(closeDropdown);
        });

        then("Double button", async () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    {...screenProps}
                />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            const { queryByTestId } = render(
                <DoubleButton button1Label={""} button2Label={""} button1_Onpress={() =>{}} button2_Onpress={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            );
            const closeDropdown: any = queryByTestId("doubleButton");
            instance.setState({ showPaymentLoading: true })
            instance.setState({ customAlertText: "Payment In Process.." });
            expect(instance.state.showPaymentLoading).toEqual(true);
            expect(closeDropdown).toBeTruthy();
            fireEvent.press(closeDropdown);
            
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
