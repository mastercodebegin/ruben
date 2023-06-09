import React from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { splash } from "./assets";
const AppLauncher = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image resizeMode="contain" style={styles.image} source={splash} />
      </View>
    </SafeAreaView>
  );
};
export default AppLauncher;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F8F4F4",
  },
  image: {
    height: "45%",
    width: "90%",
    borderRadius: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F4F4",
  },
});
