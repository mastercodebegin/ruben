import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LIGHT_GREY } from "../assets";
import commonStyle from "../commonStyles";

export const Header = (props: any) => {
  const [selected, setSelected] = useState(
    props?.selected ? props?.selected : "blog"
  );
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
      testID="navigate_to_blogpost_id"
        onPress={() => {
          setSelected("blog");
          props.navigation.navigate('BlogPostStack',{screen:"BlogPost"});
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
      testID="navigate_to_video_library_id"
        onPress={() => {
          setSelected("video");
          props.navigation.navigate("BlogPostStack",{screen:"VideoLibrary"});
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
    paddingVertical: 25,
    backgroundColor: LIGHT_GREY,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: LIGHT_GREY,
  },
  unselected: { color: "grey", fontSize: 19, fontWeight: "normal" },
});
