import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import Button from "../../../components/src/CustomButton";
import TextInput from "../../../components/src/CustomTextInput";
import SuccessModal from "./SuccessModal";
interface SignupComponentTypes {
  onPressLogin: () => void;
  onchangePassword: (text: string) => void;
  onchangeEmail: (text: string) => void;
  navigation: any;
}
const SignupComponent = ({
  onPressLogin,
  onchangeEmail,
  onchangePassword,
  navigation,
}: SignupComponentTypes) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.main}>
      <TextInput
        keyBoardtype="email-address"
        onchangeText={onchangeEmail}
        label="Email Id"
        placeholder="Email Id"
      />
      <TextInput
        secureTextEntry
        label="Password"
        keyBoardtype="default"
        onchangeText={onchangePassword}
        placeholder="Password"
        containerStyle={{ paddingTop: 20 }}
      />
      <View style={styles.remeber}>
        <View style={styles.remeberMe}>
          <TouchableOpacity style={styles.checkBox}>
            <View style={styles.dot} />
          </TouchableOpacity>
          <Text style={styles.rememberText}>
            {
              "By clicking you're agreeing to follow Newsletters and Information"
            }
          </Text>
        </View>
      </View>
      <Button
        label={"Sign Up"}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <View style={styles.createAcc}>
        <Text style={{ fontSize: 17, color: "#8D7D75" }}>
          {"Already have an account? "}
        </Text>
        <TouchableOpacity onPress={onPressLogin}>
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
      </View>
      {showModal && (
        <SuccessModal
          onpressClose={() => {
            setShowModal(false);
          }}
          navigation={navigation}
          visible={showModal}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  login: {
    color: "#A0272A",
    fontWeight: "bold",
    fontSize: 17,
  },
  dot: {
    backgroundColor: "#A0272A",
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  main: { paddingTop: 40, paddingHorizontal: 20 },
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
    paddingLeft: 10,
  },
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
  rememberText: { paddingLeft: 10, color: "#A0272A", fontSize: 16 },
});

export default SignupComponent;
