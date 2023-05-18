import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import { DARK_RED, LIGHT_GREY ,PRIMARY} from "../../../components/src/constants";

const RenderAddress = ({ title }: any) => (
  <View>
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
        <RenderAddress title="Office Address" />
        <RenderAddress title="Home Address" />
        <RenderAddress title="Other Address" />

        <TouchableOpacity
          style={{
            borderColor: PRIMARY,
            borderWidth: 1,
            alignItems: "center",
            marginTop: 20,
            paddingVertical:12,
            borderRadius:20,
            backgroundColor:LIGHT_GREY
          }}
        >
          <Text style={{color:PRIMARY,}}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
