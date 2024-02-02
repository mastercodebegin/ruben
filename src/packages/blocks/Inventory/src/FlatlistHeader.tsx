import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Inventory";
import Dropdown from "./DropDown";
import SearchBarWithFilter from "../../../components/src/SearchBarWithFilter";
import {  WHITE } from "../../../components/src/constants";
import { APP_BACKGROUND, PRIMARY_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
interface HeaderTypes {
  onChangeText: (text: string) => void;
  searchText: string;
  setSelectedDay: (date: string) => void;
  selectedDate: string;
  setSelectedStatus: (status: string) => void;
  selectedStatus: string;
  categoryList: any[];
  searchCategory: (name:string) => void;
  searchCategoryById: (name:string) => void;
}
const FlatListHeader = ({
  onChangeText,
  searchText = "",
  setSelectedDay,
  selectedDate,
  setSelectedStatus,
  selectedStatus,
  categoryList,
  searchCategory,
  searchCategoryById
}: HeaderTypes) => {
  return (
    <>
      <View style={[styles.headerContainer,{backgroundColor:APP_BACKGROUND}]}>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.header,{color:TEXT_COLOR}]}>Inventory</Text>
        </View>
        <SearchBarWithFilter
          searchText={searchText}
          hideFilter
          onChangeText={onChangeText}
          onPressSearchIcon={searchCategoryById}
        />
        <View style={styles.filterContainer}>
          <Dropdown
            selectedDate={selectedDate}
            type="calendar"
            setSelectedDay={setSelectedDay}
            onpress={() => {}}
            label="Date"
          />
          <Dropdown searchCategory={searchCategory} isCategory selectedDate="" data={categoryList} label="Category" />
          <Dropdown
            selectedDate=""
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            data={["Success", "Pending", "Cancelled"]}
            label="Status"
          />
        </View>
      </View>
      <View style={{ backgroundColor: WHITE }}>
        <View style={styles.statusContainer}>
          <View style={{backgroundColor:PRIMARY_COLOR,height:20,width:20,borderRadius:10}} />
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
