import React ,{useContext}from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import CalendarTemplate, {
  Calendarcontext,
} from "../../../../components/src/CalendarTemplate";
import { DARK_RED, MEAT_IMAGE1 } from "../assets";
import DualButton from "../../../../components/src/DualButton";

const ChildrenComponent = () => {
  const contextValue =useContext(Calendarcontext);  
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

        <DualButton disable={contextValue?.disable} button1Label="Decline" button2label="Accept" />
      </View>
    </View>
  );
};
const OrdersScreen = ({ navigation }: any) => {
  return (
      <CalendarTemplate
        header="Orders"
        navigation={navigation}
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
        <ChildrenComponent />
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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
