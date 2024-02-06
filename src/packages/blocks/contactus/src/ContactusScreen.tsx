import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import ContactusController, { Props } from "./ContactusController";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { APP_BACKGROUND, BUTTON_TEXT_COLOR_SECONDARY, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, instagram,mail } from "../../landingpage/src/assets";
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
                color: BUTTON_TEXT_COLOR_SECONDARY,
                fontSize: 17,
                fontWeight: "normal",
              }}
              style={styles.button}
              onPress={() => {
                this.setState({ email: "" })
                 this.setState({ name: "" })
                 this.setState({ comments: "" })
              }}
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
                <Image style={[styles.image]} source={instagram} />
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
    backgroundColor:APP_BACKGROUND
  },
  mainContainer: { flex: 1, backgroundColor: APP_BACKGROUND, paddingTop: 20,paddingBottom:20 },
  container: {
    backgroundColor: APP_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  socialBtn: {
    height: 40,
    width: 40,
    backgroundColor: APP_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: { height: 20, width: 20,tintColor:PRIMARY_COLOR },
  textinput: {
    color: TEXT_COLOR,
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: TEXT_COLOR,
    paddingVertical: 10,
  },
  reachOut:{
    textAlign: "center",
    fontSize: 16,
    color: TEXT_COLOR,
  }
});
