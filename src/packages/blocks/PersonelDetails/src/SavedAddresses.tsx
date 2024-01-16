import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import {
  DARK_RED,
  LIGHT_GREY,
  PRIMARY,
} from "../../../components/src/constants";
import AddAddressModal from './AddAddressModal'
import { APP_BACKGROUND, BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY, PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";
const closeIcon =  require("../assets/add.png")
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
          backgroundColor={SECONDARY_COLOR}
          checked={checked}
          disabled
        />
      </TouchableOpacity>
      <Text style={[styles.question, styles.addressText,{color:TEXT_COLOR}]}>{title}</Text>
    </View>
    <Text style={{ color: SECONDARY_TEXT_COLOR }}>
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
  showModal: boolean;
  setShowModal: (va:boolean) => void;
}
interface State {
}
export default class SavedAddresses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={[styles.myDetail, { paddingBottom: 10 }]}>
        <View style={styles.seperatorLine}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={[styles.headerText, { textAlign: "center" ,flex:1}]}>
            {"CHOOSE FROM SAVED ADDRESS"}
            </Text>
            <TouchableOpacity onPress={() => {
              this.props.setShowModal(true)
            }} style={{marginLeft:10}}>
            <Image style={{height:25,width:25, tintColor:PRIMARY_COLOR}} source={closeIcon}/>
            </TouchableOpacity>
          </View>
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
        }} style={[styles.delivery,{backgroundColor:BUTTON_COLOR_PRIMARY}]}>
          <Text style={{ color: BUTTON_TEXT_COLOR_PRIMARY }}>{'Delivery'}</Text>
        </TouchableOpacity>
        {this.props.showModal ? <AddAddressModal isLoading={this.props.isLoading} addAddress={ this.props.addAddress} setVisible={()=>this.props.setShowModal(false)} visible={this.props.showModal}  /> : null}
      </View>
    );
  }
}
