import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import { styles as forgotStyle } from "./ForgotPassword";
import TextInput from "../../../components/src/CustomTextInput";
import Button from "../../../components/src/CustomButton";
export default class ResetPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }
  render() {
    const onpressResetPassword = () => {
      if (
        (this.state.resetPassword === "",
        this.state.confirmResetPassword === "")
      ) {
        Alert.alert("Alert", "please enter your password");
        return;
      }else if((this.state.resetPassword !== this.state.confirmResetPassword)){
        Alert.alert('Alert',"Passwords are not matching")
        return;
      }
      let myHeaders = new Headers();
      myHeaders.append("token", this.props?.route?.params?.token);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
       "data": {
       "new_password": this.state.resetPassword,
        "confirm_password": this.state.confirmResetPassword
      }
      });

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_forgot_password/passwords", requestOptions)
  .then(response => response.text())
  .then(result =>{
    Alert.alert('Success','Your password resetted successfully',[{text:'OK',onPress:()=>this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'EmailAccountLoginBlock' }],
    })}])
  })
  .catch(error => {
    console.log('error ',error);
    
    Alert.alert("Error","Something went wrong")
  });
    };

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            <SafeAreaView style={forgotStyle.main}>
              <View style={{ paddingHorizontal: 20 ,paddingTop:25}}>
                <Text style={forgotStyle.header}>Reset Password</Text>
                <Text style={forgotStyle.label}>
                  Enter new password to access your screen
                </Text>
                <TextInput
                  secureTextEntry
                  labeStyle={styles.label}
                  value={this.state.resetPassword}
                  onchangeText={(text) =>
                    this.setState({ resetPassword: text })
                  }
                  label="Password"
                />
                <TextInput
                  secureTextEntry
                  labeStyle={styles.label}
                  value={this.state.confirmResetPassword}
                  onchangeText={(text) =>
                    this.setState({ confirmResetPassword: text })
                  }
                  containerStyle={styles.textinputContainer}
                  label="ReEnter Password"
                />
                <Button
                  label={"Reset Password"}
                  onPress={onpressResetPassword}
                />
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textinputContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  label: { color: "grey" },
});
