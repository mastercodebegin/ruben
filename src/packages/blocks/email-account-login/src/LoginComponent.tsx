import React from "react";
//
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Button from "../../../components/src/CustomButton";
import TextInput from "../../../components/src/CustomTextInput";
//@ts-ignore
import { NavigationActions, StackActions } from "react-navigation";

interface LoginComponentTypes {
  onpressSignup: () => void;
  onchangePassword: (text: string) => void;
  onchangeEmail: (text: string) => void;
  navigation: any;
}
/**
 *
 * @param param0
 * @returns
 */
const LoginComponent = ({
  onpressSignup,
  onchangePassword,
  onchangeEmail,
  navigation,
}: LoginComponentTypes) => {
  const resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "LandingPage" })],
    });
    navigation.dispatch(resetAction);
  };
  const onPressLogin = () => {
    resetStack();
  };
  return (
    <View style={styles.mainContainer}>
      <TextInput
        keyBoardtype="email-address"
        label="Email Id"
        onchangeText={onchangeEmail}
        placeholder="Email Id"
      />
      <TextInput
        secureTextEntry
        keyBoardtype="default"
        label="Password"
        onchangeText={onchangePassword}
        placeholder="Password"
        containerStyle={styles.containerStyle}
      />
      <View style={styles.remeber}>
        <View style={styles.remeberMe}>
          <TouchableOpacity style={styles.checkBox}>
            <View style={styles.dot} />
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button label={"Log In"} onPress={onPressLogin} />
      <View style={styles.createAcc}>
        <Text style={styles.text}>{"Don't have an account ? "}</Text>
        <TouchableOpacity onPress={onpressSignup}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#A0272A",
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  containerStyle: { paddingTop: 20 },
  createAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  remeber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 10,
  },
  text: { fontSize: 17, color: "#8D7D75" },
  checkBox: {
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 9,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingRight: 18,
    paddingTop: 10,
    color: "#5C2221",
  },
  label: {
    fontSize: 15,
  },
  textinput: {
    borderBottomColor: "#8D7D75",
    borderBottomWidth: 1,
    color: "black",
  },
  remeberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 70,
    backgroundColor: "red",
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F4F4",
  },
  rememberText: { paddingLeft: 15, color: "#A0272A", fontSize: 16 },
  mainContainer: { paddingTop: 40, paddingHorizontal: 20 },
  signup: {
    color: "#A0272A",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default LoginComponent;
