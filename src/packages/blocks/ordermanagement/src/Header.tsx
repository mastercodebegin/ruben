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
import { styles } from "../../../components/src/CalendarTemplate";
import { PRIMARY_COLOR, SEARCH, SECONDARY_TEXT_COLOR } from "../../landingpage/src/assets";
import { styles as expStyles } from "../../landingpage/src/ExploreStore/ExplorePage";
import { DARK_RED, calendarIcon } from "../../../components/src/constants";
import DisplayCalendar from "../../../components/src/DisplayCalendar";
const ScreenWidth = Dimensions.get("window").width;

const calculatedScreenW = ScreenWidth - 40;
interface MyOrderHeaderTypes {
  navigation: any;
  selected: "incoming" | "previous";
  setSelected: (selected: "incoming" | "previous") => void;
  selectedDay: string | null;
  onDaySelect: (date: string) => void;
  markedDates: any;
  onOpen: () => void;
  onclose: () => void;
  searchOrder: any;
  setOrderNo: (no:string) => void;
  orderNo: string;
  minDate: string | null;
  handleClose: () => 'yes' | 'no';
}
export const MyOrderHeader = ({
  navigation,
  selected = "incoming",
  setSelected,
  onDaySelect,
  markedDates,
  onOpen,
  onclose,
  searchOrder,
  orderNo,
  setOrderNo,
  minDate,
  handleClose
}: MyOrderHeaderTypes) => {
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const calendarRef = useRef();
  const animate = (value: number, selected: "incoming" | "previous") => {
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
        <Text style={styles.header}>{"Orders"}</Text>
      </View>
      <View style={styles.animatedContainer}>
        <Animated.View
          style={{
            ...styles.animatedView,
            transform: [{ translateX: AnimatedValue }],
          }}
        />
        <TouchableOpacity
          disabled={selected === "incoming"}
          testID="incoming_orders_test_id"
          onPress={() => animate(0, "incoming")}
          style={styles.selectorContainer}
        >
          <Text
            style={[
              styles.selectorText,
              selected === "incoming" && styles.selectedStyle,
            ]}
          >
            {"Incoming Orders"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={selected === "previous"}
          testID="previous_orders_test_id"
          onPress={() => {
            animate(calculatedScreenW / 2, "previous");
          }}
          style={styles.selectorContainer}
        >
          <Text
            style={[
              styles.selectorText,
              selected === "previous" && styles.selectedStyle,
            ]}
          >
            {"Previous Orders"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={expStyles.textInputContainer}>
        <View style={[expStyles.searchContainer, { height: 50, paddingHorizontal: 20,borderWidth:.4,borderColor:PRIMARY_COLOR }]}>
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
            style={{ flex: 1, height: "100%", marginRight: 1 }}
            testID="search_order_test_id"
            onChangeText={(text) => {
              setOrderNo(text)
            }}
            value={orderNo}
            keyboardType="number-pad"
            placeholder="Search Order"
            placeholderTextColor={SECONDARY_TEXT_COLOR}
          />
          <TouchableOpacity
            testID="search_order_button_test_id"
            onPress={() => searchOrder(orderNo)}>
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
            //@ts-ignore
            ref={calendarRef}
            setSelectedDay={() => {}}
            selectedDate={""}
            onDayPress={onDaySelect}
            dropdownStyle={{ height: 200 }}
            onClose={onclose}
            markedDates={markedDates}
            minDate={minDate}
            shouldCloseCalendar={handleClose}
          >
            <TouchableOpacity
              testID="calendar_test_id"
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
                onOpen();
                //@ts-ignore
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
