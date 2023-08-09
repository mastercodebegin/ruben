import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform,
  // Customizable Area Start
  TouchableOpacity,
  Image,
  SafeAreaView,
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import AnimalAnalytics from "./AnimalAnalytics";
import { BarChart } from "react-native-chart-kit";
import { DARK_RED, SCREEN_WIDTH } from "../../../components/src/constants";
import { store } from "../../../components/src/utils";
import Calendar from "../../../components/src/Calendar";
import moment from "moment";
import { Dropdown } from "../../../components/src/DropDown/src";
import AnimalChicken from "./AnimalChicken";
import AnimalPig from "./AnimalPig";

// Customizable Area End

import AnalyticsController, { Props, configJSON } from "./AnalyticsController";

export default class Analytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getCategoryList();
  }
  numberWithCommas = (x: string) => {
    return x.toLocaleString();
  };

  isUser = store.getState().currentUser === "user";
  navigation = this.props.navigation;
  data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [60, 45, 28, 80, 99, 43, 80],
        colors: [
          (opacity = 1) => `#F8F4F4`,
          (opacity = 1) => `#F8F4F4`,
          (opacity = 1) => `#F8F4F4`,
          (opacity = 1) => `#F8F4F4`,
          (opacity = 1) => `#5C2221`,
          (opacity = 1) => `#F8F4F4`,
          (opacity = 1) => `#F8F4F4`,
        ],
      },
    ],
  };
  chartConfig = {
    backgroundGradientFrom: "white",
    // // decimalPlaces: 0,
    // // barPercentage: 1.0,
    // // fillShadowGradientOpacity: 1,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    // spacingInner: 1.0,
    backgroundColor: "transparent",
    backgroundGradientToOpacity: 0.0,

    color: () => `#ffffff`,
    labelColor: () => `black`,
    withShadow: false,
    barRadius: 13,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          <SafeAreaView>
            <View style={styles.main}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  testID="goback_navigation"
                >
                  <Image
                    style={styles.backImage}
                    source={require("../../../components/src/arrow_left.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>{"Analytics"}</Text>
              </View>
              <View style={styles.main}>
                {this.isUser === false && (
                  <View style={styles.chartView}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.totalIncome}>{"Total Income"}</Text>
                        <Text style={styles.incomeValue}>
                          {" "}
                          {`$${this.state.totaAmount}`}{" "}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ showCalendar: true });
                        }}
                        testID="show_calendar"
                      >
                        <View style={styles.calendarView}>
                          <Image
                            style={[styles.backImage, { marginLeft: 10 }]}
                            source={require("../assets/calendar_icon.png")}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              color: "#5C2221",
                              marginLeft: 10,
                            }}
                          >
                            {"March, 2022"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 50 }} testID="bar-chart-wrapper">
                      <BarChart
                        width={SCREEN_WIDTH}
                        height={250}
                        data={this.data}
                        withCustomBarColorFromData={true}
                        flatColor={true}
                        fromZero={true}
                        chartConfig={this.chartConfig}
                        showBarTops={false}
                        withHorizontalLabels={false}
                        verticalLabelRotation={0}
                        style={{
                          marginLeft: -60,
                          backgroundColor: "transparent",
                        }}
                        yAxisLabel={""}
                        yAxisSuffix=""
                      />
                      <View style={[styles.overlay, { height: 20 }]} />
                    </View>
                    {this.state.showCalendar && (
                      <TouchableWithoutFeedback>
                        <View
                          style={styles.calendarContainer}
                          testID="calendarObject"
                        >
                          <Calendar dateSelected={this.handleDateSelected} />
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                )}

                <View style={styles.numberOfSent}>
                  <Text style={styles.numOfSent}>{"Number of Spend"}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#5C2221",
                        fontWeight: "600",
                      }}
                    >
                      {`${this.state.numberOfSpend}`}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#A0272A" }}>
                      {`$${this.state.numberOfSpendCount}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.dropdownContainer}
                  testID="dropdown-wrapper"
                >
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.containerStyle}
                    data={this.state.categoryList}
                    maxHeight={400}
                    placeholder={this.state.category_title}
                    onChange={this.handleDropdownChange}
                    renderItem={(item: any) => {
                      return (
                        <View>
                          <Text style={styles.textItem}>
                            {item?.attributes?.name}
                          </Text>
                        </View>
                      );
                    }}
                    value={this.state.category_title}
                    // value={() => this.setValue()}
                    // {...this.DropDownProps}
                  />
                </View>

                <View style={styles.animalImagContainer}>
                  <AnimalAnalytics
                    animalSelectedValue={this.state.animalSelectedValue}
                    navigation={this.state.animalSelectedValue}
                    id={""}
                  />
                  <AnimalChicken
                    animalSelectedValue={this.state.animalSelectedValue}
                    navigation={this.state.animalSelectedValue}
                    id={""}
                  />
                  <AnimalPig
                    animalSelectedValue={this.state.animalSelectedValue}
                    navigation={this.state.animalSelectedValue}
                    id={""}
                  />
                </View>

                <View style={styles.boxContainer}>
                  <View style={styles.box}>
                    <Text style={styles.boxHeader}>
                      Current Animal purchased
                    </Text>
                    <Text style={styles.boxText}>
                      {this.state.category_title}
                    </Text>
                  </View>
                  <View style={styles.seperator} />
                  <View style={styles.box}>
                    <Text style={styles.boxHeader}>Total Cuts</Text>
                    <Text style={styles.boxText}>{this.state.totalCuts}</Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={styles.box}>
                    <Text style={styles.boxHeader}>Used cuts</Text>
                    <Text style={styles.boxText}>{this.state.usedCuts}</Text>
                  </View>
                  <View style={styles.seperator} />
                  <View style={styles.box}>
                    <Text style={styles.boxHeader}>Remaining Cuts</Text>
                    <Text style={styles.boxText}>{"3 (10%)"}</Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  seperator: { width: 10 },
  boxContainer: { flexDirection: "row", width: "100%", paddingBottom: 15 },
  boxText: {
    color: "#5C2221",
    fontSize: 17,
    paddingTop: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  boxHeader: { fontSize: 17, color: "grey" },
  box: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  numOfSent: { fontSize: 15, color: "grey", paddingBottom: 5 },
  numberOfSent: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  main: {
    flex: 1,
    backgroundColor: "#F8F4F4",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 20,
    color: "#5C2221",
    fontWeight: "400",
  },
  chartView: {
    // paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 375,
    backgroundColor: "#ffffff",
  },
  backImage: { height: 20, width: 20 },
  totalIncome: {
    fontSize: 18,
    color: "#5C2221",
    paddingBottom: 5,
    fontWeight: "600",
    paddingLeft: 16,
  },
  incomeValue: {
    paddingLeft: 16,
    fontSize: 22,
    color: "#5C2221",
    fontWeight: "600",
  },
  calendarView: {
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    width: 150,
    margin: 20,
    marginTop: 0,
    backgroundColor: "#F8F4F4",
    flexDirection: "row",
  },
  flex: { flex: 1 },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 38,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
  },
  calendarContainer: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 0,
  },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemListStyle: {
    padding: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: DARK_RED,
    paddingVertical: 5,
    marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: DARK_RED,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: DARK_RED,
    fontWeight: "700",
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: DARK_RED,
  },
  containerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 0,
  },
  animalImagContainer: {
    marginBottom: 10,
  },
});
// Customizable Area End

