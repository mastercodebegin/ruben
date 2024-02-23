import React, { useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import { styles } from "../../../../components/src/CalendarTemplate";
import { PRIMARY_COLOR, SEARCH, TEXT_COLOR, backArrow } from "../../../landingpage/src/assets";
import { styles as expStyles } from "../../../landingpage/src/ExploreStore/ExplorePage";
import { DARK_RED, calendarIcon } from "../../../../components/src/constants";
import DisplayCalendar from "../../../../components/src/DisplayCalendar";
const ScreenWidth = Dimensions.get("window").width;

const calculatedScreenW = ScreenWidth - 40;
interface MyOrderHeaderTypes {
  navigation: any;
  selected: "completed" | "ongoing";
  setSelected: (selected: "completed" | "ongoing") => void;
  selectedDay: string;
  onDaySelect: (date: string) => void;
  markedDates: any;
  onOpen: () => void;
  onclose: () => void;
  searchOrder: (no: string) => void;
  setOrderNo: (no:string) => void;
  orderNo: string;
  minDate:any
}
export const MyOrderHeader = ({
  navigation,
  selected = "ongoing",
  setSelected,
  onDaySelect,
  markedDates,
  onOpen,
  onclose,
  searchOrder,
  orderNo,
  setOrderNo,
  minDate
}: MyOrderHeaderTypes) => {
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const calendarRef = useRef();
  const animate = (value: number, selected: "completed" | "ongoing") => {
    setSelected(selected);
    Animated.timing(AnimatedValue, {
      duration: 700,
      toValue: value,
      useNativeDriver:true
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
        <Text style={[styles.header,{color:TEXT_COLOR}]}>{"My Orders"}</Text>
      </View>
      <View style={styles.animatedContainer}>
        <Animated.View
          style={{
            ...styles.animatedView,
            transform: [{ translateX: AnimatedValue }],
          }}
        />
        <TouchableOpacity
          disabled={selected === "ongoing"}
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
          disabled={selected === "completed"}
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
        <View style={[expStyles.searchContainer, { height: 50, paddingHorizontal: 20,borderWidth:1,borderColor:PRIMARY_COLOR }]}>
       {(orderNo.length ===0)?<Image
            resizeMode="stretch"
            style={[
              {
                tintColor: PRIMARY_COLOR,
                height: 20,
                width: 20,
                marginRight:10
              },
            ]}
            source={SEARCH}
          />:null}
          <TextInput
            style={{flex:1,height:"100%",marginRight:1,}}
            onChangeText={(text) => {
              setOrderNo(text)
            }}
            value={orderNo}
            keyboardType="number-pad"
            placeholder="Search Order"
            placeholderTextColor={TEXT_COLOR}
          />
          <TouchableOpacity onPress={()=>searchOrder(orderNo)}>
          {(orderNo.length)? <Image
            resizeMode="stretch"
            style={[
              {
                tintColor: PRIMARY_COLOR,
                height: 20,
                width:20
              },
            ]}
            source={SEARCH}
          />:null}
          </TouchableOpacity>
        </View>
        <View style={{ height: "100%" }}>
          <DisplayCalendar
            ref={calendarRef}
            setSelectedDay={() => {}}
            selectedDate={""}
            onDayPress={onDaySelect}
            dropdownStyle={{ height: 200 }}
            onClose={onclose}
            markedDates={markedDates}
            minDate={minDate}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginLeft:20
              }}
              onPress={() => {
                onOpen()
                calendarRef.current._onButtonPress()
              }}
            >
              <Image
                style={[expStyles.explore,{tintColor:PRIMARY_COLOR}]}
                resizeMode="contain"
                source={calendarIcon}
              />
            </TouchableOpacity>
          </DisplayCalendar>
        </View>
      </View>
    </View>
  );
};
