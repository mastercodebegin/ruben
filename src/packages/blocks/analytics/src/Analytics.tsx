import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform
  // Customizable Area Start
  , TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions
  // Customizable Area End
} from "react-native";

import AnalyticsController, { Props, configJSON } from "./AnalyticsController";
import { BarChart } from "react-native-chart-kit";
import { SCREEN_WIDTH } from "../../../components/src/constants";
import { colors } from "react-native-elements";


export default class Analytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [60, 45, 28, 80, 99, 43, 80],
          colors:[
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
      backgroundColor:"transparent",
       backgroundGradientToOpacity: 0.0,
      
      color: () => `#ffffff`,
      labelColor: () => `black`,
      withShadow: false,
      barRadius:15,
      propsForBackgroundLines: {
        strokeWidth: 0,
      }
    };
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
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Image
                    style={styles.backImage}
                    source={require("../../../components/src/arrow_left.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>{"Analytics"}</Text>
              </View>
              <View style={styles.main}>
                <View style={styles.chartView}>
                  <Text style={styles.totalIncome}>{"Total Income"}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 22, color: "#5C2221", fontWeight: "600" }}>
                      {"$42,734,00"}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#A0272A" }}>
                      {"$ 334456"}
                    </Text>
                  </View>
                  <View style={{  marginTop: 50 }}>
                    <BarChart
                      width={SCREEN_WIDTH }
                      height={250}
                      data={data}
                      fromZero={true}
                      chartConfig={chartConfig}
                      showBarTops={false}
                      withHorizontalLabels={false}
                      flatColor={true}
                      withCustomBarColorFromData={true}
                      verticalLabelRotation={0}
                      style={{marginLeft: -60, backgroundColor: "transparent"}}
                    />
                  </View>
                </View>
                <View style={styles.numberOfSent}>
                  <Text style={styles.numOfSent}>{"Number of Spend"}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 18, color: "#5C2221" }}>
                      {"243201"}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#A0272A" }}>
                      {"$ 334456"}
                    </Text>
                  </View>
                </View>
                <View style={styles.numberOfSent}>
                  <Text style={{ color: "#5C2221", fontSize: 17 }}>{"Cow"}</Text>
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
    fontSize: 18, color: "#5C2221", paddingBottom: 5, fontWeight: "600",
  },
  flex: { flex: 1 },
});
// Customizable Area End
