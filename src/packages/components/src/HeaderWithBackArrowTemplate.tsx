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
  RefreshControl,
} from "react-native";
import { LIGHT_GREY, DARK_RED } from "../../blocks/landingpage/src/colors";
import { APP_BACKGROUND, PRIMARY_COLOR, TEXT_COLOR } from "../../blocks/landingpage/src/assets";
const arrowLeft = require("./arrow_left.png");
interface HeaderWithBackArrowTemplateTypes {
  children: ReactElement<any, any>;
  navigation: any;
  headerText: string;
  scrollView?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshControl?: boolean;
  bounces?: boolean;
  scrollViewStyle?: StyleProp<ViewStyle>;
  onPressBack?: () => void;
  onPressBackTestId?: string;
}
const HeaderWithBackArrowTemplate = ({
  children,
  headerText = "",
  navigation,
  scrollView = false,
  showsVerticalScrollIndicator,
  contentContainerStyle = {},
  onRefresh,
  refreshing = false,
  refreshControl,
  bounces = false,
  scrollViewStyle,
  onPressBack,
  onPressBackTestId
}: HeaderWithBackArrowTemplateTypes) => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            testID={'back_btn_test_id'}
            style={{ padding: 5 }}
            onPress={onPressBack ? onPressBack : () => navigation.goBack()}
          >
            <Image style={[styles.backImage,{tintColor:PRIMARY_COLOR}]} source={arrowLeft} />
          </TouchableOpacity>
          <Text style={[styles.headerText,{color:TEXT_COLOR}]}>{headerText}</Text>
        </View>
        {scrollView ? (
          <ScrollView
            refreshControl={
              refreshControl ? (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              ) : (
                undefined
              )
            }
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            contentContainerStyle={[
              {
                paddingHorizontal: 20,
              },
              contentContainerStyle,
            ]}
            bounces={bounces}
            style={scrollViewStyle}
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
    backgroundColor: APP_BACKGROUND,
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
    color: TEXT_COLOR,
    fontWeight: "400",
  },
  backImage: { height: 15, width: 15 },
  flex: { flex: 1 },
});
