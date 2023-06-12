import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ExplorePage } from "../../src/ExploreStore/ExplorePage";
import { render, fireEvent } from "@testing-library/react-native";
import RenderItems from "../../src/RenderItems/RenderItems";
import SortingDropdown from "../../../../components/src/SortingDropdown";
const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
  route: {},
};

const addtoFavMock = jest.fn();
const addtoCartMock = jest.fn();
const feature = loadFeature(
  "./__tests__/features/ExplorePage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      nativeModule: {},
    }));
  });

  test("User navigates to ExplorePage", ({ given, when, then }) => {
    let ExploreBlock;

    given("I am a User loading ExplorePage", () => {
      ExploreBlock = render(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => { }}
          state={{ selectedSub: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => { }}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
    then("render flatlist", () => {
      render(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => { }}
          state={{ subcategories: [{}, {}], categories: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => { }}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
    then("load category list", () => {
      let instance;
      let explorePageWrapper: ShallowWrapper;
      let termsCondsList;
      explorePageWrapper = shallow(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => { }}
          state={{ subcategories: [{}, {}], categories: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => { }}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = explorePageWrapper.instance() as ExplorePage;
      instance.setState({ categories: [{}] });
      termsCondsList = explorePageWrapper.findWhere(
        (node) => node.prop("testID") === "termsCondsList"
      );
      termsCondsList.render();
    });
    then("load subcategories list", () => {
      let instance;
      let explorePageWrapper: ShallowWrapper;
      let subcategoryList;
      explorePageWrapper = shallow(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => { }}
          state={{ subcategories: [{}, {}], categories: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => { }}
          cartDetails={[]}
          {...screenProps}
        />
      );
      instance = explorePageWrapper.instance() as ExplorePage;
      instance.setState({ subcategories: [{}] });
      subcategoryList = explorePageWrapper.findWhere(
        (node) => node.prop("testID") === "subcategoryList"
      );
      subcategoryList.render();
    });
     then('sorting correctly', () => {
      const { getByTestId, queryByTestId } = render(<SortingDropdown visible={true} data={[ { label: 'Pricing Low to High', value: '1' },
      { label: 'Pricing High to Low', value: '2' },]} onSelect={jest.fn()} testID={"sortingDropdown"} />);
      const myView = getByTestId('sortingDropdown');
      expect(myView).toBeDefined();

      const onSelectPress: any = queryByTestId(0 + "selectFilter");
      fireEvent.press(onSelectPress);
      expect(onSelectPress).toBeTruthy();

      const closeDropdown: any = queryByTestId("closeDropdown");
      expect(closeDropdown).toBeTruthy();
      fireEvent.press(closeDropdown);

    
    });
    then("user can see products list", () => {
      const productList = render(<RenderItems rating={false} item={[{}]} onpressFav={addtoFavMock} onPressCart={addtoCartMock} />)
      const { getByTestId } = render(<RenderItems rating={true} item={[{}, {}]} onpressFav={addtoFavMock} onPressCart={addtoCartMock} />)
      expect(productList).toBeTruthy();

      fireEvent.press(getByTestId("navigate_to_product_details_id_0"));
      fireEvent.press(getByTestId("add_to_fav_id_0"));
      fireEvent.press(getByTestId("add_to_cart_id_0"));
      expect(addtoCartMock).toBeCalled();
      expect(addtoFavMock).toBeCalled()
    });
  });
});

