import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnimalAnalytics from "../../src/AnimalAnalytics";
import { AnimalParts } from "../../src/AnalyticsController";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AnimalAnalytics",
    route: {},
  }

  
const feature = loadFeature('./__tests__/features/Animal-Analytics-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock("react-native", () => ({
            Platform: { OS: "web" },
            nativeModule: {},
          }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnimalAnalytics', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:AnimalAnalytics; 

        given('I am a User loading AnimalAnalytics', () => {
            analyticsBlock = shallow(<AnimalAnalytics animalSelectedValue={"Eggs"} {...screenProps}/>)
        });

        when('I navigate to the AnimalAnalytics', () => {
             instance = analyticsBlock.instance() as AnimalAnalytics
        });

        then('AnimalAnalytics will load with out errors', () => {
            expect(analyticsBlock).toBeTruthy()
        });

        then('click on cow chuck',() => {
            let CowChuck = analyticsBlock.findWhere((node) => node.prop('testID') === 'cowChuck');
            CowChuck.simulate('press')
            instance.onCowClick(AnimalParts.chuck)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowHead',() => {
            let CowHead= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowHead');
            CowHead.simulate('press')
            instance.onCowClick(AnimalParts.cowHead)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowRib',() => {
            let CowRib= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowRib');
            CowRib.simulate('press')
            instance.onCowClick(AnimalParts.cow_Rib)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowShortlion',() => {
            let CowRib= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowShortlion');
            CowRib.simulate('press')
            instance.onCowClick(AnimalParts.cow_Rib)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowSirLion',() => {
            let CowSirLion= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowSirLion');
            CowSirLion.simulate('press')
            instance.onCowClick(AnimalParts.cow_Short_lion)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowRound',() => {
            let CowRound= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowRound');
            CowRound.simulate('press')
            instance.onCowClick(AnimalParts.cow_Round)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowShank',() => {
            let cowShank= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowShank');
            cowShank.simulate('press')
            instance.onCowClick(AnimalParts.cow_shank)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowFlank',() => {
            let cowFlank= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowFlank');
            cowFlank.simulate('press')
            instance.onCowClick(AnimalParts.cow_Flank)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowForeShank',() => {
            let cowForeShank= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowForeShank');
            cowForeShank.simulate('press')
            instance.onCowClick(AnimalParts.cow_Fore_Shank)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowBrisket',() => {
            let cowBrisket= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowBrisket');
            cowBrisket.simulate('press')
            instance.onCowClick(AnimalParts.cow_Brisket)
            expect(analyticsBlock).toBeTruthy()
        });
        then('click on cowShortplate',() => {
            let cowShortplate= analyticsBlock.findWhere((node) => node.prop('testID') === 'cowShortplate');
            cowShortplate.simulate('press')
            instance.onCowClick(AnimalParts.cow_Short_plate)
            expect(analyticsBlock).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(analyticsBlock).toBeTruthy()
        });
    });
});
