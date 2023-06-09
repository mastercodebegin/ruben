import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import AboutUs from "../../src/AboutUs/AboutUs";


const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const feature = loadFeature("./__tests__/features/Aboutus-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to about us screen", ({ given, when, then }) => {
    let AboutUsBlock: ShallowWrapper;
    let instance: AboutUs;

    given("users loading about us screen", () => {
      AboutUsBlock = shallow(
        <AboutUs
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{}}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = AboutUsBlock.instance() as AboutUs;
      instance.componentDidMount();
      instance.setState({
        aboutus: {
          attributes: { photo: { url: "https://test.com" }, description:'test description' },
         
        },
      });
    });
    then("user can see the farm image", () => {
      const image = instance.state.aboutus.attributes.photo.url;
      expect(image).toBeTruthy();
    });

    then("user can see the description", () => {
      const description = instance.state.aboutus.attributes.description;
      expect(description).toBeTruthy();
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AboutUsBlock).toBeTruthy();
    });
  });
});
