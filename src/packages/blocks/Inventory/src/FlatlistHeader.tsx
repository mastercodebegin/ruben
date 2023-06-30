import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Inventory";
import Dropdown from "./DropDown";
import SearchBarWithFilter from "../../../components/src/SearchBarWithFilter";
import { WHITE } from "../../../components/src/constants";
interface HeaderTypes {
  onChangeText: (text: string) => void;
  searchText:string;
}
const FlatListHeader = ({ onChangeText,searchText='' }: HeaderTypes) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Inventory</Text>
          <TouchableOpacity>
            <Text style={styles.newOrder}>{"+ New Order"}</Text>
          </TouchableOpacity>
        </View>
        <SearchBarWithFilter searchText={searchText} onChangeText={onChangeText} />
        <View style={styles.filterContainer}>
          <Dropdown onpress={() => {}} label="Date" />
          <Dropdown label="Offers" />
          <Dropdown label="Status" />
        </View>
      </View>
      <View style={{ backgroundColor: WHITE }}>
        <View style={styles.statusContainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.headerList}>#Details</Text>
          </View>
          <View style={styles.containerHeader}>
            <Text style={styles.headerList}>Destination</Text>
          </View>
          <View style={styles.containerHeader}>
            <Text style={styles.headerList}>Status</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default FlatListHeader;
