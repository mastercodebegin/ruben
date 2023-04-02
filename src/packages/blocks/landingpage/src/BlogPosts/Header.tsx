import React from "react";
import { View,  Text, StyleSheet,TouchableWithoutFeedback } from "react-native";
import { LIGHT_GREY } from "../assets";
import commonStyle from "../commonStyles";

export const Header = ({ props }: any) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("BlogPost");
        }}
      >
        <Text
          style={[
            commonStyle.header,
            styles.header,
            props?.navigation?.getState().index === 1 && styles.unselected,
          ]}
        >
          Blog Posts
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("VideoLibrary");
        }}
      >
        <Text style={[commonStyle.header, styles.header, props?.navigation?.getState().index === 0 && styles.unselected,]}>Video Library</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 ,backgroundColor:LIGHT_GREY},
  container: { flexDirection: "row", alignItems: "center" },
  unselected: { color: "grey", fontSize: 19, fontWeight: "normal" },
});
