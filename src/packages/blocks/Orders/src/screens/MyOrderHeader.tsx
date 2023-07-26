import React, { useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { styles } from "../../../../components/src/CalendarTemplate";
import {
  EXPLORE_BTN,
  SEARCH,
  backArrow,
} from "../../../landingpage/src/assets";
import { styles as expStyles } from "../../../landingpage/src/ExploreStore/ExplorePage";
import { DARK_RED } from "../../../../components/src/constants";
const ScreenWidth = Dimensions.get("window").width;

const calculatedScreenW = ScreenWidth - 40;
interface MyOrderHeaderTypes {
    navigation: any;
    selected: 'completed' | 'ongoing';
    setSelected: (selected: 'completed' | 'ongoing') => void;
}
export const MyOrderHeader = ({ navigation,selected ="ongoing",setSelected}: MyOrderHeaderTypes) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const animate = (value: number, selected: 'completed' | 'ongoing') => {
    setSelected(selected);
    Animated.timing(AnimatedValue, {
      duration: 700,
      toValue: value,
    }).start();
  };
  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 10 }}
        >
          <Image style={{ height: 20, width: 20 }} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.header}>{"My Orders"}</Text>
      </View>
      <View style={styles.animatedContainer}>
        <Animated.View
          style={{
            ...styles.animatedView,
            transform: [{ translateX: AnimatedValue }],
          }}
        />
        <TouchableOpacity
          disabled={selected === "ongoing" || showCalendar}
          onPress={() => animate(0, "ongoing")}
          style={styles.selectorContainer}
        >
          <Text
            style={[
              styles.selectorText,
              selected === "ongoing" && styles.selectedStyle,
            ]}
          >
            {"Ongoing"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={selected === "completed" || showCalendar}
          onPress={() => {
            animate(calculatedScreenW / 2, "completed");
          }}
          style={styles.selectorContainer}
        >
          <Text
            style={[
              styles.selectorText,
              selected === "completed" && styles.selectedStyle,
            ]}
          >
            {"Completed"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={expStyles.textInputContainer}>
        <View style={expStyles.searchContainer}>
          <Image
            resizeMode="stretch"
            style={[
              expStyles.search,
              {
                tintColor: DARK_RED,
              },
            ]}
            source={SEARCH}
          />
          <TextInput
            style={expStyles.textInput}
            editable={!showCalendar}
            placeholder="Search any product..."
            placeholderTextColor={"#8D7D75"}
          />
        </View>
        <View style={{ height: "100%" }}>
          <TouchableOpacity
            onPress={() => setShowCalendar(!showCalendar)}
            style={expStyles.exploreBtn}
          >
            <Image
              style={expStyles.explore}
              resizeMode="contain"
              source={EXPLORE_BTN}
            />
          </TouchableOpacity>
        </View>
        {showCalendar && (
          <TouchableWithoutFeedback>
            <View style={styles.calendarContainer}>{/* <Calendar /> */}</View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};
