import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY } from "../assets";
import commonStyle from "../commonStyles";
import VideoLibrary from "./VideoLibrary";
import Posts from "./Post";
import CommonLoader from "../../../../components/src/CommonLoader";

const deviceWidth = Dimensions.get("window").width;
export default class BlogPost extends LandingPageController {
  render() {
    const onpressBlogPost = () => {
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ blogTab: 0 });
      });
    };
    const onpressVideoLibrary = () => {
      Animated.timing(this.state.animatedValue, {
        toValue: -deviceWidth,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ blogTab: 1 });
      });
    };
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onpressBlogPost}>
            <Text
              style={[
                commonStyle.header,
                styles.header,
                this.state.blogTab != 0 && styles.unselected,
              ]}
            >
              Blog Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onpressVideoLibrary}>
            <Text
              style={[
                commonStyle.header,
                styles.header,
                this.state.blogTab != 1 && styles.unselected,
              ]}
            >
              Video Library
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            ...styles.animated,
            transform: [{ translateX: this.state.animatedValue }],
          }}
        >
          <Posts list={this.state.imageBlogList} getList={()=>this.getblogPosts()} />
          <VideoLibrary list={this.state.videoLibrary} getList={()=>this.getVideoBlog()}/>
        </Animated.View>
        <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
        <CommonLoader visible={this.state.show_loader}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
  unselected: { color: "grey", fontSize: 19, fontWeight: "normal" },
  safeArea: { flex: 1, backgroundColor: LIGHT_GREY },
  container: { flexDirection: "row", alignItems: "center" },
  animated: {
    flex: 1,
    flexDirection: "row",
  },
});
