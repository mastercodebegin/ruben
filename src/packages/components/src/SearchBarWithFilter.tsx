import React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { WHITE } from "./constants";
import { EXPLORE_BTN, SEARCH } from "../../blocks/landingpage/src/assets";
//@ts-ignore
import ModalDropdownComp from "./ModalDropdownComp";
interface SearchBarWithFilterTyes {
  onChangeText: (text: string) => void;
  testID?: string;
  searchText: string;
  hideFilter?: boolean;
}
const SearchBarWithFilter = ({
  onChangeText = () => {},
  testID,
  searchText,
  hideFilter=false
}: SearchBarWithFilterTyes) => {
  const dropdownCategoryref: any = React.createRef();

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.searchContainer}>
        <Image resizeMode="stretch" style={styles.search} source={SEARCH} />
        <TextInput
          style={styles.textInput}
          placeholder="Search any Product/Video"
          placeholderTextColor={"#8D7D75"}
          value={searchText}
          testID={testID}
          onChangeText={onChangeText}
        />
      </View>
      {hideFilter?null:<View style={{ height: "100%" }}>
        <ModalDropdownComp
          onSelect={() => {}}
          options={["High to low", "Low to high",]}
          isFullWidth
          ref={dropdownCategoryref}
          keySearchObject="name"
          popupHeight={80}
          renderRow={(props: any) => {
            return <Text style={styles.rendertext}>{props}</Text>;
          }}
          dropdownStyle={styles.dropDown}
          renderSeparator={(obj: any) => null}
        >
          <TouchableOpacity
            onPress={() => {
              dropdownCategoryref.current._onButtonPress();
            }}
            style={styles.exploreBtn}
            testID="sortingDropShow"
          >
            <Image
              style={styles.explore}
              resizeMode="contain"
              source={EXPLORE_BTN}
            />
          </TouchableOpacity>
        </ModalDropdownComp>
      </View>}
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
    height:42,
    width:42,
    backgroundColor:WHITE,
    marginLeft:15,justifyContent:'center',
    alignItems:'center',
    borderRadius:21
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
  dropDown: {
    elevation: 8,
    borderRadius: 8,
  },
  rendertext: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 17,
    color: "black",
  },
});
