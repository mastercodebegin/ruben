import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY } from "../assets";
import LandingPageController from "../LandingPageController";
import BottomTab from "../BottomTab/BottomTab";
import CommonLoader from "../../../../components/src/CommonLoader";
export default class VideoLibrary extends LandingPageController {
  constructor(props: any) {
    super(props);
  }
  async componentDidMount() {
    this.getVideoBlog()
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <View style={{flex:1}}>
          <FlatList
            data={this.state.videoLibrary}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <BlogPostCard  item={item} />
              </View>
            )}
          />
          </View>
          <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
          <CommonLoader visible={this.state.show_loader}/>
        </View>
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
