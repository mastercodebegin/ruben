import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./styles";
import { Logo } from "./assets";
interface HeaderTypes {
  navigation: any;
  selected: "login" | "signup";
}
const Header = ({ navigation, selected }: HeaderTypes) => (
  <View
    style={{
      paddingHorizontal: 20,
    }}
  >
    <Image style={styles.logo} source={Logo} />
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        testID="go_to_login_test_id"
        onPress={() =>
          navigation.navigate("AuthenticationStack", {
            screen: "EmailAccountLoginBlock",
          })
        }
      >
        <Text style={[styles.header, selected === "login" && styles.selected]}>
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="go_to_sign_up_test_id"
        onPress={() =>
          navigation.navigate("AuthenticationStack", {
            screen: "EmailAccountSignupBlock",
          })
        }
      >
        <Text style={[styles.header, selected === "signup" && styles.selected]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
export default Header;
