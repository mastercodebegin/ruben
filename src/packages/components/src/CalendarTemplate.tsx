import React, { useState, useRef, createContext, Context } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { styles as expStyles } from "../../blocks/landingpage/src/ExploreStore/ExplorePage";
import Calendar from "./Calendar";
const ScreenWidth = Dimensions.get("window").width;
const calculatedScreenW = ScreenWidth - 40;
import {
  WHITE,
  SEARCH,
  EXPLORE_BTN,
  backArrow as BackArrow,
  BUTTON_COLOR_PRIMARY,
  APP_BACKGROUND,
  PRIMARY_COLOR,
  BUTTON_TEXT_COLOR_PRIMARY,
  TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
} from "../../blocks/landingpage/src/assets";
import BottomTab from "../../blocks/landingpage/src/BottomTab/BottomTab";
import CommonLoader from "./CommonLoader";

type OrderItem = {
  id?: number;
  attributes?: {
    price?: number;
    quantity?: number;
    delivered_at?: string;
  };
};

type ItemType = {
  id?: number;
  attributes?: {
    customer?: {
      data?: {
        id?: number;
      };
    };
    order_items?: {
      data: OrderItem[];
    };
  };
};

// @ts-ignore
export const Calendarcontext: Context<{
  disable: boolean;
  item: ItemType;
}> = createContext({ disable: false, item: {} });

interface CalendarTemplateTypes {
  children: React.ReactElement<any, any>;
  header: string;
  backArrow?: boolean;
  animateString1: string;
  animateString2: string;
  selected?: string;
  setSelected?: (text: string) => void;
  onChangeText: (text: string) => void;
  additionalHeader?: React.ReactElement<any, any>;
  navigation?: any;
  showBottomTab?: boolean;
  data: Array<object>;
  extraData?: object;
}

const CalendarTemplate = ({
  children,
  header = "",
  backArrow = false,
  animateString1 = "",
  animateString2 = "",
  selected = "incom",
  setSelected = () => {},
  onChangeText,
  additionalHeader,
  navigation,
  showBottomTab = true,
  data = [],
  extraData = {},
}: CalendarTemplateTypes) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const animate = (value: number, selected: string) => {
    setSelected(selected);
    Animated.timing(AnimatedValue, {
      duration: 700,
      toValue: value,
      useNativeDriver:true
    }).start();
  };
  const headerComponent = () => (
    <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          {backArrow && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingHorizontal: 10 }}
            >
              <Image style={{ height: 20, width: 20 }} source={BackArrow} />
            </TouchableOpacity>
          )}
          <Text style={styles.header}>{header}</Text>
        </View>
        <View style={styles.animatedContainer}>
          <Animated.View
            style={{
              ...styles.animatedView,
              transform: [{ translateX: AnimatedValue }],
            }}
          />
          <TouchableOpacity
            disabled={selected === "incom" || showCalendar}
            onPress={() => animate(0, "incom")}
            style={styles.selectorContainer}
          >
            <Text
              style={[
                styles.selectorText,
                selected === "incom" && styles.selectedStyle,
              ]}
            >
              {animateString1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={selected === "prev" || showCalendar}
            onPress={() => {
              animate(calculatedScreenW / 2, "prev");
            }}
            style={styles.selectorContainer}
          >
            <Text
              style={[
                styles.selectorText,
                selected === "prev" && styles.selectedStyle,
              ]}
            >
              {animateString2}
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
                  tintColor: PRIMARY_COLOR,
                },
              ]}
              source={SEARCH}
            />
            <TextInput
              style={expStyles.textInput}
              editable={!showCalendar}
              placeholder="Search Order"
              placeholderTextColor={SECONDARY_TEXT_COLOR}
              onChangeText={onChangeText}
            />
          </View>
          <View style={{ height: "100%" }}>
            <TouchableOpacity
              onPress={() => setShowCalendar(!showCalendar)}
              style={expStyles.exploreBtn}
            >
              <Image
                style={[expStyles.explore,{tintColor:PRIMARY_COLOR}]}
                resizeMode="contain"
                source={EXPLORE_BTN}
              />
            </TouchableOpacity>
          </View>
          {showCalendar && (
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <Calendar />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {additionalHeader}
      </View>
    </TouchableWithoutFeedback>
  );
  const contextValue = React.useMemo(() => ({ disable: showCalendar }), [
    showCalendar,
  ]);
  return (
    <SafeAreaView style={styles.flex}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={data}
        extraData={extraData}
        onScrollBeginDrag={() => setShowCalendar(false)}
        ListHeaderComponentStyle={{ zIndex: 1000, elevation: 1 }}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }: any) => (
          //@ts-ignoreyarn
          <Calendarcontext.Provider value={{ ...contextValue, item: item }}>
            <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </Calendarcontext.Provider>
        )}
        ListHeaderComponent={headerComponent}
      />
      {showBottomTab && (
        <BottomTab navigation={navigation} tabName="OrdersScreen" />
      )}
    </SafeAreaView>
  );
};
export default CalendarTemplate;
export const styles = StyleSheet.create({
  calendarContainer: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  text: {
    fontSize: 17,
    color: "grey",
  },
  animatedView: {
    position: "absolute",
    height: "100%",
    width: calculatedScreenW / 2,
    backgroundColor: BUTTON_COLOR_PRIMARY,
    borderRadius: 30,
  },
  selectedStyle: {
    color: BUTTON_TEXT_COLOR_PRIMARY,
    fontWeight: "bold",
  },
  selectorText: {
    fontSize: 17,
    paddingVertical: 20,
    color: "grey",
  },
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: APP_BACKGROUND,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
  selectorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: WHITE,
    borderRadius: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
});
