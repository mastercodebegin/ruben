import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import LandingPageController from "../LandingPageController";
import { LIGHT_GREY } from "../assets";
import Posts from "./Post";
import CommonLoader from "../../../../components/src/CommonLoader";
import { Header } from "./Header";

export default class BlogPost extends LandingPageController {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header
          selected={"blog"}
          navigation={this.props.navigation}
        />  
        <View style={styles.flex}>
          <Posts
            list={this.state.imageBlogList}
            getList={() => this.getblogPosts()}
          />
        </View>
        <BottomTab tabName={"BlogPost"} navigation={this.props.navigation} />
        <CommonLoader visible={this.state.show_loader} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
  safeArea: { flex: 1, backgroundColor: LIGHT_GREY },
  container: { flexDirection: "row", alignItems: "center" },
  animated: {
    flex: 1,
    flexDirection: "row",
  },
  flex: { flex: 1 },
});
