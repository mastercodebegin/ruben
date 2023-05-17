import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
export default class SavedAddresses extends Component {
  render() {
    return (
      <View style={styles.myDetail}>
        <View style={styles.seperatorLine}>
          <Text style={[styles.headerText, { textAlign: "center" }]}>
            {"CHOOSE FROM SAVED ADDRESSES"}
          </Text>
        </View>
        <Text>Office Address</Text>
      </View>
    );
  }
}
