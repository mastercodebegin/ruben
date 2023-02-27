import React from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY, MEAT_IMAGE1, MEAT_IMAGE2, MEAT_IMAGE3 } from "../assets";
import commonStyle from "../commonStyles";
const dummyData = [
  { image: MEAT_IMAGE1 },
  { image: MEAT_IMAGE2 },
  { image: MEAT_IMAGE3 },
];
export default class BlogPost extends LandingPageController {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT_GREY }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={dummyData}
            ListHeaderComponent={
              <Text style={[commonStyle.header, styles.header]}>
                Blog Posts
              </Text>
            }
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={{marginBottom:20}}>
                <BlogPostCard item={item} />
              </View>
            )}
          />
        </View>
        <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
});
