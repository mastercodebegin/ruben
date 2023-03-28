import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY } from "../assets";
type Props = {
  list:Array<object>,
  getList:()=>void
};
type State = {
  pause:boolean,
};
export default class VideoLibrary extends React.Component<Props,State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pause: false,
    };
  }
  async componentDidMount() {
    this.props.getList();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props?.list}
            keyExtractor={(_, index) => String(index)}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <BlogPostCard  item={item} />
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
  safeArea: {
    backgroundColor: LIGHT_GREY,
    width: Dimensions.get("window").width,
  },
});
