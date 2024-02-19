import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import CommonStyle from '../../landingpage/src/commonStyles';
import { store } from "../../../components/src/utils";
import BottomTab from "../../landingpage/src/BottomTab/BottomTab";
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Settings5Controller, {
  Props,
} from "./Settings5Controller";
import { APP_BACKGROUND, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";

export default class Settings5 extends Settings5Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const isUser = store.getState().currentUser === "user";

    const myOrders = () => {
      this.props.navigation.navigate("MyOrdersScreen");
    };
    const onpressLogout = () => {
      Alert.alert("Alert", "Are you sure to logout", [
        { text: "YES", onPress: this.clearStorage },
        { text: "CANCEL" },
      ]);
    };
    const onpressDelete = () => {
      Alert.alert("Alert", "Are you sure to delete account", [
        { text: "YES", onPress: this.deleteAccount.bind(this) },
        { text: "CANCEL" },
      ]);
    };
    return (
      <SafeAreaView style={styles.main}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.innercontainer}>
          <Text style={CommonStyle.header}>Settings</Text>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              testID="about_us_screen_test_id"
              onPress={() => this.props.navigation.navigate("AboutUs")}
              style={styles.button}
            >
              <Text style={styles.options}>About Us</Text>
            </TouchableOpacity>
            {isUser && (
              <TouchableOpacity
                testID="my_order_test_id"
                onPress={myOrders}
                style={styles.button}
              >
                <Text style={styles.options}>My Orders</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              testID="analytics_screen_test_id"
              onPress={() =>
                this.props.navigation.navigate("AnalyticsScreen")
              }
              style={styles.button}
            >
              <Text style={styles.options}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="terms_and_conditions_screen_test_id"
              onPress={() =>
                this.props.navigation.navigate("TermsAndCondition")
              }
              style={styles.button}
            >
              <Text style={styles.options}>Terms & conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="contact_us_id"
              onPress={() =>
                this.props.navigation.navigate("ContactUs")
              }
              style={styles.button}
            >
              <Text style={styles.options}>Contact Us</Text>
            </TouchableOpacity>
            {isUser && (
              <View style={styles.button}>
                <View style={styles.triggerContainer}>
                  <Text style={styles.options}>Lifetime Subscription</Text>
                  <Switch
                          trackColor={{false: 'gray', true: PRIMARY_COLOR}}

                          thumbColor={ PRIMARY_COLOR}
                    testID="lifetime_subscription_test_id"
                    value={this.state.lifeTimeSubscription}
                    onValueChange={(value) => {
                      this.setState({ lifeTimeSubscription: value });
                    }}
                  />
                </View>
              </View>
            )}
            {isUser && (
              <View style={styles.button}>
                <View style={styles.triggerContainer}>
                  <Text style={styles.options}>Cold Packaging Fee</Text>
                  <Switch
                      trackColor={{false: 'gray', true: PRIMARY_COLOR}}
                      thumbColor={ PRIMARY_COLOR}
                    testID="cold_packaging_test_id"
                    value={this.state.coldPackagingFee}
                    onValueChange={(value) => {
                      this.setState({ coldPackagingFee: value });
                    }}
                  />
                </View>
              </View>
            )}
            <TouchableOpacity
              testID="log_out_id"
              onPress={onpressLogout}
              style={styles.button}
            >
              <Text style={styles.options}>Log Out</Text>
            </TouchableOpacity>
            {isUser && (
              <TouchableOpacity
              onPress={onpressDelete}
                testID="delete_account_id"
                style={styles.button}
              >
                <Text style={[styles.options, { color: TEXT_COLOR }]}>
                  Delete My Account
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomTab navigation={this.props.navigation} tabName="Settings" />
    </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  button: {
    backgroundColor: SECONDARY_COLOR,
    paddingVertical: 25,
    marginBottom: 10,
    paddingLeft: 20,
    borderRadius: 20,
  },
  main: {
    flex: 1,
    backgroundColor: APP_BACKGROUND,
  },
  innercontainer: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  options: {
    fontSize: 17,
    color: TEXT_COLOR,
    fontWeight: "400",
  },
  triggerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
// Customizable Area End
