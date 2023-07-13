import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import {
  DARK_RED,
  LIGHT_GREY,
  PRIMARY,
} from "../../../components/src/constants";
import AddAddressModal from './AddAddressModal'
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
  addAddress: (attrs: any) => void;
  isLoading: boolean;
}
interface State {
  showModal: boolean;
}
export default class SavedAddresses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showModal:false
    };
  }
  render() {
    return (
      <View style={[styles.myDetail, { paddingBottom: 10 }]}>
        <View style={styles.seperatorLine}>
          <Text style={[styles.headerText, { textAlign: "center" }]}>
            {"CHOOSE FROM SAVED ADDRESS"}
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
        

        <TouchableOpacity onPress={() => {
          if (!this.props.addressList.length) {
            this.setState({showModal:true})
          }
        }} style={styles.delivery}>
          <Text style={{ color: PRIMARY }}>{this.props.addressList.length ? 'Delivery' : "Add Address"}</Text>
        </TouchableOpacity>
        <AddAddressModal isLoading={this.props.isLoading} addAddress={ this.props.addAddress} setVisible={()=>this.setState({showModal:false})} visible={this.state.showModal}  />
      </View>
    );
  }
}
