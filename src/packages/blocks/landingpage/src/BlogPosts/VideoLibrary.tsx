import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import LandingPageController from "../LandingPageController";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY, MEAT_IMAGE1, MEAT_IMAGE2, MEAT_IMAGE3 } from "../assets";
const dummyData = [
  { image: MEAT_IMAGE1 },
  { image: MEAT_IMAGE2 },
  { image: MEAT_IMAGE3 },
];
export default class VideoLibrary extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      pause: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={dummyData}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <BlogPostCard item={item} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
  safeArea: {
    backgroundColor: LIGHT_GREY,
    width: Dimensions.get("window").width,
  },
});
