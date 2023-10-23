import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { render } from "@testing-library/react-native";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import ViewProduct from "../../src/ExploreStore/ViewProduct";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "ViewProduct",
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
  "./__tests__/features/ViewProduct-scenario.feature"
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

  test("User navigates to view product screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: ViewProduct;

    given("users loading About us screen", () => {
      SettingsBlock = shallow(<ViewProduct visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      } } setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      } } cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      } } {...screenProps} />);
      instance = SettingsBlock.instance() as ViewProduct;
      instance.componentDidMount();
      instance.getViewAllProduct(6);
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
      const MyFavoritesRender = render(<ViewProduct visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      } } setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      } } cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      } } {...screenProps} />)
      expect(MyFavoritesRender).toBeTruthy()
    });

    then("load view product list", () => {
        let instance;
        let ViewProductWrapper: ShallowWrapper;
        let termsCondsList;
        ViewProductWrapper = shallow(
          <ViewProduct
            setCreditDetailModal={jest.fn()}
            visible={false}
            setVisibleProfileModal={jest.fn()}
            setState={() => {}}
            state={{ subcategories: [{}, {}], categories: [{}, {}] }}
            firstTime={false}
            currentUser={""}
            updateCartDetails={() => {}}
            cartDetails={[]}
            {...screenProps}
          />
        );
        instance = ViewProductWrapper.instance() as ViewProduct;
        instance.setState({ categories: [{}] });
        termsCondsList = ViewProductWrapper.findWhere(
          (node) => node.prop("testID") === "termsCondsList"
        );
        termsCondsList.render();
        instance.getViewAllProduct(6)

      });
    
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(SettingsBlock).toBeTruthy();
    });
  });
});