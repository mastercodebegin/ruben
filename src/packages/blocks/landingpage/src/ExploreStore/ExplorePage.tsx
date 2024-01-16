import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  RefreshControl,
  FlatList,
} from "react-native";
import CartDetails from "../Cart";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, WHITE } from "../../assets/constants";
import { SEARCH, EXPLORE_BTN, CHICKEN, MID_PEACH, PRIMARY, TEXT_COLOR, APP_BACKGROUND, BUTTON_TEXT_COLOR_PRIMARY, SECONDARY_TEXT_COLOR, BUTTON_COLOR_PRIMARY, PRIMARY_COLOR, BUTTON_COLOR_SECONDARY, SECONDARY_COLOR, BUTTON_TEXT_COLOR_SECONDARY } from "../assets";
import BottomTab from "../BottomTab/BottomTab";
import RenderItems from "../RenderItems/RenderItems";
import { connect } from "react-redux";
import DualButton from "../../../../components/src/DualButton";
import CommonLoader from "../../../../components/src/CommonLoader";
import RenderCategories from "./RenderCategories";
import SortingDropdown from "../../../../components/src/SortingDropdown";

export class ExplorePage extends LandingPageController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);
  }
  async componentDidMount() {
    this.getCategory.bind(this)(1);
    this.getProductList(this.state.sortAscending);
  }
   renderItem = ({ item, index }: any) => {
    

    return (
      <TouchableOpacity
        testID={index + "selectedSubscategory"}
        onPress={() =>
          {this.getProductBySubcategory.bind(this)(this.state.selectedCat)
          this.setState({ selectedSub: item?.id })}
        }
        style={[
          styles.subcategory,
          {
            backgroundColor:
              this.state.selectedSub === item?.id
                ? BUTTON_COLOR_PRIMARY
                : BUTTON_COLOR_SECONDARY,
          },
        ]}
      >
        <Image
          style={{
            height: 25,
            width: 25,
            marginRight: 10,
            tintColor: this.state.selectedSub==item?.id ? BUTTON_COLOR_SECONDARY:BUTTON_COLOR_PRIMARY ,
          }}
          source={CHICKEN}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: this.state.selectedSub==item?.id ? BUTTON_TEXT_COLOR_PRIMARY :BUTTON_TEXT_COLOR_SECONDARY,
            fontWeight: "500",
          }}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            testID="scrollview"
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                testID="refereshcontrol"
                onRefresh={() => {
                  this.setState({ refresh: true });
                  this.getCategory.bind(this)(1, false);
                }}
              />
            }
            style={styles.main}
          >
            <View style={styles.innerContainer}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.header}>Store </Text>
                <View style={styles.textInputContainer}>
                  <View style={styles.searchContainer}>
                    <Image
                      resizeMode="stretch"
                      style={[styles.search,{tintColor:PRIMARY_COLOR}]}
                      source={SEARCH}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Search any Product/Video"
                      placeholderTextColor={TEXT_COLOR}
                      value={this.state.searchText}
                      testID="productSearch"
                      onChangeText={(searchText) => {
                        if (!searchText) {
                          this.setState({ showSearchResults: false });
                        }
                        this.setState({ searchText });
                      }}
                      onSubmitEditing={() => this.handleSearchProduct()}
                    />
                  </View>
                  <View style={{ height: "100%" }}>
                    <TouchableOpacity
                      style={styles.exploreBtn}
                      testID="sortingDropShow"
                      onPress={() =>
                        this.setState({ show_SortingDropdown: true })
                      }
                    >
                      <Image
                        style={[styles.explore,{tintColor:BUTTON_COLOR_PRIMARY}]}
                        resizeMode="contain"
                        source={EXPLORE_BTN}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FlatList
                data={this.state.categories}
                horizontal
                style={{ marginLeft: 20 }}
                bounces={false}
                testID="termsCondsList"
                showsHorizontalScrollIndicator={false}
                onEndReached={() => {
                  if (this.categoryPage === null) {
                    return;
                  }
                  this.categoryPage = this.categoryPage + 1;
                  this.getCategory.bind(this)(this.categoryPage);
                }}
                renderItem={({ item, index }:any) => {                  
                  return (
                    <RenderCategories
                      onpress={() => {
                        this.setState({selectedCat: item?.id,isCallingFromStore:true,subCategoryList:[]})
                        this.getSubcategories.bind(this)(item?.id)
                        }}
                      item={item}
                      index={index}
                      selectedCategory={this.state.selectedCat}
                    />
                  );
                }}
              />
              <FlatList
                data={this.state.subCategoryList}
                horizontal
                bounces={false}
                testID="subcategoryList"
                style={{ marginLeft: 20 }}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderItem}
              />
             {this.state.productList?.map((item:any,index:number)=>{
                const {attributes} = item;         
                return(
                  this.state.selectedCat || this.state.selectedSub == '' ?
                  <>
                  {attributes?.catalogue?.catalogues?.data.length > 0 &&
                  <View style={styles.productWrap}>
                    <View style={styles.productContainer}>
                      <Text style={styles.itemCategory}>{attributes.name}</Text>
                      {attributes?.catalogue.catalogues_count > 8 &&
                      <Text onPress={()=>this.props.navigation.navigate("ViewProduct",{category: attributes})} style={styles.seeText}>SEE ALL</Text>}
                    </View>
                    <RenderItems
                      navigation={this.props.navigation}
                      onPressCart={this.addToCart.bind(this)}
                      onpressFav={this.AddToFavorites.bind(this)}
                      testID="products_list_id2"
                      handleLoadMore={() => { this.handleLoadMore() }}
                      item={attributes?.catalogue?.catalogues?.data}
                      header={true}
                      rating={true}
                    />
                  </View>}
                  </>:
                (this.state.selectedCat ==  attributes?.id) &&
                    <View style={styles.productWrap}>
                      <View style={styles.productContainer}>
                        <Text style={styles.itemCategory}>{attributes.name}</Text>
                        {attributes?.catalogue.catalogues_count > 8 &&
                        <Text onPress={()=>this.props.navigation.navigate("ViewProduct",{category: attributes})} style={styles.seeText}>SEE ALL</Text>}
                      </View>
                      <RenderItems
                        navigation={this.props.navigation}
                        onPressCart={this.addToCart.bind(this)}
                        onpressFav={this.AddToFavorites.bind(this)}
                        testID="products_list_id2"
                        handleLoadMore={() => { this.handleLoadMore() }}
                        item={attributes?.catalogue?.catalogues?.data}
                        header={true}
                        rating={true}
                      />
                    </View>
                )
              })}
              
            </View>
          </ScrollView>
          {this.props.currentUser === "user" ? (
            <>
              {this.props.cartDetails.length > 0 && (
                <CartDetails numberOfItem={this.props.cartDetails.length} />
              )}
            </>
          ) : (
            <DualButton
              containerStyle={styles.dualButton}
              button2Onpress={() =>
                this.props.navigation.navigate("AddProducts")
              }
              button1Onpress={()=>this.props.navigation.navigate("Inventory")}
              buttn2TestID="add_product_test_id"
              buttn1TestID="inventory_test_id"
              button1Label="Inventory"
              button2label="+ Add products"
            />
          )}
        </View>
        <BottomTab navigation={this.props.navigation} tabName={"Explore"} />
        {this.state.show_loader && (
          <CommonLoader visible={this.state.show_loader} />
        )}
        {
          <SortingDropdown
            visible={this.state.show_SortingDropdown}
            testID={"sortingDropdown"}
            data={[
              { label: "Low to High", value: "1" },
              { label: "High to Low", value: "2" },
            ]}
            onSelect={(item) => {
              this.setState({
                sortAscending: item.value === "1",
                show_SortingDropdown: false,
              });
              this.getProductList(item.value === "1");
              this.setState({ show_SortingDropdown: false });
            }}
            onpressButton={() => {
              this.setState({ show_SortingDropdown: false });
            }}
          />
        }
      </SafeAreaView>
    );
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCartDetails: (payload: any) => {
      dispatch({ type: "UPDATE_CART_DETAILS", payload: payload });
    },
  };
};

export const mapStateToProps = (reducer: any) => {
  return {
    currentUser: reducer?.currentUser,
    cartDetails: reducer.cartDetails,
  };
};
const ReduxExplorePage: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorePage);
export default ReduxExplorePage;

export const styles = StyleSheet.create({
  dualButton: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subContainer: { flexDirection: "row", paddingHorizontal: 20 },
  subcategory: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 25,
    marginTop: 20,
    flexDirection: "row",
    paddingHorizontal: 15,
    overflow: "hidden",
    paddingLeft: 14,
  },
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 30,
  },
  header: {
    fontWeight: "700",
    fontSize: 24,
    color: TEXT_COLOR,
  },
  textInput: {
    backgroundColor: WHITE,
    paddingRight: 10,
    flex: 1,
    paddingLeft: 10,
    color: "black",
    borderRadius: 22,
    paddingVertical: Platform.OS === "ios" ? 15 : undefined,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
    zIndex: 100,
  },
  search: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: APP_BACKGROUND,
  },
  exploreBtn: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  flatList: { marginLeft: 20, paddingTop: 20 },
  explore: { height: 25, width: 25 },

  rating: {
    color: APP_BACKGROUND,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: APP_BACKGROUND,
    width: "50%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: "50%",
    height: "50%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  productWrap:{
    padding:20
  },
  productContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  itemCategory: {
    color: TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 17,
  },
  seeText:{
    color:SECONDARY_TEXT_COLOR,
    fontWeight: "bold",
  }
});
