import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { sampleProfile, shareIcon, playIcon ,blogpostimage} from "./assets";
import Video from "react-native-video";
interface Types {
  item: any;
  type?:string;
  index?:number;
  visibleItem?:number;
}
const BlogPostCard = ({ item ,type}: Types) => {
  const [play, setPaly] = React.useState(true);  
  return (
    <View style={styles.card}>
      <View style={styles.padding}>
        <View style={styles.blogPostHeader}>
          <Image
            style={styles.profile}
            resizeMode="contain"
            source={sampleProfile}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {item?.attributes?.name}
              </Text>
            <Text style={styles.time}>{item?.attributes?.created_at}</Text>
          </View>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.share}
              source={shareIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.blogText} numberOfLines={2}>{item?.attributes?.description}
        </Text>
        {type === 'image'?
        <Image
        style={styles.blogImage}
        resizeMode="stretch"
        source={
          blogpostimage
        }
      />:<View style={styles.videoView}>
          <Video
            style={styles.video}
            resizeMode="stretch"
            paused={play}
            source={{
              uri: item?.attributes?.videos[0]?.url
            }}
          />
          <View style={styles.videoContainer}>
            <TouchableOpacity onPress={() => setPaly(!play)}>
              <Image
                style={styles.play}
                source={playIcon}
                
              />
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    </View>
  );
};
export default BlogPostCard;
const styles = StyleSheet.create({
  blogImage:{ width: "100%", borderRadius: 10, height: 200 },
  videoView:{ borderRadius: 10,overflow:"hidden"},
  video:{ width: "100%", height: 200},
  play:{
    height: 30,
    width: 30,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,
elevation: 10,
borderRadius:20
  },
  padding:{ paddingHorizontal: 15 },
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
