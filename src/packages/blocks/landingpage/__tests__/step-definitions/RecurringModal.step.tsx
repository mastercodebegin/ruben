import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { RecurringModal } from "../../src/ProductDetails/RecurringModal";
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
  "./__tests__/features/RecurringModal-scenario.feature"
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

  test("Modal visible to RecurringModal", ({ given, when, then }) => {
    let ModalBlock: ShallowWrapper;
    let instance: RecurringModal;
    given("recurringModal component", () => {
        ModalBlock = shallow(
            //@ts-ignore
        <RecurringModal
                visible={false} recurringOrder={function (quantity: number, frequency: string): void {
                    throw new Error("Function not implemented.");
                } } setVisible={() => jest.fn()}
                {...screenProps}        />
      );
      instance = ModalBlock.instance() as RecurringModal;
    });

    then("user can click on close for btn hide modal", () => {
    instance.setState({quantity:0,frequency:"Select"})
    instance.AddSubscription();
      let closeBtn = ModalBlock.findWhere((node) => node.prop('testID') === "closebtn");
      closeBtn.simulate('press')
    })

    then("user can click on minus btn for remove quantity", () => {
        let minusBtn = ModalBlock.findWhere((node) => node.prop('testID') === "minusbtn");
        minusBtn.simulate('press')
    })

    then("user can click on plus btn for add quantity", () => {
        let plusBtn = ModalBlock.findWhere((node) => node.prop('testID') === "plusbtn");
        plusBtn.simulate('press')
    });

    then("user can click on add_subscription btn for subscription", () => {
        let add_subscription = ModalBlock.findWhere((node) => node.prop('testID') === "add_subscription");
        add_subscription.simulate('press')
    });

  });
});
