import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import {
  DARK_RED,
  LIGHT_GREY,
  PRIMARY,
} from "../../../components/src/constants";

const addressList = [
  {
    name: "Office Address",
    address: "12 AB building near test road , Dallas",
  },
  {
    name: "Home Address",
    address: "12 AB building near test road , Dallas",
  },
  {
    name: "Other Address",
    address: "12 AB building near test road , Dallas",
  },
];
const RenderAddress = ({ title }: any) => (
  <View key={title}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CheckBox
        backgroundColor={LIGHT_GREY}
        checked={true}
        setChecked={() => {}}
      />
      <Text style={[styles.question, { paddingVertical: 10, paddingLeft: 10 }]}>
        {title}
      </Text>
    </View>
    <Text style={{ color: DARK_RED }}>
      {"12 AB building near test road , Dallas"}
    </Text>
  </View>
);
export default class SavedAddresses extends Component {
  render() {
    return (
      <View style={[styles.myDetail, { paddingBottom: 10 }]}>
        <View style={styles.seperatorLine}>
          <Text style={[styles.headerText, { textAlign: "center" }]}>
            {"CHOOSE FROM SAVED ADDRESSES"}
          </Text>
        </View>
        {addressList.map((item) => {
          return <RenderAddress key={item.name} title={item.name} />;
        })}

        <TouchableOpacity style={styles.delivery}>
          <Text style={{ color: PRIMARY }}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
