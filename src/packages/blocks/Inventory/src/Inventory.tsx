import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import MyCartController from "./InventoryController";
import {
  LIGHT_GREY,
  DARK_RED,
  PRIMARY,
} from "../../../components/src/constants";
import RenderItem from "./RenderItem";
import FlatListHeader from "./FlatlistHeader";
import BottomTab from "../../landingpage/src/BottomTab/BottomTab";

export default class Inventory extends MyCartController {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.inventoryList}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <RenderItem item={item} />}
              onEndReached={this.handleLoadMoreDebounced.bind(this)}
              onEndReachedThreshold={0.1}
              ListEmptyComponent={() => (
                <>
                  {!this.state.loading ? (
                    <View style={{ paddingVertical: 40 }}>
                      <Text style={{ textAlign: "center", fontSize: 17 }}>
                        {"No data found"}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </>
              )}
              ListFooterComponent={
                <>
                  {this.state.loading ? (
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                      <ActivityIndicator size="large" />
                    </View>
                  ) : (
                    <></>
                  )}
                </>
              }
              ListHeaderComponent={
                <FlatListHeader
                  setSelectedStatus={(res) => {
                    this.setState({
                      selectedStatus:
                        this.state.selectedStatus === res ? "" : res,
                      inventoryList: [],
                    });
                    this.getInventoryData.bind(this)(
                      1,
                      this.state.selectedDate
                    );
                  }}
                  selectedStatus={this.state.selectedStatus}
                  searchText={this.state.searchText}
                  selectedDate={this.state.selectedDate}
                  setSelectedDay={(date) => {
                    if (this.state.selectedDate === date) {
                      this.setState({ selectedDate: '', inventoryList: [] });
                      this.getInventoryData.bind(this)(1);
                      return;
                    }
                    this.setState({ selectedDate: date, inventoryList: [] });
                    this.getInventoryData.bind(this)(1, date);
                  }}
                  onChangeText={(text) => this.setState({ searchText: text })}
                />
              }
              keyExtractor={(_, i) => `key${i}`}
            />
          </View>
          <BottomTab navigation={this.props.navigation} tabName="BlogPost" />
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
