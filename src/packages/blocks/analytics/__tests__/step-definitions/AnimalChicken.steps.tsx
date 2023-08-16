import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'

import React from "react";
import AnimalChicken from "../../src/AnimalChicken"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AnimalChicken"
  }

const feature = loadFeature('./__tests__/features/AnimalChicken-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to animal chicken screen', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:AnimalChicken; 

        given('I am a User loading chicken image', () => {
            analyticsBlock = shallow(<AnimalChicken animalSelectedValue={"Chicken"} {...screenProps}/>)
        });

        when('I navigate to the Animal chicken', () => {
             instance = analyticsBlock.instance() as AnimalChicken
        });

        then('Animal chicken will load with out errors', () => {
            expect(analyticsBlock).toBeTruthy()
        });

        then('I click on chicken neck',() => {
            let ChickenNeck = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenNeck');
            ChickenNeck.simulate('press')
            instance.clickOnChickenNeck()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on chicken back',() => {
            let ChickenBack = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenback');
            ChickenBack.simulate('press')
            instance.clickOnChickenBack()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on chicken breast',() => {
            let ChickenBreast = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenBreast');
            ChickenBreast.simulate('press')
            instance.clickOnChickenBreast()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on chicken wing',() => {
            let ChickenWing = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenWing');
            ChickenWing.simulate('press')
            instance.clickOnChickenWing()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on chicken leg',() => {
            let ChickenLeg = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenLeg');
            ChickenLeg.simulate('press')
            instance.clickOnChickenLeg()
            expect(analyticsBlock).toBeTruthy()
        });
        then('I click on chicken Thigh',() => {
            let ChickenThigh = analyticsBlock.findWhere((node) => node.prop('testID') === 'chickenThigh');
            ChickenThigh.simulate('press')
            instance.clickOnChickenThigh()
            expect(analyticsBlock).toBeTruthy()
        });

        then('I can leave the chicken screen with out errors', () => {
            instance.componentWillUnmount()
            expect(analyticsBlock).toBeTruthy()
        });
    });


});
