import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import OrdersController from "../OrdersController";
import * as constants from "../../../../components/src/constants";
import CalendarTemplate from "../../../../components/src/CalendarTemplate";
import RenderItem from "./RenderItem";
const { LIGHT_GREY, DARK_RED } = constants;

export default class MyOrdersScreen extends OrdersController {
  async componentDidMount(): Promise<void> {
    this.getOrdersList();
  }
  render(): React.ReactNode {
    return (
      <CalendarTemplate
        onChangeText={() => {}}
        animateString1="Ongoing"
        animateString2="Completed"
        header="My Orders"
        navigation={this.props.navigation}
        data={[{}]}
        showBottomTab={false}
        backArrow
      >
        <View style={styles.main}>
          <FlatList
            data={this.state.ordersList}
            keyExtractor={(item, index) => JSON.stringify(index) + item}
            style={{ marginHorizontal: 20 }}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    No Data Found
                  </Text>
                </View>
              );
            }}
            renderItem={RenderItem}
          />
        </View>
      </CalendarTemplate>
    );
  }
}
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
