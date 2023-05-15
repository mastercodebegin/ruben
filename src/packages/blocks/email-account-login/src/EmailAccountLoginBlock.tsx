import React from "react";
// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  SafeAreaView,
} from "react-native";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import { Logo } from "./assets";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export const configJSON = require("./config");
import CommonLoader from "../../../components/src/CommonLoader";

// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  onpressLoginButton(){
      if (this.state.email === "") {
        Alert.alert("Error", "Email is required");
        return false;
      } else if (this.state.password === "") {
        Alert.alert("Error", "Password is required");
        return false;
      }else if (
        this.state.email === null ||
        !this.emailReg.test(this.state.email)
      ) {
        this.showAlert("Error", configJSON.errorEmailNotValid);
        return false;
      }
      this.setState({ showLoader: true })
      this.btnEmailLogInProps.onPress();
      return true;
  }
   onchangeEmail(text: string){
    this.setState({ email: text });
  };
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const onchangePassword = (text: string) => {
      this.setState({ password: text });
    };
    const onpressLogin = () => {
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          selectedTab: true,
          signupEmail: "",
          signupPassword: "",
        });
      });
    };
    const onpressSignup = () => {
      Animated.timing(this.state.animatedValue, {
        toValue: -Dimensions.get("window").width,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ selectedTab: false, email: "", password: "" });
      });
    };
    return (
      // Required for all blocks

      <SafeAreaView style={{ flex: 1 ,backgroundColor:'#F8F4F4'}}>
          <KeyboardAwareScrollView 
          showsVerticalScrollIndicator={false} 
          bounces={false}>
            <TouchableWithoutFeedback
              testID={"Background"}
              onPress={this.hideKeyboard}
            >
              <View style={styles.container}>
                <View style={{ paddingHorizontal: 20 }}>
                  <Image style={styles.logo} source={Logo} />
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={onpressLogin}>
                      <Text
                        style={[
                          styles.header,
                          this.state.selectedTab && styles.selected,
                        ]}>
                        Log In
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onpressSignup}>
                      <Text
                        style={[
                          styles.header,
                          !this.state.selectedTab && styles.selected,
                        ]}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    width: Dimensions.get("window").width * 2,
                    transform: [{ translateX: this.state.animatedValue }],
                    flex: 1,
                  }}
                >
                  <View style={styles.animated}>
                    <LoginComponent
                      onchangeEmail={this.onchangeEmail.bind(this)}
                      onchangePassword={onchangePassword}
                      email={this.state.email}
                      password={this.state.password}
                      onpressSignup={onpressSignup}
                      onpressLogin={this.onpressLoginButton.bind(this)}
                      navigation={this.props.navigation}
                    />
                  </View>
                  <View style={styles.animated}>
                    <SignupComponent
                      showModal={this.state.showModal}
                      setShowModal={(value: boolean) =>
                        this.setState({ showModal: value })
                      }
                      onchangeEmail={(email) =>
                        this.setState({ signupEmail: email })
                      }
                      showMerchantModal={this.state.showMerModal}
                      setShowMerchantModal={(value: boolean) => {
                        this.setState({ showMerModal: value })
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
                        this.setState({ mEmail: mEmail })
                      }}
                      mPassword={this.state.mPassword}
                      onChangeMPassword={(mpass) => {
                        this.setState({ mPassword: mpass })
                      }}
                      farmName={this.state.farmName}
                      onChangeFarmName={(farmText) => {
                        this.setState({ farmName: farmText })
                      }}
                      product={this.state.product}
                      onChangeProduct={(productText) => {
                        this.setState({ product: productText })
                      }}
                      location={this.state.location}
                      onChangeLocation={(locText) => {
                        this.setState({ location: locText })
                      }}
                      contact={this.state.contact}
                      onChangeContact={(contactText) => {
                        this.setState({ contact: contactText })
                      }}
                      description={this.state.description}
                      onChangeDescription={(descriptionText) => {
                        this.setState({ description: descriptionText })
                      }}
                      website={this.state.website}
                      onChangeWebsite={(webText) => {
                        this.setState({ website: webText })
                      }}
                      social={this.state.social}
                      onChnageSocial={(socialText) => {
                        this.setState({ social: socialText })
                      }}

                      doMerchantSignup={this.btnSignupPress.merchantSignup.bind(
                        this
                      )}
                      onPressLogin={onpressLogin}
                    />
                  </View>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
            <CommonLoader visible={this.state.showLoader}/>
          </KeyboardAwareScrollView>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#A0272A",
    height: 9,
    width: 9,
    borderRadius: 4.5,
  },
  createAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  selected: {
    color: "#5C2221",
    fontWeight: "bold",
  },
  remeber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 10,
  },
  animated: {
    width: Dimensions.get("window").width,
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
    paddingRight: 18,
    paddingTop: 10,
    color: "#8D7D75",
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
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F4F4",
  },
  rememberText: { paddingLeft: 15, color: "#A0272A", fontSize: 16 },
});
// Customizable Area End
