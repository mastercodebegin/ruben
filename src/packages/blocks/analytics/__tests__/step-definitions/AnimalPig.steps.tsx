import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnimalPig from "../../src/AnimalPig"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AnimalPig"
  }

const feature = loadFeature('./__tests__/features/AnimalPig-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to animal pig screen', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:AnimalPig; 

        given('I am a User loading pig image', () => {
            analyticsBlock = shallow(<AnimalPig animalSelectedValue={"Pig"} setState={undefined} state={undefined} {...screenProps}/>)
        });

        when('I navigate to the Animal pig', () => {
             instance = analyticsBlock.instance() as AnimalPig
        });

        then('Animal pig will load with out errors', () => {
            expect(analyticsBlock).toBeTruthy()
        });

        then('I click on pig head',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.clickOnPigHead()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig hock',() => {
            let pigHock = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHock');
            pigHock.simulate('press')
            instance.clickOnPigHock()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig head',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.clickOnPigHead()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig head',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.clickOnPigHead()
            expect(analyticsBlock).toBeTruthy()
        });

        then('I can leave the pig screen with out errors', () => {
            instance.componentWillUnmount()
            expect(analyticsBlock).toBeTruthy()
        });
    });


});
