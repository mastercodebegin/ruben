import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import ProductDetails from "../../src/ProductDetails/ProductDetails";
import  RenderAboutThisFarm from "../../src/ProductDetails/RenderAboutThisFarm";
import RenderSteps from "../../src/ProductDetails/RenderSteps";
import { render } from "@testing-library/react-native";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature(
  "./__tests__/features/ProductDetails-scenario.feature"
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

  test("User navigates to orders screen", ({ given, when, then }) => {
    let SettingsBlock: ShallowWrapper;
    let instance: ProductDetails;
    given("users loading orders screen", () => {
      SettingsBlock = shallow(
        <ProductDetails
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{}}
          firstTime={false}
          currentUser="user"
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = SettingsBlock.instance() as ProductDetails;
    });
    then("User pressing lifetime subscribing trigger", () => {
      const touchableOpacity = SettingsBlock.find(
        '[testID="copy_link_test_id"]'
      );
      touchableOpacity.simulate("press");
    });

    then("user can see about this farm",()=>{
      render(<RenderAboutThisFarm/>);
      render(<RenderSteps header={""} description={""} images={[]}/>);
    })
  });
});
