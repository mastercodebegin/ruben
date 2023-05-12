import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "EmailAccountLoginBlock"
  }

const feature = loadFeature('./__tests__/features/email-account-login-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()  

            instance = mobileAccountLogInWrapper.instance()as EmailAccountLoginBlock;

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": [
                    {
                        "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                        "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                        "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                    }
                ]
            });
            instance.validationApiCallId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

        });

        when('I navigate to the Log In Screen', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
        });
        then('Check Email is Valid', () => {
            instance.componentWillUnmount();
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });
    });
    

});
