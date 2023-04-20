import React from "react";
import { View, FlatList } from "react-native";
import BlogPostCard from "../BlogPostCard";
import LandingPageController from "../LandingPageController";
import BottomTab from "../BottomTab/BottomTab";
import CommonLoader from "../../../../components/src/CommonLoader";
const VideoComponent = ({ data }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <BlogPostCard item={item} />
          </View>
        )}
      />
    </View>
  );
};
export default class VideoLibrary extends LandingPageController {
  constructor(props: any) {
    super(props);
  }
  async componentDidMount() {
    this.getVideoBlog();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <VideoComponent data={this.state.videoLibrary} />
        <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
        <CommonLoader visible={this.state.show_loader} />
      </View>
    );
  }
}
