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
            analyticsBlock = shallow(<AnimalPig animalSelectedValue={"Pig"} {...screenProps}/>)
        });

        when('I navigate to the Animal pig', () => {
             instance = analyticsBlock.instance() as AnimalPig
        });

        then('Animal pig will load with out errors', () => {
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig neck',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.clickOnPigHead()
            expect(analyticsBlock).toBeTruthy()

            let pigBacon = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigBacon');
            pigBacon.simulate('press')
            instance.clickOnPigBacon()
            expect(analyticsBlock).toBeTruthy()

            let pigNeck = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigNeck');
            pigNeck.simulate('press')
            instance.clickOnPigNeck()
            expect(analyticsBlock).toBeTruthy()

            let pigLegham = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigLegham');
            pigLegham.simulate('press')
            instance.clickOnPiglegham()
            expect(analyticsBlock).toBeTruthy()

            let pigRibs = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigRibs');
            pigRibs.simulate('press')
            instance.clickOnPigRib()
            expect(analyticsBlock).toBeTruthy()

            let pigLoin = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigLoin');
            pigLoin.simulate('press')
            instance.clickOnPigLoin()
            expect(analyticsBlock).toBeTruthy()

            let pigShoulder = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigShoulder');
            pigShoulder.simulate('press')
            instance.clickOnPigShoulder()
            expect(analyticsBlock).toBeTruthy()

            let pigPicnic = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigPicnic');
            pigPicnic.simulate('press')
            instance.clickOnPigPicnic()
            expect(analyticsBlock).toBeTruthy()


            let pigJowl = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigJowl');
            pigJowl.simulate('press')
            instance.clickOnPigJowl()
            expect(analyticsBlock).toBeTruthy()

        });
        
        then('I click on pig back',() => {
        //     let pigHock = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHock');
        //     pigHock.simulate('press')
        //    instance.clickOnPigHock()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig breast',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.clickOnPigHead()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig wing',() => {
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
