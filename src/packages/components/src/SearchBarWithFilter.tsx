import React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { WHITE } from "./constants";
import { EXPLORE_BTN, SEARCH } from "../../blocks/landingpage/src/assets";

const SearchBarWithFilter = () => {
  return (
    <View style={styles.textInputContainer}>
      <View style={styles.searchContainer}>
        <Image resizeMode="stretch" style={styles.search} source={SEARCH} />
        <TextInput
          style={styles.textInput}
          placeholder="Search any Product/Video"
          placeholderTextColor={"#8D7D75"}
          value=""
          testID="productSearch"
          onChangeText={(text) => {
            console.log("on change text", text);
          }}
        />
      </View>
      <View style={{ height: "100%" }}>
        <TouchableOpacity style={styles.exploreBtn} testID="sortingDropShow">
          <Image
            style={styles.explore}
            resizeMode="contain"
            source={EXPLORE_BTN}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SearchBarWithFilter;
const styles = StyleSheet.create({
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
    backgroundColor: WHITE,
  },
  exploreBtn: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: WHITE,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderRadius: 25,
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
  explore: { height: 25, width: 25 },
});
