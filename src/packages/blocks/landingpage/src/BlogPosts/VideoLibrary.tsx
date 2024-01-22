import React from "react";
import { View, FlatList } from "react-native";
import BlogPostCard from "../BlogPostCard";
import LandingPageController from "../LandingPageController";
import BottomTab from "../BottomTab/BottomTab";
import CommonLoader from "../../../../components/src/CommonLoader";
import { LIGHT_GREY } from "../../../../components/src/constants";
import { Header } from "./Header";
const VideoComponent = ({ data }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{backgroundColor:LIGHT_GREY,flexGrow:1}}
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
        <Header
          selected={"video"}
          navigation={this.props.navigation}
        />  
        <VideoComponent data={this.state.videoLibrary} />
        <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
        <CommonLoader visible={this.state.show_loader} />
      </View>
    );
  }
}
