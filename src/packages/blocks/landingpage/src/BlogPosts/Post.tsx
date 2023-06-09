import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import BlogPostCard from "../BlogPostCard";
import { LIGHT_GREY } from "../assets";
type Props = {
  getList: () => void;
  list: Array<object>;
};
type State = {
  pause: boolean;
};
export default class Posts extends React.Component<Props, State> {
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
      <View style={styles.flex}>
        <FlatList
          data={this.props.list}
          bounces={false}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => {
            if (item?.attributes?.enable) {
              return (
                <View style={styles.margin}>
                  <BlogPostCard type="image" item={item} />
                </View>
              );
            }
            return <></>;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 30 },
  flex: { flex: 1, backgroundColor: LIGHT_GREY },
  margin: { marginBottom: 20 },
});
