import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { DARK_RED } from "../../../components/src/constants";
import { arrowLeft } from "../../landingpage/src/assets";
//@ts-ignore
import ModalDropdownComp from "../../../components/src/ModalDropdownComp";
import moment from "moment";
type StatusType = "cancelled" | "pending" | "success";
const RenderItem = ({item}: any) => {  
  const dropdownCategoryref: any = React.createRef();
  const rowData = ["cancelled", "pending", "success"];
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(
    item?.data?.attributes?.status === 'scheduled' ?
      'pending' : item?.data?.attributes?.status === 'completed' ?
        'success' : item?.data?.attributes?.status);
  return (
    <View style={styles.main}>
      <View style={styles.flex}>
        <Text style={styles.text}>{`ID:${item?.data?.attributes?.ID}`}</Text>
        <Text style={styles.name}>{`${item?.data?.attributes?.name}`}</Text>
        <Text style={styles.text}>{`Date : ${ moment(new Date(item?.data?.attributes?.Date)).format('DD/MM/YYYY')}`}</Text>
        <Text style={styles.text}>{`Item :x${item?.data?.attributes?.items}`}</Text>
      </View>
      <View style={[styles.container]}>
        <Text style={styles.destination}>{"Domestic"}</Text>
      </View>
      <View style={styles.container}>
        <ModalDropdownComp
          onSelect={(_: any, rowData: StatusType) => {
            setSelectedStatus(rowData);
          }}
          options={rowData}
          isFullWidth
          ref={dropdownCategoryref}
          keySearchObject="name"
          _renderCustomModal
          customModal={() => (
            <View style={{ height: 300, width: 300, backgroundColor: 'red' }} />
          )}
          renderRow={(props: any) => {
            return (
              <Text
                style={{
                  ...styles.status,
                  fontWeight: props === selectedStatus ? "bold" : undefined,
                }}
              >
                {props}
              </Text>
            );
          }}
          dropdownStyle={styles.dropdownStyle}
          renderSeparator={(obj: any) => null}
        >
          <TouchableOpacity
            onPress={() => {
              dropdownCategoryref.current._onButtonPress();
            }}
            style={styles.statusContainer}
          >
            <Text
              style={{
                fontSize: 16,
                paddingRight: 10,
                color:
                  selectedStatus === "cancelled"
                    ? "pink"
                    : selectedStatus === "success"
                      ? "green"
                      : "orange",
              }}
            >
              {selectedStatus}
            </Text>
            <Image style={styles.dropDownImage} source={arrowLeft} />
          </TouchableOpacity>
        </ModalDropdownComp>
      </View>
    </View>
  );
};
export default RenderItem;

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  text: {
    color: DARK_RED,
    fontSize: 16,
  },
  name: {
    color: DARK_RED,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
  },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  dropdownStyle: {
    elevation: 8,
    borderRadius: 8,
  },
  dropDownImage: {
    height: 12,
    width: 12,
    transform: [{ rotate: "270deg" }],
    tintColor: "black",
  },
  destination: { color: DARK_RED, fontWeight: "bold", fontSize: 16 },
  flex: { flex: 1 }
});
