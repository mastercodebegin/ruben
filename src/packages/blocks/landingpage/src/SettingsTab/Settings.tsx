import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, WHITE } from "../assets";
import CommonStyle from "../commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../../components/src/utils";
export default class Setting extends LandingPageController {
  render() {
    const isUser = store.getState().currentUser === "user";
    const logout = () => {
      store.dispatch({ type: "UPDATE_USER", payload: "user" });
      store.dispatch({ type: "UPDATE_CART_DETAILS", payload: [] });
      AsyncStorage.removeItem("userDetails")
        .then(() => {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "AuthenticationStack" }],
          });
        })
        .catch(() => {
          Alert.alert("Error", "Something went wrong");
        });
    };
    const myOrders = () => {
      this.props.navigation.navigate("MyOrdersScreen");
    };
    const onpressLogout = () => {
      Alert.alert("Alert", "Are you sure to logout", [
        { text: "YES", onPress: logout },
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
              {isUser && (
                <View style={styles.button}>
                  <View style={styles.triggerContainer}>
                    <Text style={styles.options}>Lifetime Subscription</Text>
                    <Switch
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
                  testID="delete_account_id"
                  style={styles.button}
                >
                  <Text style={[styles.options, { color: "#A0272A" }]}>
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
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: WHITE,
    paddingVertical: 25,
    marginBottom: 10,
    paddingLeft: 20,
    borderRadius: 20,
  },
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  innercontainer: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  options: {
    fontSize: 17,
    color: DARK_RED,
    fontWeight: "400",
  },
  triggerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
