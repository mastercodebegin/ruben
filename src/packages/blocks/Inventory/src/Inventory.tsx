import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyCartController from "./InventoryController";
import {
  LIGHT_GREY,
  DARK_RED,
  PRIMARY,
} from "../../../components/src/constants";
import SearchBarWithFilter from "../../../components/src/SearchBarWithFilter";
import Dropdown from "./DropDown";
import { WHITE } from "../../landingpage/src/colors";
//@ts-ignore
// import ModalDropdownComp from "../../../components/src/ModalDropdownComp";
export default class Inventory extends MyCartController {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.header}>Inventory</Text>
              <TouchableOpacity>
                <Text style={styles.newOrder}>{"+ New Order"}</Text>
              </TouchableOpacity>
            </View>
            <SearchBarWithFilter />
            <View style={styles.filterContainer}>
              <Dropdown
                onpress={()=>{}}
                label="Date"
              />
              <View style={styles.seperator} />
              <Dropdown label="Offers" />
              <View style={styles.seperator} />
              <Dropdown label="Status" />
            </View>
          </View>
          {/* <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.statusContainer}>
              <View style={styles.containerHeader}>
                <Text style={styles.headerList}>#Detail</Text>
              </View>
              <View style={styles.containerHeader}>
                <Text style={styles.headerList}>Destination</Text>
              </View>
              <View style={styles.containerHeader}>
                <Text style={styles.headerList}>Status</Text>
              </View>
            </View>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: LIGHT_GREY },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    color: DARK_RED,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newOrder: { color: PRIMARY, fontWeight: "bold", fontSize: 17 },
  seperator: { width: 10 },
  filterContainer: { flexDirection: "row", justifyContent: "space-between" },
  headerList: {
    color: "gray",
  },
  containerHeader: { flex: 1, alignItems: "center" },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
});
