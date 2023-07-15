import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PRIMARY } from "../../../components/src/constants";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
interface ListType {
  selectedSlot: string;
  setSelectedSlot: (val: string) => void;
  slot: string;
}
interface AvailableSlotsTypes {
  list: Array<string>;
}
const RenderList = ({ selectedSlot, setSelectedSlot, slot }: ListType) => (
  <TouchableOpacity
    key={slot}
    onPress={() => setSelectedSlot(slot)}
    style={{
      backgroundColor: selectedSlot === slot ? PRIMARY : "white",
      ...styles.slot
    }}
  >
    <Text style={{ color: selectedSlot === slot ? "white" : "grey" }}>
      {`${slot.length < 7 ? "0" : ""}${slot}`}
    </Text>
  </TouchableOpacity>
);
const AvailableSlots = ({ list = [] }: AvailableSlotsTypes) => {
  const [selectedSlot, setSelectedSlot] = useState(list[0]);
  return (
    <View style={styles.slots}>
      <View style={styles.blur} />
      <View style={styles.checkBoxContainer}>
        <CheckBox checked setChecked={() => {}} />
        <Text
          style={styles.address}
        >{`Pick Up ( store branch : ljar 12 , asemln , USA)`}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.availableText}>Available Slots</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {list.map((slot) => (
            <RenderList
              key={JSON.stringify(list)}
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
