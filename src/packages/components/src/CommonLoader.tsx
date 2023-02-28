import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
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
        <ActivityIndicator size={indicatorSize} />
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
});
export default CommonLoader;
