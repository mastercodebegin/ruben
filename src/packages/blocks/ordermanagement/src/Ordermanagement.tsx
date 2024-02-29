import React from "react";
// Customizable Area Start
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import {DARK_RED, LIGHT_GREY} from "../../../components/src/constants";
import RenderItem from "./RenderItem";
import { MyOrderHeader } from "./Header";
import CommonLoader from "../../../components/src/CommonLoader";
import { generateDateObject } from "../../../components/src/utils";
import BottomTab from "../../landingpage/src/BottomTab/BottomTab";
import { APP_BACKGROUND } from "../../landingpage/src/assets";

// Customizable Area End

import OrdermanagementController, {
  Props,
  configJSON,
} from "./OrdermanagementController";

import Moment from "moment";

import { emptyMyOrdersIcon } from "./assets";

export default class Ordermanagement extends OrdermanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.getIncomingOrders = this.getIncomingOrders.bind(this);
    this.handleCalendarClose = this.handleCalendarClose.bind(this);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getIncomingOrders();
  }
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        {/* Customizable Area Start */}
        <SafeAreaView style={styles.main}>
          <View style={styles.main}>
            <View style={{ flex: 1 }}>
              <FlatList
                data={this.getCorrespondingArray()}
                testID="orders_list_id"
                keyExtractor={(item, index) => JSON.stringify(index) + item}
                onEndReached={this.handleLoadMoreDebounced}
                ListFooterComponent={
                  this.state.showPaginationLoader ? (
                    <View style={{ alignItems: "center" }}>
                      <ActivityIndicator size={"large"} />
                    </View>
                  ) : (
                    <></>
                  )
                }
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: APP_BACKGROUND,
                }}
                ListHeaderComponent={
                  <MyOrderHeader
                    selected={this.state.selected}
                    selectedDay={this.state.selectedDate.startDate}
                    orderNo={this.state.searchText}
                    setOrderNo={this.onSetOrderNo.bind(this)}
                    searchOrder={this.searchOrder.bind(this)}
                    minDate={this.state.selectedDate.startDate}
                    markedDates={generateDateObject(
                      this.state.selectedDate.startDate, 
                      this.state.selectedDate.endDate
                        ? this.state.selectedDate.endDate
                        : this.state.selectedDate.startDate
                    )}
                    onDaySelect={this.onDaySelect.bind(this)}
                    onOpen={this.onCalendarOpen.bind(this)}
                    setSelected={this.setSelected}
                    navigation={this.props.navigation}
                    onclose={this.onCloseCalendar.bind(this)}
                    handleClose={this.handleCalendarClose}
                  />
                }
                renderItem={({ item }) => (
                  <RenderItem
                    selectedTab={this.state.selected}
                    acceptDeclineOrders={this.acceptDeclineOrders.bind(this)}
                    item={item}
                  />
                )}
              />
            </View>
            <CommonLoader visible={this.state.showLoader} />
            <BottomTab
              navigation={this.props.navigation}
              tabName="OrdersScreen"
            />
          </View>
        </SafeAreaView>
        {/* Customizable Area End */}
      </View>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  flatlist: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  text: { fontSize: 16, color: "grey" },
  innerContainer: { marginBottom: 20, paddingHorizontal: 20 },
  productName: { fontSize: 16 },
  button: {
    height: 25,
    width: 25,
    backgroundColor: LIGHT_GREY,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: DARK_RED,
  },
  counter: {
    paddingHorizontal: 10,
    color: DARK_RED,
    fontSize: 17,
  },
  counterContainer: { flexDirection: "row", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    color: DARK_RED,
    fontSize: 17,
  },
});
// Customizable Area End
