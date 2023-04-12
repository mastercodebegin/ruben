import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY, DARK_RED, WHITE } from "../assets";
import CommonStyle from "../commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Trigger from "../../../../components/src/CustomTrigger";
import { store } from "../../../../mobile/App";
export default class Setting extends LandingPageController {
  render() {
    const isUser = store.getState().currentUser==='user'
    const logout = () => {
      store.dispatch({type:'UPDATE_USER',payload:'user'})
      AsyncStorage.removeItem("userDetails").then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "EmailAccountLoginBlock" }],
        });
      });
    };
    const myOrders=()=>{
      this.props.navigation.navigate('MyOrdersScreen')
    }
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
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('AboutUs')} style={styles.button}>
                <Text style={styles.options}>About Us</Text>
              </TouchableOpacity>
              {isUser && <TouchableOpacity onPress={myOrders} style={styles.button}>
                <Text style={styles.options}>My Orders</Text>
              </TouchableOpacity>}
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("AnalyticsScreen")} style={styles.button}>
                <Text style={styles.options}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('TermsAndCondition')}
               style={styles.button}>
                <Text style={styles.options}>Terms & conditions</Text>
              </TouchableOpacity>
              {isUser && <View style={styles.button}>
                <View style={styles.triggerContainer}>
                  <Text style={styles.options}>Lifetime Subscription</Text>
                  <Trigger
                    value={this.state.lifeTimeSubscription}
                    setValue={(value) => {
                      this.setState({ lifeTimeSubscription: value });
                    }}
                  />
                </View>
              </View>}
              {isUser && <View style={styles.button}>
                <View style={styles.triggerContainer}>
                  <Text style={styles.options}>Cold Packaging Fee</Text>
                  <Trigger
                    value={this.state.coldPackagingFee}
                    setValue={(value) => {
                      this.setState({ coldPackagingFee: value });
                    }}
                  />
                </View>
              </View>}
              <TouchableOpacity onPress={onpressLogout} style={styles.button}>
                <Text style={styles.options}>Log Out</Text>
              </TouchableOpacity>
              {isUser && <TouchableOpacity style={styles.button}>
                <Text style={[styles.options, { color: "#A0272A" }]}>
                  Delete My Account
                </Text>
              </TouchableOpacity>}
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
    paddingRight:10
  },
});
