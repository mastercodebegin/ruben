import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { blogpostimage, sampleProfile, shareIcon } from "./assets";
interface Types {
    item:any
}
const BlogPostCard = ({item}:Types) => {
    console.log('item',item);
    
  return (
    <View style={styles.card}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.blogPostHeader}>
          <Image
            style={styles.profile}
            resizeMode="contain"
            source={sampleProfile}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Masool El Toure</Text>
            <Text style={styles.time}>5 min ago</Text>
          </View>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.share}
              source={shareIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.blogText} numberOfLines={2}>
          The placeholder text used in design when creating content. It helps
          designer plan out where the
        </Text>
          <Image
            style={{ width: "100%", borderRadius: 10, height: 200 }}
            resizeMode="stretch"
            source={item.image}
          />
      </View>
    </View>
  );
};
export default BlogPostCard;
const styles = StyleSheet.create({
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
});
