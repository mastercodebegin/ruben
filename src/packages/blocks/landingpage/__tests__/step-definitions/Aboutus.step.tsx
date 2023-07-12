import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import AboutUs from "../../src/AboutUs/AboutUs";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const configJSON = require("../../src/config");

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
      instance.setState({ show_loader: true });

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAboutUs
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "9",
              type: "content",
              attributes: {
                id: 9,
                title: "some content",
                description: "some descripiton",
                created_at: "2023-04-19T11:38:41.811Z",
                updated_at: "2023-04-19T11:38:41.865Z",
                photo: {
                  url:
                    "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3841748f0d85a371a9a7c97a5b36ecb6dfe4ec80/icons8-image-100.png",
                },
              },
            },
          ],
        }
      );
      instance.getAboutUsId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(instance.state.aboutus.attributes.description).toBe('some descripiton')
      expect(instance.state.aboutus.attributes.photo.url).toBe('https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWtDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3841748f0d85a371a9a7c97a5b36ecb6dfe4ec80/icons8-image-100.png')
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
