import React from "react";
import { Modal, View,  StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "./CustomButton";
const closeIcon = require("./closeIcon.png");
interface ModalProps {
  transparent?: boolean;
  visible: boolean;
  setVisible?: boolean;
  blur?: boolean;
  button?: boolean;
  buttonLabel?: string;
  onpressButton?: () => void;
  children?: any;
  customChildren?: boolean;
}
const CommonModal = ({
  transparent = false,
  visible = false,
  setVisible,
  blur = false,
  buttonLabel = "",
  onpressButton,
  children,
  customChildren,
}: ModalProps) => {
  return (
    <Modal visible={visible} transparent={transparent}>
      <View style={styles.main}>
        {blur && <View style={styles.blur} />}
        <View style={styles.banner}>
          <TouchableOpacity style={styles.closeContainer}>
            <Image style={styles.close} source={closeIcon} />
          </TouchableOpacity>
          {customChildren ? children : <></>}
          <Button label={buttonLabel} onPress={onpressButton} />
        </View>
      </View>
    </Modal>
  );
};
export default CommonModal;

const styles = StyleSheet.create({
  closeContainer: {
    alignSelf: "flex-end",
    marginVertical: 20,
    backgroundColor: "#FFE3D4",
    padding: 10,
    borderRadius: 20,
  },
  close: {
    height: 13,
    width: 13,
  },
  banner: {
    backgroundColor: "white",
    marginHorizontal: 40,
    paddingHorizontal: 20,
    borderRadius: 35,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  blur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
});
