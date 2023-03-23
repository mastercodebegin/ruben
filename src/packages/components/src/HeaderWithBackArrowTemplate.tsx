import React, { ReactElement } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { LIGHT_GREY, DARK_RED } from "../../blocks/landingpage/src/colors";
const arrowLeft = require("./arrow_left.png");
interface HeaderWithBackArrowTemplateTypes {
  children: ReactElement<any, any>;
  navigation: any;
  headerText: string;
}
const HeaderWithBackArrowTemplate = ({
  children,
  headerText = "",
  navigation,
}: HeaderWithBackArrowTemplateTypes) => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backImage} source={arrowLeft} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};
export default HeaderWithBackArrowTemplate;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: { flexDirection: "row", alignItems: "center",paddingBottom:15 },
  headerText: {
    fontSize: 25,
    paddingLeft: 20,
    color: DARK_RED,
    fontWeight: "400",
  },
  backImage: { height: 20, width: 20 },
  flex: { flex: 1 },
});
