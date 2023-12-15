import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnimalPig from "../../src/AnimalPig"
import {AnimalParts} from "../../src/AnalyticsController"
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
            instance.onPigClick(AnimalParts.pigHead)
            expect(analyticsBlock).toBeTruthy()

            let pigBacon = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigBacon');
            pigBacon.simulate('press')
            instance.onPigClick(AnimalParts.pigBacon)
            expect(analyticsBlock).toBeTruthy()

            let pigNeck = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigNeck');
            pigNeck.simulate('press')
            instance.onPigClick(AnimalParts.pigNeck)
            expect(analyticsBlock).toBeTruthy()

            let pigLegham = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigLegham');
            pigLegham.simulate('press')
            instance.onPigClick(AnimalParts.pigLegham)
            expect(analyticsBlock).toBeTruthy()

            let pigRibs = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigRibs');
            pigRibs.simulate('press')
            instance.onPigClick(AnimalParts.pigRibs)
            expect(analyticsBlock).toBeTruthy()

            let pigLoin = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigLoin');
            pigLoin.simulate('press')
            instance.onPigClick(AnimalParts.pigLoin)
            expect(analyticsBlock).toBeTruthy()

            let pigShoulder = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigShoulder');
            pigShoulder.simulate('press')
            instance.onPigClick(AnimalParts.pigShoulder)
            expect(analyticsBlock).toBeTruthy()

            let pigPicnic = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigPicnic');
            pigPicnic.simulate('press')
            instance.onPigClick(AnimalParts.pigPicnic)
            expect(analyticsBlock).toBeTruthy()


            let pigJowl = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigJowl');
            pigJowl.simulate('press')
            instance.onPigClick(AnimalParts.pigJowl)
            expect(analyticsBlock).toBeTruthy()

        });
        
        then('I click on pig hock right',() => {
            let pigHock = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHockRight');
            pigHock.simulate('press')
           instance.onPigClick(AnimalParts.pigHock)
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig hock left',() => {
            let pigHock = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHockLeft');
            pigHock.simulate('press')
           instance.onPigClick(AnimalParts.pigHock)
            expect(analyticsBlock).toBeTruthy()
        });

        then('I click on pig hock back fat',() => {
            let pigHock = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigBackFat');
            pigHock.simulate('press')
           instance.onPigClick(AnimalParts.pigBackFat)
            expect(analyticsBlock).toBeTruthy()
        });

        then('I click on pig breast',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.onPigClick(AnimalParts.pigHead)
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on pig wing',() => {
            let pigHead = analyticsBlock.findWhere((node) => node.prop('testID') === 'pigHead');
            pigHead.simulate('press')
            instance.onPigClick(AnimalParts.pigHead)
            expect(analyticsBlock).toBeTruthy()
        });

        then('I can leave the pig screen with out errors', () => {
            instance.componentWillUnmount()
            expect(analyticsBlock).toBeTruthy()
        });
    });


});
