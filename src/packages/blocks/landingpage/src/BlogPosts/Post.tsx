import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY, MEAT_IMAGE1, MEAT_IMAGE2, MEAT_IMAGE3 } from "../assets";
const dummyData = [
  { image: MEAT_IMAGE1, type: "image" },
  { image: MEAT_IMAGE2, type: "image" },
  { image: MEAT_IMAGE3, type: "image" },
];
export default class Posts extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      pause: false,
    };
  }
  async componentDidMount() {
    this.props.getList()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          <FlatList
            data={this.props.list}
            bounces={false}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.margin}>
                <BlogPostCard type="image" item={item} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
  flex: { flex: 1 },
  container: {
    backgroundColor: LIGHT_GREY,
    width: Dimensions.get("window").width,
  },
  margin: { marginBottom: 20 },
});
