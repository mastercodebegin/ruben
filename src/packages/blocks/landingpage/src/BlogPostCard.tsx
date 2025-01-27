import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Clipboard,
  Platform,
} from "react-native";
import {  shareIcon, playIcon, splashScreenImage, TEXT_COLOR, SECONDARY_TEXT_COLOR, PRIMARY_COLOR } from "./assets";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { shareURL } from "../../../components/src/constants";
import { showToast } from "../../../components/src/ShowToast";
interface Types {
  item: any;
  type?: string;
  index?: number;
  visibleItem?: number;
}
const sampleProfile = require('../assets/logo.png')
const BlogPostCard = ({ item, type }: Types) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback
        testID="navigate_to_details_page_test_id"
        onPress={() =>
          navigation.navigate("DetailsPage", {
            name: item?.attributes?.name,
            created_at: item?.attributes?.created_at,
            url:
              type === "image"
                ? item?.attributes?.images[0]?.url
                : item?.attributes?.videos[0]?.url,
            description: item?.attributes?.description,
            type: type,
            id: item?.attributes?.id,
          })
        }
      >
        <View style={styles.padding}>
          <View style={styles.blogPostHeader}>
            <Image
              style={styles.profile}
              resizeMode="contain"
              source={splashScreenImage}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item?.attributes?.name}</Text>
              <Text style={styles.time}>{item?.attributes?.created_at?.replace(/\babout\b/g, "")}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  type === "image"
                    ? `${shareURL}/blogpost/${item?.attributes?.id}`
                    : `${shareURL}/video/${item?.attributes?.id}`
                );
                showToast("Link copied");
              }}
              style={{ padding: 5 }}
            >
              <Image
                resizeMode="contain"
                style={styles.share}
                source={shareIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.blogText} numberOfLines={2}>
            {item?.attributes?.description}
          </Text>
          {type === "image" ? (
            <FastImage
              style={styles.blogImage}
              resizeMode="stretch"
              source={{ uri: item?.attributes?.images[0]?.url }}
            />
          ) : (
            <View style={styles.videoView}>
              {Platform.OS === "ios" ? (
                <Video
                  style={styles.video}
                  paused
                  resizeMode="stretch"
                  source={{
                    uri: item?.attributes?.videos[0]?.url,
                  }}
                />
              ) : (
                <FastImage
                  style={styles.video}
                  resizeMode="stretch"
                  source={{
                    uri: item?.attributes?.videos[0]?.url,
                  }}
                />
              )}
              <View style={styles.videoContainer}>
                <Image style={{ height: 40, width: 40 }} source={playIcon} />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default BlogPostCard;
const styles = StyleSheet.create({
  blogImage: { width: "100%", borderRadius: 10, height: 200 },
  videoView: { borderRadius: 10, overflow: "hidden" },
  video: { height: 200 },
  play: {
    height: 30,
    width: 30,
    tintColor: "grey",
  },
  padding: { paddingHorizontal: 15 },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 10,
  },
  blogText: {
    fontSize: 17,
    color: TEXT_COLOR,
    paddingBottom: 10,
  },
  blogPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profile: { height: 40, width: 40, borderRadius: 20 },
  nameContainer: { flex: 1, paddingLeft: 15 },
  share: { height: 20, width: 20,tintColor:PRIMARY_COLOR },
  name: { fontSize: 20, color: TEXT_COLOR, fontWeight: "700" },
  time: { color: SECONDARY_TEXT_COLOR, fontSize: 17 },
  container: { flexGrow: 1, paddingBottom: 90 },
  explorebtn: { alignSelf: "flex-start", marginVertical: 20 },
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
