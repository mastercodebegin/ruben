import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { LIGHT_GREY } from "../assets";
import commonStyle from "../commonStyles";

export const Header = (props: any) => {
  const [selected, setSelected] = useState("blog");
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setSelected("blog");
          props.navigation.navigate("BlogPost");
        }}
      >
        <Text
          style={[
            commonStyle.header,
            styles.header,
            selected === "video" && styles.unselected,
          ]}
        >
          Blog Posts
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setSelected("video");
          props.navigation.navigate("VideoLibrary");
        }}
      >
        <Text
          style={[
            commonStyle.header,
            styles.header,
            selected === "blog" && styles.unselected,
          ]}
        >
          Video Library
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
    backgroundColor: LIGHT_GREY,
  },
  container: { flexDirection: "row", alignItems: "center" },
  unselected: { color: "grey", fontSize: 19, fontWeight: "normal" },
});
