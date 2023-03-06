import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import CommonModal from "../../../components/src/CommonModal";
import Button from "../../../components/src/CustomButton";
import CheckBox from "../../../components/src/CustomRadioBtn";
import TextInput from "../../../components/src/CustomTextInput";
import { DARK_RED } from "../../landingpage/src/assets";
import SuccessModal from "./SuccessModal";
interface SignupComponentTypes {
  onPressLogin: () => void;
  onchangePassword: (text: string) => void;
  onchangeEmail: (text: string) => void;
  onpressSignup: () => void;
  email: string;
  password: string;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
  resetStack: (screen: string) => void;
}
const SignupComponent = ({
  onPressLogin,
  onchangeEmail,
  onchangePassword,
  onpressSignup,
  email,
  password,
  showModal,
  setShowModal,
  resetStack,
}: SignupComponentTypes) => {
  const [checked, setChecked] = useState(false);
  const [isMerchant, setIsMerchant] = useState("user");
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebSite] = useState("");
  const [social, setSocial] = useState("");
  const [farmName, setFarmName] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [showMerchantModal, setShowMerchantModal] = useState(false);
  useEffect(() => {
    const Open = Keyboard.addListener("keyboardWillChangeFrame", (state) => {
      setKeyboardOffset(state.endCoordinates.height);
    });
    const Close = Keyboard.addListener("keyboardWillHide", (state) => {
      setKeyboardOffset(0);
    });
    return () => {
      Open.remove();
      Close.remove();
    };
  });
  return (
    <View style={styles.main}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: isMerchant === "merchant" ? 50 : 0,
        }}
        keyboardShouldPersistTaps="always"
        bounces={false}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.checkUser}>
            <View style={styles.row}>
              <CheckBox
                checked={isMerchant === "user"}
                setChecked={(usr) => setIsMerchant(usr ? "user" : "merchant")}
              />
              <Text style={styles.rememberText}>User</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                checked={isMerchant === "merchant"}
                setChecked={(usr) => setIsMerchant(!usr ? "user" : "merchant")}
              />
              <Text style={styles.rememberText}>Merchant</Text>
            </View>
          </View>
          {isMerchant === "user" ? (
            <View>
              <TextInput
                keyBoardtype="email-address"
                onchangeText={onchangeEmail}
                label="Email ID"
                value={email}
                labeStyle={styles.label}
                placeholder="Email ID"
              />
              <TextInput
                secureTextEntry
                label="Password"
                keyBoardtype="default"
                value={password}
                onchangeText={onchangePassword}
                placeholder="Password"
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
              />
            </View>
          ) : (
            <View>
              <TextInput
                keyBoardtype="default"
                onchangeText={setFarmName}
                label="Name of Farm"
                value={farmName}
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
                placeholder="Name of Farm"
              />
              <TextInput
                keyBoardtype="default"
                onchangeText={setProduct}
                label="Products of Farm"
                value={product}
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
                placeholder="Products of Farm"
              />
              <TextInput
                label="Location of Farm"
                keyBoardtype="default"
                value={location}
                onchangeText={setLocation}
                labeStyle={styles.label}
                placeholder="Location of Farm"
                containerStyle={styles.containerStyle}
              />
              <TextInput
                label="Contact Information"
                keyBoardtype="default"
                value={contact}
                onchangeText={setContact}
                placeholder="Contact Information"
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
              />
              <TextInput
                keyBoardtype="default"
                onchangeText={setDescription}
                label="Description of the Farm"
                value={description}
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
                placeholder="Description of the Farm"
              />
              <TextInput
                label="Farm Website"
                keyBoardtype="default"
                value={website}
                onchangeText={setWebSite}
                labeStyle={styles.label}
                placeholder="Farm Website"
                containerStyle={styles.containerStyle}
              />
              <TextInput
                keyBoardtype="default"
                onchangeText={setSocial}
                label="Farm Social Media"
                value={social}
                labeStyle={styles.label}
                containerStyle={styles.containerStyle}
                placeholder="Farm Social Media"
              />
            </View>
          )}
          <View style={styles.remeber}>
            <View style={styles.remeberMe}>
              <CheckBox checked={checked} setChecked={setChecked} />
              <Text style={styles.rememberText}>
                {
                  "By clicking you're agreeing to follow Newsletters and Information"
                }
              </Text>
            </View>
          </View>
          <Button
            label={isMerchant === "user" ? "Sign Up" : "Submit Farm"}
            onPress={onpressSignup}
          />
          <View style={styles.createAcc}>
            <Text style={{ fontSize: 17, color: "#8D7D75" }}>
              {"Already have an account? "}
            </Text>
            <TouchableOpacity onPress={onPressLogin}>
              <Text style={styles.login}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: keyboardOffset }} />
      </ScrollView>
      {showMerchantModal && (
        <CommonModal
          buttonLabel="Continue as Guest"
          customChildren
          blur
          visible={showMerchantModal}
          transparent
        >
          <Text style={styles.text}>
            Thank you for your application! The Meat Locker will react out!
          </Text>
        </CommonModal>
      )}
      {showModal && (
        <SuccessModal
          onpressClose={() => {
            setShowModal(false);
            resetStack("MeatLocker");
          }}
          onpressContinue={() => resetStack("MeatLocker")}
          visible={showModal}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: { paddingTop: 20 },
  text: {
    color: DARK_RED,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    paddingRight: 20,
  },
  checkUser: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  login: {
    color: "#A0272A",
    fontWeight: "bold",
    fontSize: 17,
  },
  main: { paddingTop: 40, paddingHorizontal: 20, flex: 1 },
  createAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  remeber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 15,
    paddingLeft: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingRight: 18,
    paddingTop: 10,
    color: "#5C2221",
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
