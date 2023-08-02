import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import MyCredits from "../../src/MyCredits/MyCredits";
import Modal from "../../src/MyCredits/MyCreditDetailsModal";
import { render } from "@testing-library/react-native";
import { ShallowWrapper, shallow } from "enzyme";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "MyCredits",
  route: {},
};

const feature = loadFeature("./__tests__/features/Mycredits-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to My credits screen", ({ given, when, then }) => {
    let SettingsBlock;
    given("users loading My credits screen", () => {
      SettingsBlock = render(<MyCredits visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      }} setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      }} cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      }} {...screenProps} />);
      expect(SettingsBlock).toBeTruthy();
    });

    then("click on my credit detail modal", () => {
      SettingsBlock = shallow(<MyCredits visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      }} setState={undefined} state={undefined} firstTime={false} currentUser={""} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      }} cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      }} {...screenProps} />)
      const touchableOpacity = SettingsBlock.find(
        '[testID="detailsModal"]'
      );
      // touchableOpacity.simulate("press");
    })


    then("user can see my credits modal", () => {
      const MycreditsModal = render(<Modal navigation={undefined} id={""} visible={false} setVisibleProfileModal={function (): void {
        throw new Error("Function not implemented.");
      }} setState={undefined} state={undefined} firstTime={false} currentUser={""} route={undefined} updateCartDetails={function (data: any): void {
        throw new Error("Function not implemented.");
      }} cartDetails={[]} setCreditDetailModal={function (): void {
        throw new Error("Function not implemented.");
      }} />);
      expect(MycreditsModal).toBeTruthy();
    });
  });
});
