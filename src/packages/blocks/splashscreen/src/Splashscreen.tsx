import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {  redShadow,  } from "./assets";
import { BUTTON_COLOR_PRIMARY, BUTTON_TEXT_COLOR_PRIMARY, PRIMARY_COLOR,splashScreenImage } from "../../landingpage/src/assets";
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

import { imgSplash } from "./assets";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  onPressContinue = () => {
    this.props.navigation.navigate("ExplorePage",{isLogin:false});
  };
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Customizable Area Start */}
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={splashScreenImage}
          />
        </View>
        <TouchableOpacity
          onPress={this.onPressContinue}
          style={[styles.continue,{backgroundColor:BUTTON_COLOR_PRIMARY}]}
        >
          <Text style={[styles.text,{color:BUTTON_TEXT_COLOR_PRIMARY}]}>Continue</Text>
        </TouchableOpacity>
        <Image resizeMode="stretch"
         source={redShadow}
          style={styles.shadow} />
        {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F8F4F4",
  },
  image: {
    height: "50%",
    width: "90%",
  },
  continue: {
    borderRadius: 28,
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 20,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    paddingVertical: 15,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F4F4",
  },
  shadow: { height: 50, marginHorizontal: 10, width: "100%" },
});
// Customizable Area End
