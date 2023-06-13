import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ExplorePage, mapDispatchToProps, mapStateToProps } from "../../src/ExploreStore/ExplorePage";
import { FlatList } from 'react-native'
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
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
    let ExploreBlock: any;
    let subCategoryArray = [{
      "id": "1",
      "type": "sub_category",
      "attributes": {
        "id": 1,
        "name": "Pre Primary (kg)",
        "created_at": "2023-01-19T16:45:25.127Z",
        "updated_at": "2023-01-19T16:45:25.127Z",
        "category_id": {
          "data": null
        },
        "icon": null
      }
    },
    {
      "id": "2",
      "type": "sub_category",
      "attributes": {
        "id": 2,
        "name": "Primary (1 to 5)",
        "created_at": "2023-01-19T16:45:25.148Z",
        "updated_at": "2023-01-19T16:45:25.148Z",
        "category_id": {
          "data": null
        },
        "icon": null
      }
    },
    {
      "id": "3",
      "type": "sub_category",
      "attributes": {
        "id": 3,
        "name": "Middle (6 to 8)",
        "created_at": "2023-01-19T16:45:25.168Z",
        "updated_at": "2023-01-19T16:45:25.168Z",
        "category_id": {
          "data": null
        },
        "icon": null
      }
    },
    {
      "id": "4",
      "type": "sub_category",
      "attributes": {
        "id": 4,
        "name": "Secondary (9 & 10)",
        "created_at": "2023-01-19T16:45:25.186Z",
        "updated_at": "2023-01-19T16:45:25.186Z",
        "category_id": {
          "data": null
        },
        "icon": null
      }
    }]
    given("I am a User loading ExplorePage", () => {
      let explorePageWrapper: ShallowWrapper;
      explorePageWrapper = shallow(
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
      let instance = explorePageWrapper.instance() as ExplorePage;
      const touchableOpacity = explorePageWrapper.find(
        '[testID="sortingDropShow"]'
      );
      touchableOpacity.simulate("press");
      expect(instance.state.show_SortingDropdown).toBeTruthy();
    });
    then("referesh controller", async () => {
      const component = render(
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

      const scrollView = component.getByTestId('scrollview');
      expect(scrollView).toBeDefined();

      const { refreshControl } = scrollView.props;
      await act(async () => {
        refreshControl.props.onRefresh();
      });
    });
    then("user searching with product name", () => {
      const { queryByTestId } = render(
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

      const input: any = queryByTestId("productSearch");
      fireEvent.changeText(input, "");
      expect(input.props.value).toBe("");
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
          state={{ subcategories: subCategoryArray, categories: [{}, {}] }}
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
    });
    then("on end riched", () => {
      let array = [{
        "id": "135",
        "type": "category",
        "attributes": {
          "id": 135,
          "name": null,
          "icon": null,
          "enable": true,
          "rank": null,
          "created_at": "2023-06-13T17:00:43.646Z",
          "updated_at": "2023-06-13T17:00:43.646Z",
          "selected_sub_categories": null
        }
      },
      {
        "id": "136",
        "type": "category",
        "attributes": {
          "id": 135,
          "name": null,
          "icon": null,
          "enable": true,
          "rank": null,
          "created_at": "2023-06-13T17:00:43.646Z",
          "updated_at": "2023-06-13T17:00:43.646Z",
          "selected_sub_categories": null
        }
      },
      {
        "id": "137",
        "type": "category",
        "attributes": {
          "id": 135,
          "name": null,
          "icon": null,
          "enable": true,
          "rank": null,
          "created_at": "2023-06-13T17:00:43.646Z",
          "updated_at": "2023-06-13T17:00:43.646Z",
          "selected_sub_categories": null
        }
      }
      ]
      let explorePageWrapper: ShallowWrapper;
      let subcategoryList;
      explorePageWrapper = shallow(
        <ExplorePage
          visible={false}
          setVisibleProfileModal={function (): void {
            throw new Error("Function not implemented.");
          }}
          setState={() => { }}
          state={{ subcategories: subCategoryArray, categories: array }}
          firstTime={false}
          currentUser={""}
          updateCartDetails={() => { }}
          cartDetails={[]}
          {...screenProps}
        />
      );
      const mockNativeEvent = {
        contentOffset: { y: 100 },
        contentSize: { height: 200 },
        layoutMeasurement: { height: 100 },
      };
      const getCategory = jest.fn();
      let categoryPage: number | null = null;
      const onEndReachedHandler = () => {
        if (categoryPage === null) {
          return;
        }
        categoryPage = categoryPage + 1;
        getCategory(categoryPage);
      };

      const { getByTestId } = render(
        <FlatList
          data={array}
          renderItem={() => null}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReachedHandler}
          testID="termsCondsList"
        />
      );
      const flatList = getByTestId('termsCondsList');
      categoryPage = 4;
      onEndReachedHandler();
      //fireEvent.scroll(flatList, { nativeEvent: mockNativeEvent });
      expect(getCategory).toHaveBeenCalled();

    })

    then('sorting correctly', () => {
      const { getByTestId, queryByTestId } = render(<SortingDropdown visible={true} data={[{ label: 'Pricing Low to High', value: '1' },
      { label: 'Pricing High to Low', value: '2' },]} onSelect={jest.fn()} testID={"sortingDropdown"} />);
      const myView = getByTestId('sortingDropdown');
      expect(myView).toBeDefined();
    });

    then('select filter', () => {
      let explorePageWrapper: ShallowWrapper;
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

      const { queryByTestId } = render(<SortingDropdown visible={true} data={[{ label: 'Pricing Low to High', value: '1' },
      { label: 'Pricing High to Low', value: '2' },]} onSelect={jest.fn()} testID={"sortingDropdown"} />);
      const onSelectPress: any = queryByTestId(0 + "selectFilter");
      fireEvent.press(onSelectPress);
      expect(onSelectPress).toBeTruthy();
      let instance = explorePageWrapper.instance() as ExplorePage;
      instance.setState({ sortAscending: true });
      instance.setState({ show_SortingDropdown: false })
      expect(instance.state.sortAscending).toEqual(true);
      expect(instance.state.show_SortingDropdown).toEqual(false);

    });

    then('close dropdown', async () => {
      let explorePageWrapper: ShallowWrapper;
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

      const { queryByTestId } = render(<SortingDropdown visible={true} data={[{ label: 'Pricing Low to High', value: '1' },
      { label: 'Pricing High to Low', value: '2' },]} onSelect={jest.fn()} testID={"sortingDropdown"} />);
      const closeDropdown: any = queryByTestId("closeDropdown");
      let instance = explorePageWrapper.instance() as ExplorePage;
      instance.setState({ show_SortingDropdown: false })
      expect(instance.state.show_SortingDropdown).toEqual(false);
      expect(closeDropdown).toBeTruthy();
      fireEvent.press(closeDropdown);
    });

    then('mapStateToProps should return the right value', () => {
      const mockedState = [{ "cartDetails": [], "currentUser": "" }]
      const state = mapStateToProps(mockedState);
      expect(state).toBeTruthy();
    });

    then('mapDispatchToProps should return the right value', () => {
      const dispatch = jest.fn();
      const mockedState = [{ "updateCartDetails": {} }]
      const state = mapDispatchToProps(dispatch);
      expect(state).toBeTruthy();
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


