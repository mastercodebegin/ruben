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
import { backArrow } from "./assets";
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
        Alert.alert("Alert", "please enter password");
        return;
      }
      //reset password
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
              <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={forgotStyle.backContainer}
                >
                  <Image style={forgotStyle.back} source={backArrow} />
                </TouchableOpacity>
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
