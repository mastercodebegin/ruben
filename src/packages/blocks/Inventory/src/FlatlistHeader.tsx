import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Inventory";
import Dropdown from "./DropDown";
import SearchBarWithFilter from "../../../components/src/SearchBarWithFilter";
import { WHITE } from "../../../components/src/constants";
interface HeaderTypes {
  onChangeText: (text: string) => void;
  searchText: string;
  setSelectedDay: (date: string) => void;
  selectedDate: string;
  setSelectedStatus: (status: string) => void;
  selectedStatus: string;
}
const FlatListHeader = ({
  onChangeText,
  searchText = "",
  setSelectedDay,
  selectedDate,
  setSelectedStatus,
  selectedStatus
}: HeaderTypes) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Inventory</Text>
          <TouchableOpacity>
            <Text style={styles.newOrder}>{"+ New Order"}</Text>
          </TouchableOpacity>
        </View>
        <SearchBarWithFilter
          searchText={searchText}
          onChangeText={onChangeText}
        />
        <View style={styles.filterContainer}>
          <Dropdown
            selectedDate={selectedDate}
            type="calendar"
            setSelectedDay={setSelectedDay}
            onpress={() => {}}
            label="Date"
          />
          <Dropdown selectedDate="" data={[1, 2, 3, 4, 5]} label="Offers" />
          <Dropdown
            selectedDate=""
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            data={["success", "pending", "canceled"]}
            label="Status"
          />
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
