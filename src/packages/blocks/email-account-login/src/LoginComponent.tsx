import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Button from "../../../components/src/CustomButton";
import CheckBox from "../../../components/src/CustomRadioBtn";
import TextInput from "../../../components/src/CustomTextInput";

interface LoginComponentTypes {
  onpressSignup: () => void;
  onchangePassword: (text: string) => void;
  onchangeEmail: (text: string) => void;
  navigation: any;
  onpressLogin: () => boolean;
  email: string;
  password: string;
  checked: boolean;
  setChecked: (val: boolean) => void;
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
  onpressLogin,
  email,
  password,
  checked,
  setChecked,
}: LoginComponentTypes) => {
  const onpressForgotPassword = (email: string) => {
    navigation?.navigate("ForgotPassword", { email });
  };
  return (
    <View style={styles.mainContainer}>
      <TextInput
        keyBoardtype="email-address"
        label="Email ID"
        value={email}
        labeStyle={styles.label}
        onchangeText={onchangeEmail}
        placeholder="Email ID"
      />
      <TextInput
        secureTextEntry={true}
        keyBoardtype="default"
        labeStyle={styles.label}
        label="Password"
        value={password}
        onchangeText={onchangePassword}
        placeholder="Password"
        containerStyle={styles.containerStyle}
      />
      <View style={styles.remeber}>
        <View style={styles.remeberMe}>
          <CheckBox testID="remember_me_test_id" checked={checked} setChecked={setChecked} />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => onpressForgotPassword(email)}>
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button testID="do_login_test_id" label={"Log In"} onPress={onpressLogin} />
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
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingRight: 18,
    paddingTop: 10,
    color: "#5C2221",
  },
  label: {
    color: "grey",
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
