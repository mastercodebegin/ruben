import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator,Text } from "react-native";
interface ModalPropTypes {
  visible: boolean;
  blur?: boolean;
  indicatorSize?: number | "small" | "large";
}
const CommonLoader = ({
  visible = false,
  indicatorSize = "large",
}: ModalPropTypes) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main}>
        <View style={styles.blur}/>
        <View style={styles.loaderContainer}>

        <ActivityIndicator size={indicatorSize} />
        <Text style={styles.loading}>Loading ...</Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blur:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
    backgroundColor:'white',
    opacity:0.5
  },
  loading:{
    fontSize:17,
    fontWeight:'bold',
    paddingTop:10
  },
  loaderContainer:{
    justifyContent:'center'
  }
});
export default CommonLoader;
