import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { WHITE, PRIMARY } from "../colors";
import {
shop_marked,
shop_unmarked,
home_marked,
home_unmarked,
settings_marked,
settings_unmarked,
element_marked,
element_unmarked,
profile_marked,
profile_unmarked
} from "../assets";

type BottomTabType = {
  tabName: String,
  navigation:any,
};

const BottomTab = ({ tabName, navigation }: BottomTabType) => {
    const renderIcons = (image: ImageSourcePropType, selected: boolean,navigate:String) => {
        return (
          <TouchableOpacity onPress={()=>{
            navigation?.navigate(navigate)}} style={styles.iconContainer}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.icon}
                resizeMode='contain'
                source={image}
              />
              {selected && <View style={styles.dot} />}
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <View style={styles.container}>
      {renderIcons(tabName === "Home" ? home_marked :home_unmarked, tabName === "Home",'LandingPage')}
      {renderIcons(tabName === "Explore" ?shop_marked:shop_unmarked, tabName === "Explore",'ExplorePage')}
      {renderIcons(tabName === "Myprofile"?profile_marked:profile_unmarked, tabName === "Myprofile",'Myprofile')}
      {renderIcons(tabName === "BlogPost"?element_marked:element_unmarked, tabName === "BlogPost",'BlogPost')}
      {renderIcons(tabName === "Settings"?settings_marked:settings_unmarked, tabName === "Settings",'Settings')}
    </View>
  );
};
export default BottomTab;
const styles = StyleSheet.create({
  icon: { height: 25, width: 25, marginBottom: 7 },
  container: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  iconContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: PRIMARY,
    borderRadius: 2.5,
  },
});
