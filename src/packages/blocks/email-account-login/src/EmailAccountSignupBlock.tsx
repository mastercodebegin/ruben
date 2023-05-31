import React from "react";
import { TouchableWithoutFeedback, SafeAreaView } from "react-native";
import SignupComponent from "./SignupComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export const configJSON = require("./config");
import CommonLoader from "../../../components/src/CommonLoader";
import { styles } from "./styles";

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";
import Header from "./RenderHeader";

export default class EmailAccountSignupBlock extends EmailAccountLoginController {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const onpressLogin = () => {
      this.props.navigation.navigate("AuthenticationStack", {
        screen: "EmailAccountLoginBlock",
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
            <Header navigation={this.props.navigation} selected="signup"/>
            <SignupComponent
              showModal={this.state.showModal}
              setShowModal={(value: boolean) =>
                this.setState({ showModal: value })
              }
              onchangeEmail={(email) => this.setState({ signupEmail: email })}
              showMerchantModal={this.state.showMerModal}
              setShowMerchantModal={(value: boolean) => {
                this.setState({ showMerModal: value });
              }}
              couponCode={this.state.coupon_code}
              email={this.state.signupEmail}
              password={this.state.signupPassword}
              onpressSignup={this.btnSignupPress.onpress}
              resetStack={this.btnSignupPress.resetStack}
              onchangePassword={(pass) =>
                this.setState({ signupPassword: pass })
              }
              mEmail={this.state.mEmail}
              onChangeMEmail={(mEmail) => {
                this.setState({ mEmail: mEmail });
              }}
              mPassword={this.state.mPassword}
              onChangeMPassword={(mpass) => {
                this.setState({ mPassword: mpass });
              }}
              farmName={this.state.farmName}
              onChangeFarmName={(farmText) => {
                this.setState({ farmName: farmText });
              }}
              product={this.state.product}
              onChangeProduct={(productText) => {
                this.setState({ product: productText });
              }}
              location={this.state.location}
              onChangeLocation={(locText) => {
                this.setState({ location: locText });
              }}
              contact={this.state.contact}
              onChangeContact={(contactText) => {
                this.setState({ contact: contactText });
              }}
              description={this.state.description}
              onChangeDescription={(descriptionText) => {
                this.setState({ description: descriptionText });
              }}
              website={this.state.website}
              onChangeWebsite={(webText) => {
                this.setState({ website: webText });
              }}
              social={this.state.social}
              onChnageSocial={(socialText) => {
                this.setState({ social: socialText });
              }}
              doMerchantSignup={this.btnSignupPress.merchantSignup.bind(this)}
              onPressLogin={onpressLogin}
            />
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <CommonLoader visible={this.state.showLoader} />
      </SafeAreaView>
    );
  }
}
