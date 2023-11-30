import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import AboutUs from "../../src/AboutUs/AboutUs";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as utils  from "../../../../components/src/ShowToast";

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
    jest.doMock("../../../../components/src/ShowToast", () => ({
      showToast: jest.fn(),
    }));
  });

  test("User navigates to about us screen", ({ given, when, then }) => {
    let AboutUsBlock: ShallowWrapper;
    let instance: AboutUs;

    given("users loading about us screen", () => {
      AboutUsBlock = shallow(
        <AboutUs
          setCreditDetailModal={jest.fn()}
          visible={false}
          setVisibleProfileModal={jest.fn()}
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
    then("user can add the product into cart", () => {
      const showAlert = jest.spyOn(utils, "showToast");

      const touchableOpacity = AboutUsBlock.find(
        '[testID="add_to_fav_test_id"]'
      );
      touchableOpacity.simulate("press");
      expect(showAlert).toBeDefined();
    });
    then('users can see available photo list', () => {
      const photosList = AboutUsBlock.findWhere(
          (node) => node.prop("testID") === "photosList"
        );          
          photosList.renderProp('renderItem')({
          item: {
            id: 2,
            attributes: {
              id: 2,
              name: 'photosList 1'
            }
          }, index: 0
        })
        photosList.renderProp("keyExtractor")({id:0})
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AboutUsBlock).toBeTruthy();
    });
  });
});
