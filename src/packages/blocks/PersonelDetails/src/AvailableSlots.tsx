import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PRIMARY } from "../../../components/src/constants";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
import { BUTTON_COLOR_PRIMARY, BUTTON_COLOR_SECONDARY, BUTTON_TEXT_COLOR_PRIMARY, BUTTON_TEXT_COLOR_SECONDARY, TEXT_COLOR } from "../../landingpage/src/assets";
interface ListType {
  selectedSlot: string;
  setSelectedSlot: (val: string) => void;
  slot: string;
}                                                                                                                                                                                            
interface AvailableSlotsTypes {
  list: Array<string>;
  address?: any;
  merchantAddress:{}

}
const RenderList = ({ selectedSlot, setSelectedSlot, slot }: ListType) => (
  <TouchableOpacity
    key={slot}
    onPress={() => setSelectedSlot(slot)}
    style={{
      backgroundColor: selectedSlot === slot ?  BUTTON_COLOR_PRIMARY:BUTTON_COLOR_SECONDARY,
      ...styles.slot,marginHorizontal:"1%"
    }}
  >
    <Text style={{ color: selectedSlot === slot ? BUTTON_TEXT_COLOR_PRIMARY : BUTTON_TEXT_COLOR_SECONDARY }}>
      {`${slot.length < 7 ? "0" : ""}${slot}`}
    </Text>
  </TouchableOpacity>
);
const AvailableSlots = ({ address,merchantAddress, list = [] }: AvailableSlotsTypes) => {
  const [selectedSlot, setSelectedSlot] = useState(list[0]);  
  console.log('merchant address>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',merchantAddress)

  return (
    
    <View style={styles.slots}>
      <View style={styles.blur} />
      <View style={styles.checkBoxContainer}>
        <CheckBox checked setChecked={() => { }} />
        <View style={{flexDirection:"row",flex:1}}>
        <Text
          style={[styles.address,{color:TEXT_COLOR,marginLeft:10}]}
        >{`Pick Up ( ${merchantAddress?.attributes?.address_1} ${merchantAddress?.attributes?.address_2} 
        ${merchantAddress?.attributes?.zipcode} ${merchantAddress?.attributes?.country} )`}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={[styles.availableText,{color:TEXT_COLOR}]}>Available Slots</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:"center"
          }}
        >
          {list.map((slot,index) => (
            <RenderList
              key={index}
              slot={slot}
              
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
export default AvailableSlots;
