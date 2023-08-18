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
import { State } from "react-native-gesture-handler";
import { flattenProp } from "recompose";
import { Alert } from "react-native";
const navigation = require("react-navigation")
const screenProps = {
    navigation: navigation,
    id: "StripeIntegration",
    goBack: jest.fn(),
    fetch: jest.fn()
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
            exampleBlockA = shallow(<StripeIntegration route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} {...screenProps} />);
        });

        when('I navigate to the StripeIntegration', () => {
            instance = exampleBlockA.instance() as StripeIntegration
        });

        then('StripeIntegration will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then('should return 3.99 for storageClass Gold', () => {
            const mockParams = { storageClass: "Gold" };
            const mockRoute = { params: mockParams };
            const mockProps = { route: mockRoute };
            
            instance = exampleBlockA.instance() as StripeIntegration
            instance.props.route.params.storageClass = "Gold"
            const result = instance.getMeatStorage();
            
            expect(result).toBe(3.99)

            instance.props.route.params.storageClass = "Platinum"
            const result1 = instance.getMeatStorage();
            
            expect(result1).toBe(9.99)

            instance.props.route.params.storageClass = "Basic"
            const result2 = instance.getMeatStorage();
            
            expect(result2).toBe(0.0)

          
            const textTemp = '0123';
            
            instance.handleExpirtyMorethan3(textTemp, "2025");
            
            expect(instance.handleExpirtyMorethan3(textTemp, "2025")).toBeTruthy;
          });
        then("Receive function works properly", () => {
            const successMessage = {
              id: getName(MessageEnum.RestAPIResponceMessage),
              properties: {
                RestAPIResponceDataMessage: "c2d357a3-3706-418f-8190-19cdbd987109",
                RestAPIResponceErrorMessage: "",
              },
              messageId: "1",
              addData: jest.fn(),
              getData: (type: string) => {
                if (type === getName(MessageEnum.RestAPIResponceDataMessage)) {
                  return "1";
                } else if (
                  type === getName(MessageEnum.RestAPIResponceSuccessMessage)
                ) {
                  return {};
                } else {
                  return "";
                }
              },
              initializeFromObject: jest.fn(),
              copyAllPropertiesOf: jest.fn(),
            };
      
            const errorMessage = {
              id: getName(MessageEnum.RestAPIResponceMessage),
              properties: {
                RestAPIResponceDataMessage: "c2d357a3-3706-418f-8190-19cdbd987109",
                RestAPIResponceErrorMessage: "Some error",
              },
              messageId: "1",
              addData: jest.fn(),
              getData: (type: string) => {
                if (type === getName(MessageEnum.RestAPIResponceDataMessage)) {
                  return "1";
                } else if (
                  type === getName(MessageEnum.RestAPIResponceSuccessMessage)
                ) {
                  return {};
                } else {
                  return "Some error";
                }
              },
              initializeFromObject: jest.fn(),
              copyAllPropertiesOf: jest.fn(),
            };
      
            instance.paymentId = "1";
            instance.receive("", successMessage);
            instance.receive("", errorMessage);
      
            instance.paymentId = "";
            instance.codId = "1";
            instance.receive("", successMessage);
            instance.receive("", errorMessage);

          });
        then("paymentMethod api", () => {
            let paymentparam = {
                "order_id": "123",
                "payment_method_id": "abcabcabc"
            }

            instance = exampleBlockA.instance() as StripeIntegration
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                `payment=${paymentparam}`
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [
                        {
                        }
                    ]

                }
            );
            instance.paymentId = msgValidationAPI.messageId;
            runEngine.sendMessage("Unit Test Api", msgValidationAPI);

        });
        then("codMethod api", () => {
            let paymentparam = {
                "order_id": "123",
            }

            instance = exampleBlockA.instance() as StripeIntegration
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                `payment=${paymentparam}`
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [
                        {
                        }
                    ]

                }
            );
            instance.codId = msgValidationAPI.messageId;
            runEngine.sendMessage("Unit Test", msgValidationAPI);
        });
        then("I can select the button with with out errors", () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            instance.setState({ enableField: true });
            instance.btnShowHideProps.onPress()
            expect(instance.state.enableField).toBe(false);

            instance.setEnableField()
            expect(instance.state.enableField).toBe(true);

            instance.txtInputWebProps.onChangeText("abc")
            expect(instance.state.txtInputValue).toBe("abc");

            instance.btnExampleProps.onPress()
            expect(instance).toBeTruthy();


        });


        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "cardNameInput"
            );
            const event = {
                preventDefault() { },
                target: { value: "Card Holder name" },
            };
            textInputComponent.simulate("change", event);

            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const input = getByTestId('cardNameInput');
            fireEvent.changeText(input, 'Card Holder name');
            instance = exampleBlockA.instance() as StripeIntegration
            instance.setState({ cardName: "Card Holder name" })
            expect(input.props.value).toBe('Card Holder name');
        });
        then('I can enter card number', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const input = getByTestId('cardNumber');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '42424');
            let formattedCard = cardNumberFormatter("42424", instance.state.cardNumber);
            instance.setState({ cardNumber: formattedCard })
            expect(input.props.value).toBe('4242 4');
            expect(instance.state.cardNumber).toEqual("4242 4");

        });
        then('I can enter card expirtydate', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
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
        then('I can enter card expirtydate with digit', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const input = getByTestId('cardExpiry');
            instance = exampleBlockA.instance() as StripeIntegration
            instance.setState({ backspaceFlag: true })
            fireEvent.changeText(input, '12/');
            instance.handleExpiryDate("12/")
            expect(input.props.value).toBe('12/');
            expect(instance.state.expirtyDate).toEqual("12/");
            expect(instance.state.backspaceFlag).toBe(true);

        });
        then('I can enter cvv', () => {
            const { getByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const input = getByTestId('cardCVV');
            instance = exampleBlockA.instance() as StripeIntegration
            fireEvent.changeText(input, '123');
            instance.handleCVVTextInput("123")
            instance.setState({ cvv: "123" })
            expect(input.props.value).toBe('123');
            expect(instance.state.cvv).toEqual("123");

        });
        then("card button event", async () => {
            let buttonComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "cardButton"
            );
            buttonComponent.simulate("press");
            expect(exampleBlockA).toBeTruthy();

        });
        then("cod button event", async () => {
            let buttonComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "codButton"
            );
            buttonComponent.simulate("press");
            expect(exampleBlockA).toBeTruthy();

        });
        then("close payment alert", async () => {
            const mockOnClick = jest.fn();
            const mockOnSClick = jest.fn();

            const { getByTestId } = render(
                <PaymentCustomeAlert
                    visible={true} onpressClose={mockOnClick} onpressContinue={mockOnSClick}
                    customeText={"Payment Failed"} customeDescription={"You earnd a discount coupon code. You can check this out in your profile or Reed Now!"}
                    isLoading={false} testID={"paymentAlert"} paymentAlerttype={"PaymentSuccess"} />
            );
            const buttonElement = getByTestId('closePaymentAlert');
            // Simulate a button click
            fireEvent.press(buttonElement);
            // Check if the onClick function is called once
            expect(mockOnClick).toHaveBeenCalledTimes(1);

            const buttonElements = getByTestId('clickButton');
            // Simulate a button click
            fireEvent.press(buttonElements);
            // Check if the onClick function is called once
            expect(mockOnSClick).toHaveBeenCalledTimes(1);

        });
        then("Payment alert", async () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            const touchableOpacity = explorePageWrapper.find(
                '[testID="paymentAlert"]'
            );

            let instance = explorePageWrapper.instance() as StripeIntegration;
            instance.setState({ showPaymentAlert: true });
            const imgSource = require('../../../OrderSummary/assets/cart.png');
            console.log("check log instance-->", instance.state.showPaymentAlert)
            // expect(ockCallBack).toHaveBeenCalled();
            expect(instance.state.showPaymentAlert).toEqual(true);

        });

        then("Payment Alert Called", async () => {
            const imgSource = require('../../../OrderSummary/assets/cart.png');
            const mockCallBack = jest.fn();
            const { getByTestId } = render(
                <PaymentCustomeAlert
                    visible={true} onpressClose={() => {
                        console.log("check click event on press");
                        // instance.setState({ showPaymentAlert: false });
                    }} onpressContinue={() => {
                        console.log("NOt work inside************************");
                        mockCallBack();
                        // instance.setState({ isOrderSuccess: true });
                        // instance.setState({ showPaymentAlert: false });
                        // instance.handleContinueButton();
                        // if (instance.state.isOrderSuccess) {
                        //     instance.props.navigation.navigate('InvoiceBilling');
                        // }
                    }}
                    customeText={"Payment Failed"} customeDescription={"You earnd a discount coupon code. You can check this out in your profile or Reed Now!"}
                    isLoading={true} testID={"paymentAlert"} paymentAlerttype={"PaymentSuccess"} />
            );
            fireEvent.press(getByTestId('paymentAlert'));
            // expect(getByTestId('paymentAlert')).toBeCalledWith();
        })

        then("Payment all texts", async () => {
            const renders = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const textComponent = renders.getByTestId('paymentDetails');
            expect(textComponent.props.children).toEqual('PAYMENT DETAILS');
            if (instance.state.paymentAlerttype === "PaymentSuccess") {
                instance.setState({ paymentAlerttype: "ThankYouForYourOder" }, () => {
                    console.log("check paymetn alert type--->", instance.state.paymentAlerttype)
                    expect(instance.state.paymentAlerttype).toEqual("ThankYouForYourOder");
                    instance.handlePaymentSuccess()
                });
            }
            if (instance.state.paymentAlerttype === "ThankYouForYourOder") {
                instance.setState({ paymentAlerttype: "ContinueToEmail" }, () => {
                    expect(instance.state.paymentAlerttype).toEqual("ContinueToEmail");
                    instance.handlePaymentSuccess()
                });
            }
            if (instance.state.paymentAlerttype === "ContinueToEmail") {
                instance.setState({ showPaymentAlert: false }, () => {
                    expect(instance.state.showPaymentAlert).toEqual(false);
                })
            }

            console.log("check paymetn alert type--->", instance.state.paymentAlerttype)

        });
        then("Payment all images", async () => {
            const { queryByTestId } = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            const circle = require("./../../../StripeIntegration/assets/ic_check_circle_icon.png")
            const excl = require("./../../../StripeIntegration/assets/ic_exclamation_icon.png")
            const email = require("./../../../StripeIntegration/assets/ic_email_icon.png")

            // const image = mans.getByTestId('Stripe');
            // expect(queryByTestId('stripe').image.props.source).toBe(imgSource);
            const renders = render(<StripeIntegration navigation={navigation} id={"1"} route={{
                params: {
                    name: "",
                    address: "",
                    phone_number: 0,
                    zip_code: 0,
                    subtotal: 0,
                    shipping: 0,
                    discount: 0,
                    storageClass: "Basic",
                    orderId: 0,
                    orderNumber: 0,
                    email: ""
                }
            }} />);
            if (instance.state.paymentAlerttype === "PaymentSuccess") {
                instance.setState({ paymentAlerttype: "ThankYouForYourOder" }, () => {
                    console.log("check paymetn alert type--->", instance.state.paymentAlerttype)
                    expect(instance.state.paymentAlerttype).toEqual("ThankYouForYourOder");
                    instance.handlePaymentSuccess()
                });
            }
            if (instance.state.paymentAlerttype === "ThankYouForYourOder") {
                instance.setState({ paymentAlerttype: "ContinueToEmail" }, () => {
                    expect(instance.state.paymentAlerttype).toEqual("ContinueToEmail");
                    instance.handlePaymentSuccess()
                });
            }
            if (instance.state.paymentAlerttype === "ContinueToEmail") {
                instance.setState({ showPaymentAlert: false }, () => {
                    expect(instance.state.showPaymentAlert).toEqual(false);
                })
            }

            console.log("check paymetn alert type--->", instance.state.paymentAlerttype)

        });
        then('should change paymentAlerttype to "ThankYouForYourOder" and call handlePaymentSuccess', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;

            explorePageWrapper.setState({ isOrderSuccess: true, paymentAlerttype: "PaymentSuccess" });

            // Mock handlePaymentSuccess function
            const mockHandlePaymentSuccess = jest.fn();
            instance.handlePaymentSuccess = mockHandlePaymentSuccess;

            // Call handleContinueButton
            instance.handleContinueButton();

            // Check state changes
            expect(explorePageWrapper.state('paymentAlerttype')).toBe("ThankYouForYourOder");

            // Check if handlePaymentSuccess is called
            expect(mockHandlePaymentSuccess).toHaveBeenCalled();
        });
        then('should change paymentAlerttype to "ContinueToEmail" and call handlePaymentSuccess', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;

            explorePageWrapper.setState({ isOrderSuccess: true, paymentAlerttype: "ThankYouForYourOder" });

            // Mock handlePaymentSuccess function
            const mockHandlePaymentSuccess = jest.fn();
            instance.handlePaymentSuccess = mockHandlePaymentSuccess;

            // Call handleContinueButton
            instance.handleContinueButton();

            // Check state changes
            expect(explorePageWrapper.state('paymentAlerttype')).toBe("ContinueToEmail");

            // Check if handlePaymentSuccess is called
            expect(mockHandlePaymentSuccess).toHaveBeenCalled();
        });
        then('should navigate to InvoiceBilling and set showPaymentAlert to false for unexpected paymentAlerttype', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;

            explorePageWrapper.setState({ isOrderSuccess: true, paymentAlerttype: "UnexpectedValue" });

            // Mock handlePaymentSuccess function
            const mockNavigate = jest.fn();
            instance.props.navigation.navigate = mockNavigate;

            // Call handleContinueButton
            instance.handleContinueButton();

            // Check state changes  
            expect(explorePageWrapper.state('showPaymentAlert')).toBe(false);

            // Check if handlePaymentSuccess is called
            expect(mockNavigate).toHaveBeenCalledWith('InvoiceBilling', instance.props.route.params);
        });
        then('should do nothing if isOrderSuccess is false', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;

            explorePageWrapper.setState({ isOrderSuccess: false, paymentAlerttype: "UnexpectedValue" });

            // Mock handlePaymentSuccess function
            const mockNavigate = jest.fn();
            const mockHandlePaymentSuccess = jest.fn();
            instance.props.navigation.navigate = mockNavigate;
            instance.handlePaymentSuccess = mockHandlePaymentSuccess

            // Call handleContinueButton
            instance.handleContinueButton();
            expect(explorePageWrapper.state('paymentAlerttype')).toBe("UnexpectedValue");
            expect(mockHandlePaymentSuccess).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();

        });
        then('should set showPaymentLoading to true and call getPaymentMethod for paymentMethodType as Card', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            explorePageWrapper.setState({ paymentMethodType: "Card" });
            instance.setState({ showPaymentLoading: true })
            instance.setState({ customAlertText: "Paymenst In Process.." });

            // Mock getPaymentMethod function
            const mockGetPaymentMethod = jest.fn();
            instance.getPaymentMethod = mockGetPaymentMethod;

            // Click on Button 1
            explorePageWrapper.find(<DoubleButton button1Label={""} button2Label={""}
                button1_Onpress={mockGetPaymentMethod()} button2_Onpress={() => {

                }} />);

            // Check state changes
            expect(explorePageWrapper.state('showPaymentLoading')).toBe(true);
            expect(explorePageWrapper.state('customAlertText')).toBe("Paymenst In Process..");

            // Check if getPaymentMethod is called
            //expect(mockGetPaymentMethod).toHaveBeenCalled();
        });
        then('should call codeApiCalled and set showPaymentAlert to true when paymentMethodType is not "Card"', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            explorePageWrapper.setState({ paymentMethodType: "Cod" }); // Set payment method type to "Cod" or any other type
            instance.setState({ showPaymentAlert: true })
            // Mock codeApiCalled function
            const mockCodeApiCalled = jest.fn();
            instance.codeApiCalled = mockCodeApiCalled;

            // Call button1_Onpress
            explorePageWrapper.find(<DoubleButton button1Label={""} button2Label={""}
                button1_Onpress={mockCodeApiCalled()} button2_Onpress={() => {

                }} />);
            const { getByTestId } = render(<DoubleButton button1Label={""} button2Label={""} button1_Onpress={mockCodeApiCalled()} button2_Onpress={() => {

            }} />);
            const buttonComponent = getByTestId("doneFirstButtonEvent");
            fireEvent.press(buttonComponent);
            expect(mockCodeApiCalled).toHaveBeenCalled();

            expect(explorePageWrapper.state('showPaymentAlert')).toBe(true);
        });
        then("Double button", async () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            let buttonComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "doneFirstButtonEvent"
            );
            buttonComponent.simulate("press");
            expect(exampleBlockA).toBeTruthy();

            let buttonSecondComponent = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "doneSecondButtonEvent"
            );
            buttonSecondComponent.simulate("press");
            expect(exampleBlockA).toBeTruthy();
            instance.setState({ paymentMethodType: "Card" });
            const { queryByTestId } = render(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            const closeDropdown: any = queryByTestId("doubleButton");
            instance.setState({ showPaymentLoading: true })
            instance.setState({ customAlertText: "Payment In Process.." });
            instance.setState({ showPaymentAlert: true })
            fireEvent.press(closeDropdown);
            buttonComponent.simulate("press");
            expect(instance.state.showPaymentLoading).toEqual(true);
            expect(instance.state.customAlertText).toEqual("Payment In Process..");
            expect(instance.state.showPaymentAlert).toEqual(true);
            let card = instance.state.cardNumber.replace(' ', '').replace(' ', '').replace(' ', '');
            let cvv = instance.state.cvv
            let month = instance.state.expirtyDate.slice(0, 2);
            let year = "20" + instance.state.expirtyDate.slice(-2);
            instance.getPaymentMethod(card, cvv, month, year)
            expect(instance.getPaymentMethod).toBeTruthy()
            expect(closeDropdown).toBeTruthy();

        });
        then('should handle payment method type "Card" correctly', () => {
            const mockGetPaymentMethod = jest.fn();
            const mockCodeApiCalled = jest.fn();
            const mockSetState = jest.fn();

            // Mock the component instance
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            const instance = explorePageWrapper.instance() as StripeIntegration
            instance.setState({ paymentMethodType: "Card" })
            const { getByText } = render(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            const onPressMock = jest.fn();
            const button = getByText('Pay');
            instance.getPaymentMethod = mockGetPaymentMethod;
            let buttonComponent = explorePageWrapper.findWhere(
                (node) => node.prop("testID") === "doneFirstButtonEvent"
            );
            buttonComponent.simulate("press");
            expect(instance.state.showPaymentLoading).toBe(true);
            expect(instance.state.customAlertText).toBe("Payment In Process..");
            expect(instance.state.showPaymentAlert).toBe(true);
            expect(mockGetPaymentMethod).toHaveBeenCalled();
        });

        then('should update expirtyDate state with a valid month', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            const inputText = "05/";

            instance.handleExpiryDate(inputText);

            expect(explorePageWrapper.state('expirtyDate')).toBe(inputText);
        });
        then('should set custom alert text and description for "Card" payment method type', () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            let instance = explorePageWrapper.instance() as StripeIntegration;
            instance.setState = jest.fn();
            explorePageWrapper.setState({ paymentMethodType: "Card" });
            instance.setState({ showPaymentLoading: false })
            instance.setState({ customAlertText: "Payment Failed" });
            instance.setState({ customAlertDesc: "Please contact to admin Or Try again." });

            // Set the initial state with paymentMethodType as "Card"

            // Call the function
            instance.handlePaymentFailed();

            // Assertions for the expected behavior after handling payment failure
            expect(instance.setState).toHaveBeenCalled();
            expect(explorePageWrapper.state('showPaymentLoading')).toBe(false);
            // expect(explorePageWrapper.state('customAlertText')).toBe("Payment Failed");
            // expect(explorePageWrapper.state('customAlertDesc')).toBe("Please contact to admin Or Try again.");
        });

        then('stripe payment api', async () => {
            let explorePageWrapper: ShallowWrapper;
            explorePageWrapper = shallow(
                <StripeIntegration
                    route={{
                        params: {
                            name: "",
                            address: "",
                            phone_number: 0,
                            zip_code: 0,
                            subtotal: 0,
                            shipping: 0,
                            discount: 0,
                            storageClass: "Basic",
                            orderId: 0,
                            orderNumber: 0,
                            email: ""
                        }
                    }} {...screenProps} />
            );
            // let myHeaders = new Headers();
            //  myHeaders.append("Authorization", "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc");
            // myHeaders.append("Content-Type", "text/plain");
            // let raw = "\n";

            // let requestOptions: any = {
            //   method: 'POST',
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: 'follow'
            // };        
            const orderId = '123';
            const cardNumber = '4242 4242 4242 4242';
            const cvv = '123';
            const expMonth = '12';
            const expYear = '24';
            let instance = explorePageWrapper.instance() as StripeIntegration;

            let url = await instance.getPaymentMethod(cardNumber, cvv, expMonth, expYear, true)
            expect(url).toBe(`https://api.stripe.com/v1/payment_methods?card[number]=${cardNumber}&card[exp_month]=${expMonth}&card[exp_year]=${expYear}&card[cvc]=${cvv}&type=card`); // Verify that the result is 5
            // instance.setState = jest.fn();
            // explorePageWrapper.setState({ paymentMethodType: "Card" });
            // instance.setState({ showPaymentLoading: false })
            // instance.setState({ customAlertText: "Payment Failed" });
            // instance.setState({ customAlertDesc: "Please contact to admin Or Try again." });

            // Set the initial state with paymentMethodType as "Card"

            // Call the function
            // instance.handlePaymentFailed();

            // Assertions for the expected behavior after handling payment failure
            // expect(instance.setState).toHaveBeenCalled();
            // expect(explorePageWrapper.state('showPaymentLoading')).toBe(false);
            // expect(explorePageWrapper.state('customAlertText')).toBe("Payment Failed");
            // expect(explorePageWrapper.state('customAlertDesc')).toBe("Please contact to admin Or Try again.");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });
});

