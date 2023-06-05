import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PRIMARY } from "../../../components/src/constants";
import { styles } from "./styles";
import CheckBox from "../../../components/src/CustomRadioBtn";
const slots = [
  ["6:00 AM ", "7:00 AM ", "8:00 AM "],
  ["9:00 AM ", "10:00 AM", "11:00 AM"],
  ["12:00 AM", "1:00 PM ", "2:00 PM "],
  ["3:00 PM ", "4:00 PM ", "5:00 PM "],
  ["6:00 PM ", "7:00 PM "],
];
interface ListType {
  selectedSlot: string;
  setSelectedSlot: (val: string) => void;
  list: Array<any>;
}
const RenderList = ({ selectedSlot, setSelectedSlot, list }: ListType) => (
  <View style={styles.availableSlot}>
    {list.map((slot: string) => {
      return (
        <TouchableOpacity
          key={slot}
          onPress={() => setSelectedSlot(slot)}
          style={{
            ...styles.slotContainer,
            backgroundColor: selectedSlot === slot ? PRIMARY : "white",
          }}
        >
          <Text style={{ color: selectedSlot === slot ? "white" : "grey" }}>
            {slot}
          </Text>
        </TouchableOpacity>
      );
    })}
    {list.length === 2 && <View style={styles.emptySlot} />}
  </View>
);
const AvailableSlots = () => {
  const [selectedSlot, setSelectedSlot] = useState(slots[0][0]);
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
        {slots.map((list) => (
          <RenderList
            key={JSON.stringify(list)}
            list={list}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        ))}
      </View>
    </View>
  );
};
export default AvailableSlots;
