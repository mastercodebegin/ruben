import React , {useRef} from "react";
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
const VideoComponent =({data}:any)=>{
  const videoRef = useRef({pause:null})
  return ( <View style={{flex:1}}>
  <FlatList
    data={data}
    keyExtractor={(_, index) => String(index)}
    showsVerticalScrollIndicator={false}
    bounces={false}
    onScrollBeginDrag={()=>{
      //@ts-ignore
    videoRef.current.pause && videoRef.current.pause(true)      
    }}
    renderItem={({ item }) => (
      <View style={{ marginBottom: 20 }}>
        <BlogPostCard onPlay={(ref)=>{
          //@ts-ignore
       videoRef.current.pause=ref;
        }}  item={item} />
      </View>
    )}
  />
  </View>)}
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
         <VideoComponent data={this.state.videoLibrary} />
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
