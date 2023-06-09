import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow } from "enzyme";
import { ExplorePage } from "../../src/ExploreStore/ExplorePage";
import { render, fireEvent } from "@testing-library/react-native";
import RenderItems from "../../src/RenderItems/RenderItems";
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
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{ selectedSub: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
    then("render flatlist", () => {
      render(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function(): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => {}}
          state={{ subcategories: [{}, {}], categories: [{}, {}] }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => {}}
          cartDetails={[]}
          {...screenProps}
        />
      );
    });
    then("user can see products list",()=>{
      const productList = render(<RenderItems rating={false} item={[{}]} onpressFav={addtoFavMock} onPressCart={addtoCartMock }/>)
      const {getByTestId} = render(<RenderItems rating={true} item={[{},{}]} onpressFav={addtoFavMock} onPressCart={addtoCartMock }/>)
      expect(productList).toBeTruthy();
      
      fireEvent.press(getByTestId("navigate_to_product_details_id_0"));
      fireEvent.press(getByTestId("add_to_fav_id_0"));
      fireEvent.press(getByTestId("add_to_cart_id_0"));
      expect(addtoCartMock).toBeCalled();
      expect(addtoFavMock).toBeCalled()
       })
  });
});
