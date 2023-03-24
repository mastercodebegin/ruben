import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import CalendarTemplate from "../../../../components/src/CalendarTemplate";

import { LIGHT_GREY, DARK_RED, WHITE, PRIMARY, MEAT_IMAGE1 } from "../assets";
import DualButton from "../../../../components/src/DualButton";
const renderItem = () => {
  return (
    <CalendarTemplate
      header="Orders"
      animateString1="incoming Orders"
      animateString2="Previous Orders"
      onChangeText={(text) => {}}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <Image
            style={{ height: 75, width: 75, borderRadius: 20 }}
            source={MEAT_IMAGE1}
          />
          <View style={styles.innerCon}>
            <View style={styles.row}>
              <Text style={styles.headerText}>Vegetables</Text>
              <Text style={styles.text}>$ 22.00 X 3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Order ID:</Text>
              <Text style={styles.text}>123445</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Due Date:</Text>
              <Text style={styles.text}>01-12-2023</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Shipping Time:</Text>
              <Text style={styles.text}>4:50 PM</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Subtotal:</Text>
              <Text style={styles.text}>$ 66.00</Text>
            </View>
          </View>
        </View>

        <DualButton button1Label="Decline" button2label="Accept" />
      </View>
    </CalendarTemplate>
  );
};
const OrdersScreen = () => {
  return (
    <CalendarTemplate
      header="Orders"
      animateString1="incoming Orders"
      animateString2="Previous Orders"
      onChangeText={(text) => {}}
      additionalHeader={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <Text style={styles.header}>JANUARY</Text>
          <Text style={styles.header}>5 ORDERS</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <Image
            style={{ height: 75, width: 75, borderRadius: 20 }}
            source={MEAT_IMAGE1}
          />
          <View style={styles.innerCon}>
            <View style={styles.row}>
              <Text style={styles.headerText}>Vegetables</Text>
              <Text style={styles.text}>$ 22.00 X 3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Order ID:</Text>
              <Text style={styles.text}>123445</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Due Date:</Text>
              <Text style={styles.text}>01-12-2023</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Shipping Time:</Text>
              <Text style={styles.text}>4:50 PM</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Subtotal:</Text>
              <Text style={styles.text}>$ 66.00</Text>
            </View>
          </View>
        </View>

        <DualButton button1Label="Decline" button2label="Accept" />
      </View>
    </CalendarTemplate>
  );
};
export default OrdersScreen;
const styles = StyleSheet.create({
  qText: {
    color: DARK_RED,
    fontSize: 17,
    paddingVertical: 5,
  },
  text: {
    color: DARK_RED,
    fontSize: 17,
    fontWeight: "400",
  },
  headerText: {
    color: DARK_RED,
    fontWeight: "bold",
    fontSize: 17,
    paddingBottom: 10,
  },
  header: {
    color: "grey",
    fontSize: 16,
  },
  innerCon: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  container: {
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
