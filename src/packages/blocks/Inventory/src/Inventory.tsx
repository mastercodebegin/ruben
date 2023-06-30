import React from "react";
import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import MyCartController from "./InventoryController";
import {
  LIGHT_GREY,
  DARK_RED,
  PRIMARY,
} from "../../../components/src/constants";
import RenderItem from "./RenderItem";
import FlatListHeader from "./FlatlistHeader";
export default class Inventory extends MyCartController {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <FlatList
            data={[{}, {}, {}, {}]}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={() => <RenderItem />}
            ListHeaderComponent={
              <FlatListHeader
              searchText={this.state.searchText}
                onChangeText={(text) => this.setState({ searchText: text })}
              />
            }
            keyExtractor={(_, i) => `key${i}`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export const styles = StyleSheet.create({
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
    paddingTop: 10,
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
