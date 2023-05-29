import React from "react";
// Customizable Area Start
import {
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
export const configJSON = require("./config");
import CommonLoader from "../../../components/src/CommonLoader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import LoginComponent from "./LoginComponent";
import Header from "./RenderHeader";
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  onpressLoginButton() {
    if (this.state.email === "") {
      Alert.alert("Error", "Email is required");
      return false;
    } else if (this.state.password === "") {
      Alert.alert("Error", "Password is required");
      return false;
    } else if (
      this.state.email === null ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }
    this.setState({ showLoader: true });
    this.btnEmailLogInProps.onPress();
    return true;
  }
  onchangeEmail(text: string) {
    this.setState({ email: text });
  }
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const onchangePassword = (text: string) => {
      this.setState({ password: text });
    };
    const onpressSignup = () => {
      this.props.navigation.navigate("AuthenticationStack", {
        screen: "EmailAccountSignupBlock",
      });
    };
    return (
      <SafeAreaView style={styles.main}>
        <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Header navigation={this.props.navigation} selected="login" />

            <LoginComponent
              onchangeEmail={this.onchangeEmail.bind(this)}
              onchangePassword={onchangePassword}
              email={this.state.email}
              password={this.state.password}
              onpressSignup={onpressSignup}
              onpressLogin={this.onpressLoginButton.bind(this)}
              navigation={this.props.navigation}
            />
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <CommonLoader visible={this.state.showLoader} />
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
