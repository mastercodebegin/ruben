import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Analytics from "../../src/Analytics.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Analytics"
  }

const feature = loadFeature('./__tests__/features/Analytics.web-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Analytics', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:Analytics; 

        given('I am a User loading Analytics', () => {
            analyticsBlock = shallow(<Analytics {...screenProps}/>)
        });

        when('I navigate to the Analytics', () => {
             instance = analyticsBlock.instance() as Analytics
        });

        then('Analytics will load with out errors', () => {
           instance.doButtonPressed()
            expect(analyticsBlock).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
           
                console.log("check working or not---->>>>>>>>>>>>>>");
                let paymentparam = {
                  query: "chicken",
                  id: 1,
                  categoryId: 31,
                  startDate: "2023-07-23",
                  endDate: "2023-07-31",
                };
                
                const msgValidationAPI = new Message(
                  getName(MessageEnum.RestAPIResponceMessage)
                );
                msgValidationAPI.addData(
                  getName(MessageEnum.RestAPIResponceDataMessage),
                  msgValidationAPI.messageId
                );
                msgValidationAPI.addData(
                  getName(MessageEnum.RestAPIResponceEndPointMessage),
                  `${paymentparam}`
                );
                msgValidationAPI.addData(
                  getName(MessageEnum.RestAPIResponceSuccessMessage),
                  {
                    data: [{}],
                  }
                );
                
                runEngine.sendMessage("Unit Test Api", msgValidationAPI);
          
                const msgError = new Message(
                  getName(MessageEnum.RestAPIResponceErrorMessage)
                );
                msgError.addData(
                  getName(MessageEnum.RestAPIResponceDataMessage),
                  msgValidationAPI.messageId
                );
                msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
                  data: []
                });
          
             
                runEngine.sendMessage("Unit Test", msgValidationAPI);
          
          
                // let amount = mockDataCredit.tota_amount.toFixed(2);  
                // instance.setState({chartObject: instance.convertToChartFormat(mockData_Credit.chart_data,  '2023-08-09')})     
                instance.componentWillUnmount()

            expect(analyticsBlock).toBeTruthy()
        });
    });


});
