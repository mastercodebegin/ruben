import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import ContactusController, { Props } from "./ContactusController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import { LIGHT_GREY, PRIMARY } from "../../../components/src/constants";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { instagram,mail } from "../../landingpage/src/assets";
import QuerySubmittedModal from "./QuerySubmittedModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const webIcon = require('../assets/web.png')
export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <HeaderWithBackArrowTemplate
        navigation={navigation}
        scrollView={false}
        headerText="Contact Us"
      >
        <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:20}}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <TextInput
              textInputStyle={styles.textinput}
              labeStyle={styles.label}
              value={this.state.name}
              testID="name_test_id"
              onchangeText={(name) => {
                this.setState({ name });
              }}
              label="Enter Full Name"
            />
            <TextInput
              textInputStyle={styles.textinput}
              labeStyle={styles.label}
              value={this.state.email}
              testID="email_test_id"
              onchangeText={(email) => this.setState({ email })}
              keyBoardtype="email-address"
              label="Enter Email Address"
            />
            <TextInput
              textInputStyle={[styles.textinput, { height: 120 }]}
              labeStyle={styles.label}
              value={this.state.comments}
              testID="query_test_id"
              onchangeText={(comments) => this.setState({ comments })}
              label="Enter Query"
              multiline
            />
            <Button
              label="Submit"
              testID="submit_query_test_id"
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.addQueryApi()}
            />
            <Button
              label="cancel"
              labelStyle={{
                color: PRIMARY,
                fontSize: 17,
                fontWeight: "normal",
              }}
              style={styles.button}
              onPress={() => {}}
            />
            <Text style={styles.reachOut}>{"or reach out us on"}</Text>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                testID="open_email_test_id"
                onPress={this.handlePressEmail.bind(this)}
                style={styles.socialBtn}
              >
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={mail}
                />
              </TouchableOpacity>
              <TouchableOpacity
                testID="open_instagram_test_id"
                onPress={this.handlePressInstagram.bind(this)}
                style={styles.socialBtn}
              >
                <Image style={styles.image} source={instagram} />
              </TouchableOpacity>
              <TouchableOpacity
                testID="open_web_test_id"
                onPress={this.handlePressWebIcon.bind(this)}
                style={styles.socialBtn}
              >
                <Image style={styles.image} source={webIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <QuerySubmittedModal
            visible={this.state.showSuccessModal}
              setVisible={() => this.setState({ showSuccessModal: false, email: "", name: "", comments: "" })}
              header="Your Query Submitted"
              onPress={() => navigation.navigate("LandingPage")}
              buttonLabel="Continue"
              message="Be Patience! We'll try to solve your issues as soon as possible."
              text="Thank you for reaching out."
          />
        </View>
        </KeyboardAwareScrollView>
      </HeaderWithBackArrowTemplate>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer:{
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainContainer: { flex: 1, backgroundColor: LIGHT_GREY, paddingTop: 20,paddingBottom:20 },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  socialBtn: {
    height: 40,
    width: 40,
    backgroundColor: LIGHT_GREY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: { height: 20, width: 20 },
  textinput: {
    color: "#5C2221",
    flex: 1,
    backgroundColor: "#F8F4F4",
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: "#8D7D75",
    paddingVertical: 10,
  },
  reachOut:{
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  }
});
