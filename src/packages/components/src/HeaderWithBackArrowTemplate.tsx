import React, { ReactElement } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
import { LIGHT_GREY, DARK_RED } from "../../blocks/landingpage/src/colors";
const arrowLeft = require("./arrow_left.png");
interface HeaderWithBackArrowTemplateTypes {
  children: ReactElement<any, any>;
  navigation: any;
  headerText: string;
  scrollView?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
const HeaderWithBackArrowTemplate = ({
  children,
  headerText = "",
  navigation,
  scrollView = false,
  showsVerticalScrollIndicator,
  contentContainerStyle = {},
}: HeaderWithBackArrowTemplateTypes) => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Image style={styles.backImage} source={arrowLeft} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
        {scrollView ? (
          <ScrollView
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            contentContainerStyle={[
              {
                paddingHorizontal: 20,
              },
              contentContainerStyle,
            ]}
            bounces={false}
          >
            {children}
          </ScrollView>
        ) : (
          <>{children}</>
        )}
      </View>
    </SafeAreaView>
  );
};
export default HeaderWithBackArrowTemplate;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 20,
    color: DARK_RED,
    fontWeight: "400",
  },
  backImage: { height: 15, width: 15 },
  flex: { flex: 1 },
});
