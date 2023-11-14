import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import MyFavorites from "../../src/MyFavorites/MyFavorites";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { render } from "@testing-library/react-native";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyFavorites",
  route: {},
};
const favoritesMockedRes = {
  id: "RestAPIResponceMessage",
  properties: {
    RestAPIResponceDataMessage: "a2527c01-1ccc-4fd4-b0c8-cca1890f8cdc",
    RestAPIResponceSuccessMessage: {
      data: [
        {
          id: "93",
          type: "favourite",
          attributes: {
            favouriteable_id: null,
            favouriteable_type: "AccountBlock::Account",
            user_id: 325,
            catalogue_id: { data: null },
            created_at: "2023-05-05T12:34:48.713Z",
            updated_at: "2023-05-05T12:34:48.713Z",
          },
        }
      ],
    },
  },
  messageId: "3923c6be-6ebf-409a-a4b4-f8d25111bb6d",
};

const feature = loadFeature(
  "./__tests__/features/MyFavorites-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
    jest.doMock("../../../../components/src/utils", () => ({
      store: {
        getState: jest.fn(() => ({
          currentUser: "user",
        })),
        dispatch: jest.fn(),
      },
    }));
  });

  test("User navigates to About us screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: MyFavorites;

    given("users loading About us screen", () => {
      SettingsBlock = shallow(<MyFavorites visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      } } setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      } } cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      } } {...screenProps} />);
      instance = SettingsBlock.instance() as MyFavorites;
      instance.componentDidMount();
      const list = SettingsBlock.findWhere(
        (node) => node.prop("testID") === "favoirteList");   

      // const navigate = SettingsBlock.find('favoirteList').
      // dive().
      // findWhere(
      //   (node) => node.prop("testID") === "navigateToProductDetailScreen");   
      //   navigate.simulate('press')
      list.renderProp('renderItem')({
      item: {
        id: 2,
        attributes: {
          id: 2,
          duration: 'Monthly',
          currency: 'USD',
          amount: '250',
          plan_name: 'Monthly'
        }
      }, index: 0
    })
    list.renderProp("keyExtractor")({id:0})  
      // animalCutsDropDown.simulate('press')

      // console.log('data====',animalCutsDropDown);
      //console.log('data====',SettingsBlock);
    });
    then("user can see the favorite products list", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        favoritesMockedRes
      );
      instance.getFavoritesId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.forceUpdate();
      const MyFavoritesRender = render(<MyFavorites visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      } } setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      } } cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      } } {...screenProps} />)
      expect(MyFavoritesRender).toBeTruthy()
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(SettingsBlock).toBeTruthy();
    });
  });
});
