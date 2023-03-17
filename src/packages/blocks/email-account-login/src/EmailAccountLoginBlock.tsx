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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import { Logo } from "./assets";
//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

/**
 * called when user presses login or signup it will check email is valid or not
 * @param email String which is going to beckecked valid or not
 * @returns An boolean which reperesents email is valid or not
 */
export const checkValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
import CommonLoader from "../../../components/src/CommonLoader";

// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const onchangeEmail = (text: string) => {
      this.setState({ email: text });
    };
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

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <TouchableWithoutFeedback
              testID={"Background"}
              onPress={() => {
                this.hideKeyboard();
              }}
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
                        ]}
                      >
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
                      onchangeEmail={onchangeEmail}
                      onchangePassword={onchangePassword}
                      email={this.state.email}
                      password={this.state.password}
                      onpressSignup={onpressSignup}
                      onpressLogin={() => {
                        if (this.state.email === "") {
                          Alert.alert("Error", "Email is required");
                          return false;
                        } else if (this.state.password === "") {
                          Alert.alert("Error", "Password is required");
                          return false;
                        }
                        this.setState({showLoader:true})
                        this.btnEmailLogInProps.onPress();
                        return true;
                      }}
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
                      couponCode={this.state.coupon_code}
                      email={this.state.signupEmail}
                      password={this.state.signupPassword}
                      onpressSignup={this.btnSignupPress.onpress}
                      resetStack={this.btnSignupPress.resetStack}
                      onchangePassword={(pass) =>
                        this.setState({ signupPassword: pass })
                      }
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
          </ScrollView>
        </KeyboardAvoidingView>
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
