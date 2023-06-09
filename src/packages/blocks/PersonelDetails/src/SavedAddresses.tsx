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
  address:string;
}
const RenderAddress = ({ title, setChecked, checked, address }: RenderAddressTypes) => (
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
      {address}
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
        {
              (this.props.addressList.length === 0)?(
                <Text style={{fontSize:17,paddingTop:20,textAlign:'center'}}>
                  {'No address added'}
                </Text>
              ):
              <>
              {this.props.addressList.map((item, index) => {          
          return (
            <RenderAddress
              checked={this.props.selectedAddress === index}
              setChecked={() => {
                this.props.setSelectedAddress(index);
              }}
              key={item?.attributes?.id}
              address={item?.attributes?.address}
              title={item?.attributes?.address_type}
            />
          );
        })}
              </>

        }
        

        <TouchableOpacity style={styles.delivery}>
          <Text style={{ color: PRIMARY }}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
