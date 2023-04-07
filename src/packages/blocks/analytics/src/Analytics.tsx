import React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";

import AnalyticsController, { Props, configJSON } from "./AnalyticsController";

export default class Analytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
     <SafeAreaView style={styles.main}>
      <HeaderWithBackArrowTemplate headerText="Analytics" navigation={this.props.navigation}>
      <View style={styles.main}>
        <View>
          <Text>{"Number of Spend"}</Text>
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            <Text style={{fontSize:18}}>{'243201'}</Text>
            <Text style={{fontSize:18}}>{"$ 334456"}</Text>
          </View>
        </View>
      </View>
      </HeaderWithBackArrowTemplate>
     </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  main:{
    flex:1,
  }
});
// Customizable Area End
