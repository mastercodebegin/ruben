import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
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
  setShowMerchantModal: (value: boolean) => void;
  showModal: boolean;
  showMerchantModal: boolean;
  resetStack: (screen: string, params?: any) => void;
  couponCode: string;
  doMerchantSignup: (password: string) => void;
  mEmail: string;
  onChangeMEmail: (text: string) => void;
  mPassword: string;
  onChangeMPassword: (text: string) => void;
  farmName: string;
  onChangeFarmName: (text: string) => void;
  product: string;
  onChangeProduct: (text: string) => void;
  location: string;
  onChangeLocation: (text: string) => void;
  contact: string;
  onChangeContact: (text: string) => void;
  description: string;
  onChangeDescription: (text: string) => void;
  website: string;
  onChangeWebsite: (text: string) => void;
  social: string;
  onChnageSocial: (text: string) => void;
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
  showMerchantModal,
  setShowMerchantModal,
  resetStack,
  couponCode,
  doMerchantSignup,
  mEmail,
  onChangeMEmail,
  mPassword,
  onChangeMPassword,
  farmName,
  onChangeFarmName,
  product,
  onChangeProduct,
  location,
  onChangeLocation,
  contact,
  onChangeContact,
  description,
  onChangeDescription,
  website,
  onChangeWebsite,
  social,
  onChnageSocial,
}: SignupComponentTypes) => {
  const [checked, setChecked] = useState(false);
  const [isMerchant, setIsMerchant] = useState("user");

  return (
    <View style={styles.main}>
      <View style={{ flex: 1 }}>
        <View style={styles.checkUser}>
          <View style={styles.row}>
            <CheckBox
              checked={isMerchant === "user"}
              testID="user_checkBox"
              selectorTestID="user_selector_test_id"
              setChecked={(usr) => setIsMerchant(usr ? "user" : "merchant")}
            />
            <Text style={styles.rememberText}>User</Text>
          </View>
          <View style={styles.row}>
            <CheckBox
              testID="merchant_check_box_id"
              checked={isMerchant === "merchant"}
              setChecked={(usr) => {
                setIsMerchant(!usr ? "user" : "merchant");
              }}
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
              testID="user-email"
              placeholder="Email ID"
            />
            <TextInput
              secureTextEntry
              label="Set Password"
              keyBoardtype="default"
              value={password}
              testID="user_password"
              onchangeText={onchangePassword}
              placeholder="Set Password"
              labeStyle={styles.label}
              containerStyle={styles.containerStyle}
            />
          </View>
        ) : (
          <View>
            <TextInput
              keyBoardtype="email-address"
              onchangeText={onChangeMEmail}
              label="Email ID"
              value={mEmail}
              testID="merchant_mail"
              labeStyle={styles.label}
              containerStyle={styles.containerStyle}
              placeholder="Email ID"
            />
            <TextInput
              secureTextEntry
              keyBoardtype="default"
              onchangeText={onChangeMPassword}
              label="set Password"
              value={mPassword}
              labeStyle={styles.label}
              testID="merchant_password_text_input_id"
              containerStyle={styles.containerStyle}
              placeholder="Set Password"
            />
            <TextInput
              keyBoardtype="default"
              onchangeText={onChangeFarmName}
              label="Name of Farm"
              value={farmName}
              testID="name_of_farm_test_id"
              labeStyle={styles.label}
              containerStyle={styles.containerStyle}
              placeholder="Name of Farm"
            />
            <TextInput
              keyBoardtype="default"
              onchangeText={onChangeProduct}
              label="Products of Farm"
              value={product}
              labeStyle={styles.label}
              testID="product_of_farm_test_id"
              containerStyle={styles.containerStyle}
              placeholder="Products of Farm"
            />
            <TextInput
              label="Location of Farm"
              keyBoardtype="default"
              value={location}
              onchangeText={onChangeLocation}
              labeStyle={styles.label}
              testID="farm_location_test_id"
              placeholder="Location of Farm"
              containerStyle={styles.containerStyle}
            />
            <TextInput
              label="Contact Information"
              keyBoardtype="default"
              value={contact}
              onchangeText={onChangeContact}
              testID="farm_contact_info_id"
              placeholder="Contact Information"
              labeStyle={styles.label}
              containerStyle={styles.containerStyle}
            />
            <TextInput
              keyBoardtype="default"
              onchangeText={onChangeDescription}
              label="Description of the Farm"
              value={description}
              testID="farm_desc_id"
              labeStyle={{ ...styles.label, paddingBottom: 10 }}
              multiline
              containerStyle={styles.containerStyle}
              placeholder="Description of the Farm"
            />
            <TextInput
              label="Farm Website"
              keyBoardtype="default"
              value={website}
              testID="farm_website_id"
              onchangeText={onChangeWebsite}
              labeStyle={styles.label}
              placeholder="Farm Website"
              containerStyle={styles.containerStyle}
            />
            <TextInput
              keyBoardtype="default"
              onchangeText={onChnageSocial}
              label="Farm Social Media"
              testID="farm_social_id"
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
          label={isMerchant === "user" ? "Sign Up" : "Submit Form"}
          onPress={
            checked ? 
            isMerchant === "user"
              ? onpressSignup
              : () => doMerchantSignup(mPassword) 
              : () => Alert.alert('Please accept terms & condition')
          }
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
      {showMerchantModal && (
        <CommonModal
          buttonLabel="Continue as Guest"
          customChildren
          blur
          visible={showMerchantModal}
          //@ts-ignore
          setVisible={setShowMerchantModal}
          transparent
          onpressButton={() => {
            resetStack("MeatLocker", { screen: "LandingPage" });
          }}
        >
          <Text style={styles.text}>
            Thank you for your application! The Meat Locker will react out!
          </Text>
        </CommonModal>
      )}
      <SuccessModal
        onpressClose={() => {
          setShowModal(false);
          resetStack("MeatLocker", { email: email });
        }}
        onCloseTestID="close_modal_test_id"
        couponCode={couponCode}
        onpressContinue={() => resetStack("MeatLocker", { email: email })}
        visible={showModal}
      />
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
  main: { paddingTop: 40, paddingHorizontal: 20, flex: 1, paddingBottom: 20 },
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
  rememberText: { paddingLeft: 10, color: DARK_RED, fontSize: 16 },
});

export default SignupComponent;
