import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import CustomRadioBtn from "../../../../components/src/CustomRadioBtn";
import { DARK_RED } from "../colors";
import { TEXT_COLOR } from "../assets";
interface RenderStepsTypes {
  header: string;
  description: string;
  images: Array<any>;
}
const RenderSteps = ({ header, description, images }: RenderStepsTypes) => {
  return (
    <View style={styles.row}>
      <CustomRadioBtn checked />
      <View style={styles.flex}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.description}>{description}</Text>
        <FlatList
          data={images}
          horizontal
          renderItem={({ item }) => {
            return (
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                source={{uri:item?.url}}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default RenderSteps;

const styles = StyleSheet.create({
  header: {
    color: TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
  description: {
    color: "grey",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },
  row: { flexDirection: "row", paddingBottom: 15 },
  flex: { flex: 1, paddingLeft: 10 },
});
