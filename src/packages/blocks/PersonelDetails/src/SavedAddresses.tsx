import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import {
  DARK_RED,
  LIGHT_GREY,
  PRIMARY,
} from "../../../components/src/constants";

interface RenderAddressTypes {
  title: string;
  setChecked: () => void;
  checked: boolean;
}
const RenderAddress = ({ title, setChecked, checked }: RenderAddressTypes) => (
  <View key={title}>
    <View style={styles.addressContainer}>
      <TouchableOpacity style={styles.padding} onPress={setChecked}>
        <CheckBox
          backgroundColor={LIGHT_GREY}
          checked={checked}
          disabled
          setChecked={() => {}}
        />
      </TouchableOpacity>
      <Text style={[styles.question, styles.addressText]}>{title}</Text>
    </View>
    <Text style={{ color: DARK_RED }}>
      {"12 AB building near test road , Dallas"}
    </Text>
  </View>
);
interface Props {
  setSelectedAddress: (address: number) => void;
  selectedAddress: number;
  addressList: Array<any>;
}
interface State {}
export default class SavedAddresses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={[styles.myDetail, { paddingBottom: 10 }]}>
        <View style={styles.seperatorLine}>
          <Text style={[styles.headerText, { textAlign: "center" }]}>
            {"CHOOSE FROM SAVED ADDRESSES"}
          </Text>
        </View>
        {this.props.addressList.map((item, index) => {
          return (
            <RenderAddress
              checked={this.props.selectedAddress === index}
              setChecked={() => {
                this.props.setSelectedAddress(index);
              }}
              key={item.name}
              title={item.name}
            />
          );
        })}

        <TouchableOpacity style={styles.delivery}>
          <Text style={{ color: PRIMARY }}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
