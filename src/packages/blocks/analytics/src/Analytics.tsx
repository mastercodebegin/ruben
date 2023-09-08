import React from "react";

import {
  // Customizable Area Start
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  SafeAreaView
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import moment from "moment";
import AnimalAnalytics from "./AnimalAnalytics";
import {BarChart} from "react-native-chart-kit";

import {
  DARK_RED,
  PRIMARY,
  WHITE,
  LIGHT_GREY,
  SCREEN_WIDTH,
  calendarIcon,
  BLACK
} from "../../../components/src/constants";
import { store } from "../../../components/src/utils";
import { Dropdown } from "../../../components/src/DropDown/src";
import AnimalChicken from "./AnimalChicken";
import AnimalPig from "./AnimalPig";
import AnalyticsController, { Props } from "./AnalyticsController";
import DisplayCalendar from "../../../components/src/DisplayCalendar";
// Customizable Area End


export default class Analytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.calendarRef = React.createRef();
    this.setState({chartObject: this.convertToChartFormat([], moment(new Date(), "YYYY-MM-DD"))})
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getCategoryList()
  }
  numberWithCommas = (x: string) => {
    return x.toLocaleString();
  };

  isUser = store.getState().currentUser === "user";
  navigation = this.props.navigation;
  data = {
    labels: ['08/09', '08/10', '08/11', '08/12', '08/13', '08/14', '08/15'],
    datasets: [
      { data: [ 0, 0, 0, 0, 0, 0, 0 ],
        colors: [
          (opacity = 1) => LIGHT_GREY,
          (opacity = 1) => LIGHT_GREY,
          (opacity = 1) => LIGHT_GREY,
          (opacity = 1) => LIGHT_GREY,
          (opacity = 1) => DARK_RED,
          (opacity = 1) => LIGHT_GREY,
          (opacity = 1) => LIGHT_GREY]
      }
    ]
  };
  chartConfig = {
    backgroundGradientFrom: WHITE,
    // // decimalPlaces: 0,
    // // barPercentage: 1.0,
    // // fillShadowGradientOpacity: 1,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: WHITE,
    // spacingInner: 1.0,
    backgroundColor: "transparent",
    backgroundGradientToOpacity: 0.0,

    color: () => `black`,
    labelColor: () => `black`,
    withShadow: false,
    barRadius: 13,
    propsForBackgroundLines: {
      strokeWidth: 0,
    }
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
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} testID="goback_navigation">
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
                      style={styles.chartViewHeader} >
                      <View>
                        <Text style={styles.totalIncome}>{"Total Income"}</Text>
                        <Text style={styles.incomeValue}> {`$${this.state.totaAmount}`} </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => { this.calendarToggle(true) }}
                        testID="show_calendar"
                      >
                        <View >
                          <DisplayCalendar
                              ref={this.calendarRef}
                              setSelectedDay={this.handleDateSelected}
                              selectedDate={this.state.startDate}
                              dropdownStyle={{ height: 200 }}
                              onClose={()=> {this.calendarToggle(false);}}
                              markedDates={this.state.markedDates}
                              // onDaySelect={this.handleDateSelected}
                          >
                            <TouchableOpacity
                                onPress={() => {
                                  this.calendarToggle(true);
                                  this.calendarRef.current?._onButtonPress();
                                }}
                            >
                              <View style={styles.calendarButton}>
                                <View>
                                  <Image
                                    style={[styles.backImage,styles.calendarButtonIcon]}
                                    source={calendarIcon}
                                />
                                </View>
                                <Text style={styles.calendarButtonText}>
                                  {this.dateStringToLabelFormat(this.state.startDate)}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </DisplayCalendar>


                        </View>
                      </TouchableOpacity>
                    </View>
                    < View style={{ marginTop: 50 }} testID="bar-chart-wrapper">
                      <BarChart
                        width={SCREEN_WIDTH}
                        height={250}
                        data={this.state.chartObject}
                        withCustomBarColorFromData={true}
                        flatColor={true}
                        fromZero={true}
                        chartConfig={this.chartConfig}
                        showBarTops={false}
                        withHorizontalLabels={false}
                        verticalLabelRotation={0}
                        showValuesOnTopOfBars={true}
                        style={{ marginLeft: -60, backgroundColor: "transparent" }}
                        yAxisLabel={""}
                        yAxisSuffix=""
                      />
                      <View style={[styles.overlay, { height: 20 }]} />
                    </View>
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
                    <Text style={{ fontSize: 20, color: DARK_RED, fontWeight: "600" }}>
                      {`${this.state.numberOfSpend}`}
                    </Text>
                    <Text style={{ fontSize: 20, color: PRIMARY }}>
                      {`$${this.state.numberOfSpendCount}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.dropdownContainer} testID="dropdown-wrapper">
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
                          <Text style={styles.textItem}>{item?.attributes?.name}</Text>
                        </View>
                      )
                    }}
                    value={this.state.category_title}
                  // value={() => this.setValue()}
                  // {...this.DropDownProps}
                  />
                </View>
                <View style={styles.animalImagContainer}>
                  <AnimalAnalytics animalSelectedValue={this.state.animalSelectedValue} navigation={this.state.animalSelectedValue} id={""} />
                  <AnimalChicken animalSelectedValue={this.state.animalSelectedValue} navigation={this.state.animalSelectedValue} id={""} />
                  <AnimalPig animalSelectedValue={this.state.animalSelectedValue} navigation={this.state.animalSelectedValue} id={""} />
                </View>
                <View style={styles.boxContainer}>
                  <View style={styles.box}>
                    <Text style={styles.boxHeader}>Current Animal purchased</Text>
                    <Text style={styles.boxText}>{this.state.category_title}</Text>
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
                    <Text style={styles.boxText}>{'3 (10%)'}</Text>
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
    flexGrow: 1
  },
  seperator: { width: 10 },
  boxContainer: { flexDirection: "row", width: "100%", paddingBottom: 15 },
  boxText: {
    color: DARK_RED,
    fontSize: 17,
    paddingTop: 20,
    fontWeight: "bold",
    textTransform: 'capitalize'
  },
  boxHeader: { fontSize: 17, color: "grey" },
  box: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  numOfSent: { fontSize: 15, color: "grey", paddingBottom: 5 },
  numberOfSent: {
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
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
    color: DARK_RED,
    fontWeight: "400",
  },
  chartView: {
    // paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 375,
    backgroundColor: WHITE
  },
  backImage: { height: 20, width: 20 },
  totalIncome: {
    fontSize: 18, color: DARK_RED, paddingBottom: 5, fontWeight: "600", paddingLeft: 16,
  },
  chartViewHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incomeValue: {
    marginLeft: 16, fontSize: 22, color: DARK_RED, fontWeight: "600"
  },
  calendarButton: {
    display: "flex",
    alignSelf: "flex-end",
    alignContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 16,
    height: 50,
    width: "auto",
    paddingHorizontal: 10,
    minWidth: 150,
    margin: 20,
    marginTop: 0,
    backgroundColor: LIGHT_GREY,
    flexDirection: "row",
  },
  calendarButtonIcon: {
    alignSelf: "center",
    marginRight: 10,
  },
  calendarButtonText: {
    fontSize: 18,
    color: DARK_RED,
    alignSelf: "center",
  },
  flex: { flex: 1 },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 38,
    backgroundColor: WHITE,
    width: SCREEN_WIDTH - 40
  },
  dropdownContainer: {
    backgroundColor: WHITE,
    borderRadius: 10,
    marginBottom: 0
  },
  dropdown: {
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 12,
    shadowColor: BLACK,
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
    borderColor: WHITE,
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
    color: DARK_RED
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
    marginBottom: 10
  }
});
// Customizable Area End
