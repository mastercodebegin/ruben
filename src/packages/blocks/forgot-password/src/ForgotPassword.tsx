import React from "react";

//Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
import { backArrow } from "./assets";
export const configJSON = require("./config");
const emailReg = new RegExp(configJSON?.emailregex);
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            {/* Customizable Area Start */}
            <SafeAreaView style={styles.main}>
              <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backContainer}
                >
                  <Image style={styles.back} source={backArrow} />
                </TouchableOpacity>
                <Text style={styles.header}>
                  Confirm E-Mail to get the link
                </Text>
                <Text style={styles.label}>
                  Enter your E-Mail ID to get the link
                </Text>
                <TextInput
                  containerStyle={{ paddingBottom: 40 }}
                  onchangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                  labeStyle={{ color: "grey" }}
                  placeholder="Email ID"
                  label="Enter Your Email ID"
                />
                <Button
                  label={"Send Link to Reset"}
                  onPress={
                    async () => {                      
                      if( !(emailReg.test(this.state.email))){
                        Alert.alert("Alert", "Please enter valid email");
                        return
                      }
                      let myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                
                      let raw = JSON.stringify({
                        data: {
                          attributes: {
                            email: this.state.email,
                          },
                        },
                      });
                
                      let requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                      };
                
                      fetch(
                        "https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_forgot_password/otps",
                        requestOptions
                      )
                        .then((response) =>{
                          // alert(response.status)
                          if(response.status == 200){
                            Alert.alert("Success", "Check Your Email For Reset Password Link!");
                          }else{
                            Alert.alert("Something went wrong", "Please check the email you have entered is valid or not");
                          }
                         }).catch((error) => console.log("error", "Something went wrong."));
                    }
                  }
                />
              </View>
            </SafeAreaView>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
export const styles = StyleSheet.create({
  backContainer: {
    padding: 5,
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 20,
  },
  back: {
    height: 20,
    width: 20,
  },
  label: {
    fontSize: 17,
    paddingTop: 10,
    color: "grey",
    paddingBottom: 30,
  },
  header: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#5C2221",
  },
  main:{
    flex:1,
    backgroundColor:'#F8F4F4',
  paddingTop:20,},
  containerMobile: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#F8F4F4",
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
  },
  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center",
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1,
  },
});
