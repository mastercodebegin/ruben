import React, {  useCallback, useState, SetStateAction, Dispatch} from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet ,ActivityIndicator} from "react-native";
import { sampleProfile, shareIcon } from "./assets";
import { downloadFiles, shareFiles } from "../../../components/src/utils";
import VideoPlayer from "react-native-video-player";
interface Types {
  item: any;
  type?: string;
  index?: number;
  visibleItem?: number;
  onPlay:(ref:Dispatch<SetStateAction<boolean>>)=>void;
}
const BlogPostCard = ({ item, type,onPlay }: Types) => {
  const [showLoader, setShowLoader] = useState(false);
  const [play, setPaly] = React.useState(false);
  const [buffering,setBuffering]=useState(false)
  const shareContent = useCallback(
    async (content: string, fileDetails: any) => {
      setShowLoader(true);      
      downloadFiles(
        fileDetails?.url,
        fileDetails?.filename,
        "Image",
        "image/png",
        "Downloading image",
        true,
        true
      )
        .then((res: any) => {
          setShowLoader(false);
          setTimeout(() => {
            shareFiles(content, res, "sharing image")
              .catch(() => {
                alert("share failed");
              });
          }, 300);
        })
        .catch((e) => {
          alert("error while downloading image");
          setShowLoader(false);
        });
    },
    [showLoader]
  );
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
            <Text style={styles.name}>{item?.attributes?.name}</Text>
            <Text style={styles.time}>{item?.attributes?.created_at}</Text>
          </View>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() =>
              shareContent(
                item?.attributes?.description,
                item?.attributes?.images[0]
              )
            }
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
          <Image
            style={styles.blogImage}
            resizeMode="stretch"
            source={{ uri: item?.attributes?.images[0]?.url }}
          />
        ) : (
          <View style={styles.videoView}>
            <VideoPlayer
              style={styles.video}
              resizeMode="stretch"
              paused={play}
              
              onStart={()=>{onPlay(setPaly)}}
              onVideoBuffer={()=>{
                console.log('buffering');
                
              }}
              onBuffer={(data)=>{
                console.log('datadata ',data);

                setBuffering(data.isBuffering)
                
              }}
              controls={false}
              onPlayPress={()=>{
                onPlay(setPaly)
                setPaly(false)}}
              video={{
                uri: item?.attributes?.videos[0]?.url,
              }}
            />
            {buffering && <View style={styles.videoContainer}>
              <TouchableOpacity onPress={() => setPaly(!play)}>
                <ActivityIndicator color="white" size={'large'}/>
                {/* <Image style={styles.play} source={playIcon} /> */}
              </TouchableOpacity>
            </View>}
          </View>
        )}
      </View>
    </View>
  );
};
export default BlogPostCard;
const styles = StyleSheet.create({
  blogImage: { width: "100%", borderRadius: 10, height: 200 },
  videoView: { borderRadius: 10, overflow: "hidden" },
  video: { width: "100%", height: 200 },
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
