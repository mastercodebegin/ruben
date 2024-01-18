import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import DualButton from "../../../components/src/DualButton";
import { DARK_RED, MeatImage } from "../../../components/src/constants";
import moment from "moment";
import { APP_BACKGROUND, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
const ChildrenComponent = ({ acceptDeclineOrders, item }: any) => {
  const deliveryDate = item?.attributes?.delivery_date;
  const isOnGoing = item?.attributes?.status === "on_going";
  const isCancelled = item?.attributes?.status === "cancelled";

  const dataList = [
    {
      name: "Order Number:",
      value: item?.attributes?.order_no,
    },
    {
      name: "Due Date:",
      value: deliveryDate ? moment(deliveryDate).format("DD-MM-YYYY") : "",
    },
    {
      name: "Shipping Time:",
      value: deliveryDate ? moment(deliveryDate).format("hh:mm A") : "",
    },
    {
      name: "Subtotal:",
      value: `$ ${(
        (item?.attributes?.order_items?.data[0]?.attributes?.price || 0) *
        (item?.attributes?.order_items?.data[0]?.attributes?.quantity || 0)
      ).toFixed(2)}`,
    },
  ];
  if (!isOnGoing) {
    dataList.push({
      name: "Status:",
      value: (
        <Text
          style={{ color: isCancelled ? "red" : "green" }}
        >{`${item?.attributes?.status}`}</Text>
      ),
    });
  }
  return (
    <View
      style={{
        paddingBottom: 15,
        marginHorizontal: 20,
      }}
    >
      <View style={[styles.container]}>
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <Image
            style={{ height: 75, width: 75, borderRadius: 20 }}
            source={MeatImage}
          />
          <View style={styles.innerCon}>
            <View style={styles.row}>
              <Text style={styles.headerText}>{item?.attributes?.order_no}</Text>
              <Text style={styles.text}>{`$ ${(
                item?.attributes?.order_items?.data[0]?.attributes?.price || 0
              ).toFixed(2)} x ${
                item?.attributes?.order_items?.data[0]?.attributes?.quantity ||
                0
              }`}</Text>
            </View>
            {dataList.map((item) => (
              <View key={item.name} style={styles.row}>
                <Text style={styles.qText}>{item.name}</Text>
                <Text style={styles.text}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {isOnGoing ? (
          <DualButton
            button1Label="Decline"
            button2label="Accept"
            buttn1TestID="decline_test_id"
            buttn2TestID="accept_test_id"
            button1Onpress={() => {
              if (item.id) acceptDeclineOrders(item?.id, false);
            }}
            button2Onpress={() => {
              if (item.id) acceptDeclineOrders(item?.id, true);
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ChildrenComponent;

const styles = StyleSheet.create({
  qText: {
    color: TEXT_COLOR,
    fontSize: 17,
    paddingVertical: 5,
  },
  text: {
    color: SECONDARY_TEXT_COLOR,
    fontSize: 17,
    fontWeight: "400",
  },
  headerText: {
    color: TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 17,
    paddingBottom: 10,
  },
  header: {
    color: SECONDARY_TEXT_COLOR,
    fontSize: 16,
  },
  innerCon: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  container: {
    backgroundColor: APP_BACKGROUND,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth:.4,
    borderColor:PRIMARY_COLOR
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
