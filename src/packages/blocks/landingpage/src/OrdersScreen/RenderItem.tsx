import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import DualButton from "../../../../components/src/DualButton";
import { MEAT_IMAGE1 } from "../assets";
import { DARK_RED } from "../../../../components/src/constants";

const ChildrenComponent = ({ acceptDeclineOrders, item }: any) => {  
  const dd_mm_yy = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear().toString().slice(2)}`;
  const hh_mm_am_pm = (date: Date) =>
    `${(date.getHours() % 12).toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getHours() < 12 ? "AM" : "PM"}`;

  return (
    <View
      style={{
        paddingBottom: 15,
        marginHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <Image
            style={{ height: 75, width: 75, borderRadius: 20 }}
            source={MEAT_IMAGE1}
          />
          <View style={styles.innerCon}>
            <View style={styles.row}>
              <Text style={styles.headerText}>{item?.id}</Text>
              <Text style={styles.text}>{`$ ${(
                item?.attributes?.order_items?.data[0]?.attributes
                  ?.price || 0
              ).toFixed(2)} x ${
                item?.attributes?.order_items?.data[0]?.attributes
                  ?.quantity || 0
              }`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Order ID:</Text>
              <Text style={styles.text}>{item?.id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Due Date:</Text>
              <Text style={styles.text}>
                {item?.attributes?.order_items?.data[0]?.attributes
                  ?.delivered_at
                  ? dd_mm_yy(
                      new Date(
                        item?.attributes?.order_items?.data[0]?.attributes?.delivered_at
                      )
                    )
                  : ""}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Shipping Time:</Text>
              <Text style={styles.text}>
                {item?.attributes?.order_items?.data[0]?.attributes
                  ?.delivered_at
                  ? hh_mm_am_pm(
                      new Date(
                        item?.attributes?.order_items?.data[0]?.attributes?.delivered_at
                      )
                    )
                  : ""}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.qText}>Subtotal:</Text>
              <Text style={styles.text}>{`$ ${(
                (item?.attributes?.order_items?.data[0]?.attributes
                  ?.price || 0) *
                (item?.attributes?.order_items?.data[0]?.attributes
                  ?.quantity || 0)
              ).toFixed(2)}`}</Text>
            </View>
          </View>
        </View>

        <DualButton
          button1Label="Decline"
          button2label="Accept"
          button1Onpress={() => {
            if (item.id) acceptDeclineOrders(item?.id, false);
          }}
          button2Onpress={() => {
            if (item.id) acceptDeclineOrders(item?.id, true);
          }}
        />
      </View>
    </View>
  );
};

export default ChildrenComponent;

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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
