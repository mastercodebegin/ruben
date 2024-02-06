import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LIGHT_GREY,  } from "../assets";
import commonStyle from "../commonStyles";

export const Header = (props: any) => {

  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
      testID="navigate_to_blogpost_id"
        onPress={() => {
          props.navigation.navigate('BlogPostStack',{screen:"BlogPost"});
        }}
      >
        <Text
          style={[
            styles.header,
            props?.selected === "video" ? styles.unselected : commonStyle.header,
          ]}
        >
          Blog Posts
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
      testID="navigate_to_video_library_id"
        onPress={() => {
          props.navigation.navigate("BlogPostStack",{screen:"VideoLibrary"});
        }}
      >
        <Text
          style={[
            styles.header,
            props?.selected === "blog" ? styles.unselected : commonStyle.header,
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
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: LIGHT_GREY,
  },
  unselected: { color: "grey", fontSize: 19, fontWeight: "normal" },
});
