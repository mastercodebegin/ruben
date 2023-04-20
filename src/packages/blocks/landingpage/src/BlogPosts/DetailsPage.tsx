import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "./Header";
import { sampleProfile, shareIcon, playIcon } from "../assets";
import Video from "react-native-video";
const arrowLeft = require("../../../../components/src/arrow_left.png");

const DetailsPage = ({ route }: any) => {
  const { type, description, name, created_at, url } = route.params;
  const [play, setPlay] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={styles.back} source={arrowLeft} />
        </TouchableOpacity>
        <Header
          selected={type === "image" ? "blog" : "video"}
          navigation={navigation}
        />
      </View>
      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <View style={styles.padding}>
              <View style={styles.blogPostHeader}>
                <Image
                  style={styles.profile}
                  resizeMode="contain"
                  source={sampleProfile}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.time}>{created_at}</Text>
                </View>
                <TouchableOpacity style={{ padding: 5 }}>
                  <Image
                    resizeMode="contain"
                    style={styles.share}
                    source={shareIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.blogText}>{description}</Text>
              {type === "image" ? (
                <Image
                  style={styles.blogImage}
                  resizeMode="stretch"
                  source={{ uri: url }}
                />
              ) : (
                <View style={styles.videoView}>
                  <Video
                    paused={!play}
                    resizeMode="stretch"
                    onLoad={() => {
                      console.log("onload");
                    }}
                    onLoadStart={() => {
                      console.log("onLoadStart");
                    }}
                    repeat
                    style={styles.video}
                    source={{ uri: url }}
                  />
                  <View style={styles.videoContainer}>
                    <TouchableOpacity onPress={() => setPlay(!play)}>
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={playIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsPage;
const styles = StyleSheet.create({
  safearea: { flex: 1 },
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  back: { height: 20, width: 20 },
  blogImage: { width: "100%", borderRadius: 10, height: 200 },
  videoView: { borderRadius: 10, overflow: "hidden" },
  video: { width: "100%", height: Dimensions.get("window").height / 3.5 },
  play: {
    height: 30,
    width: 30,
    tintColor: "grey",
  },
  padding: { paddingHorizontal: 5 },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 10,
  },
  blogText: {
    fontSize: 17,
    color: "#5c2221",
    paddingBottom: 10,
  },
  blogPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profile: { height: 40, width: 40, borderRadius: 20 },
  nameContainer: { flex: 1, paddingLeft: 15 },
  share: { height: 20, width: 20 },
  name: { fontSize: 20, color: "#5c2221", fontWeight: "700" },
  time: { color: "grey", fontSize: 17 },
  videoContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
