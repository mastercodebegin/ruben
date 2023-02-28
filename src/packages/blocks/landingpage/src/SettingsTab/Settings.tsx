import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, WHITE } from "../assets";
import CommonStyle from "../commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Setting extends LandingPageController {
  render() {
    const logout = () => {
      AsyncStorage.removeItem("userDetails").then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "EmailAccountLoginBlock" }],
        });
      });
    };
    const onpressLogout = () => {
      Alert.alert("Alert", "Are you sure to logout", [
        { text: "YES", onPress: logout },
        { text: "CANCEL" },
      ]);
    };
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.innercontainer}>
          <Text style={CommonStyle.header}>Settings</Text>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.options}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.options}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.options}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.options}>Terms & conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onpressLogout} style={styles.button}>
              <Text style={styles.options}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.options,{color:'#A0272A'}]}>Delete My Account</Text>
            </TouchableOpacity>
          </View>
        </View>
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
});
