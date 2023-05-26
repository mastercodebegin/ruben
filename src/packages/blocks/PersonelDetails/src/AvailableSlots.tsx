import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DARK_RED, PRIMARY } from "../../../components/src/constants";
import { styles } from "./styles";
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
    {list.map((slot) => {
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
    {list.length === 2 && <View style={{ flex: 1 }} />}
  </View>
);
const AvailableSlots = () => {
  const [selectedSlot, setSelectedSlot] = useState(slots[0][0]);
  return (
    <View style={{}}>
      <Text style={{ color: DARK_RED, fontSize: 17, paddingVertical: 20 }}>
        Available Slots
      </Text>
      {slots.map((list) => (
        <RenderList
          key={JSON.stringify(list)}
          list={list}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      ))}
    </View>
  );
};
export default AvailableSlots;
