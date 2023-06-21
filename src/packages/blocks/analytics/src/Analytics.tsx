import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform
  , TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { colors } from "react-native-elements";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";
  // Customizable Area End

import AnalyticsController, { Props, configJSON } from "./AnalyticsController";
import { SCREEN_WIDTH } from "../../../components/src/constants";
import { upArrow, downArrow } from "../../categoriessubcategories/src/assets";
import { store } from "../../../components/src/utils";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import Calendar from "../../../components/src/Calendar";

export default class Analytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const isUser = store.getState().currentUser === "user";
    const { navigation } = this.props;

    const data = {
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
            (opacity = 1) => `#F8F4F4`]
        }
      ]
    };
    const chartConfig = {
      backgroundGradientFrom: 'white',
      // // decimalPlaces: 0,
      // // barPercentage: 1.0,
      // // fillShadowGradientOpacity: 1,
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: 'white',
      // spacingInner: 1.0,
      backgroundColor: "transparent",
      backgroundGradientToOpacity: 0.0,

      color: () => `#ffffff`,
      labelColor: () => `black`,
      withShadow: false,
      barRadius: 13,
      propsForBackgroundLines: {
        strokeWidth: 0,
      }
    };
    return (
      // Customizable Area Start
      <HeaderWithBackArrowTemplate
        headerText="Analytics"
        navigation={navigation}
      >
        <>
          <ScrollView keyboardShouldPersistTaps="always"
            style={styles.container}
            bouncesZoom={"No"}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.hideKeyboard();
              }}
            >
              {/* Customizable Area Start */}
              <SafeAreaView>
                <View style={styles.main}>
                  <View style={styles.main}>
                    {isUser}
                    <View style={styles.chartView}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }} >
                        <View>
                          <Text style={styles.totalIncome}>{"Total Income"}</Text>
                          <Text style={styles.incomeValue}> {"$42,734,00"} </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {this.setState({showCalendar: true}) }}
                        >
                          <View style={styles.calendarView}>
                            <Image
                              style={[styles.backImage, { marginLeft: 10 }]}
                              source={require("../assets/calendar_icon.png")}
                            />
                            <Text style={{ fontSize: 18, color: "#5C2221", marginLeft: 10 }}>
                              {"March, 2022"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 50 }}>
                        <BarChart
                          width={SCREEN_WIDTH}
                          height={250}
                          data={data}
                          fromZero={true}
                          chartConfig={chartConfig}
                          showBarTops={false}
                          withHorizontalLabels={false}
                          flatColor={true}
                          withCustomBarColorFromData={true}
                          verticalLabelRotation={0}
                          style={{ marginLeft: -60, backgroundColor: "transparent" }}
                        />
                        <View style={[styles.overlay, { height: 20 }]} />
                      </View>
                      {this.state.showCalendar && (
                          <TouchableWithoutFeedback>
                            <View style={styles.calendarContainer}>
                              <Calendar  />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                    </View>
                    <View style={styles.numberOfSent}>
                      <Text style={styles.numOfSent}>{"Number of Spend"}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 20, color: "#5C2221", fontWeight: "600" }}>
                          {"243201"}
                        </Text>
                        <Text style={{ fontSize: 20, color: "#A0272A" }}>
                          {"$3344.56"}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => { console.log("click on cow") }}>
                      <View style={[styles.numberOfSent, { flexDirection: "row", justifyContent: "space-between" }]}>
                        <Text style={{ color: "#5C2221", fontSize: 17, fontWeight: "600" }}>{"Cow"}</Text>
                        <Image
                          style={styles.backImage}
                          source={downArrow}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={[styles.chartView, { marginTop: 50 }]}>
                    </View>

                    <View style={styles.boxContainer}>
                      <View style={styles.box}>
                        <Text style={styles.boxHeader}>Current Animal purchased</Text>
                        <Text style={styles.boxText}>Cow</Text>
                      </View>
                      <View style={styles.seperator} />
                      <View style={styles.box}>
                        <Text style={styles.boxHeader}>Total Cuts</Text>
                        <Text style={styles.boxText}>10</Text>
                      </View>
                    </View>
                    <View style={styles.boxContainer}>
                      <View style={styles.box}>
                        <Text style={styles.boxHeader}>Used cuts</Text>
                        <Text style={styles.boxText}>7</Text>
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
        </>
      </HeaderWithBackArrowTemplate>
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
    color: "#5C2221",
    fontSize: 17,
    paddingTop: 20,
    fontWeight: "bold",
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
    backgroundColor: "#ffffff"
  },
  backImage: { height: 20, width: 20 },
  totalIncome: {
    fontSize: 18, color: "#5C2221", paddingBottom: 5, fontWeight: "600", paddingLeft: 16,
  },
  incomeValue: {
    paddingLeft: 16, fontSize: 22, color: "#5C2221", fontWeight: "600"
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
    position: 'absolute',
    left: 0,
    bottom: 38,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 40
  },
  calendarContainer: {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    zIndex: 100,
  },

});
// Customizable Area End
