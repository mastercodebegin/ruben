import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { DARK_RED, LIGHT_GREY } from "../../landingpage/assets/constants";
import Button from "../../../components/src/CustomButton";
const closeIcon = require("../assets/close.png");
interface DeliveryFeesModalTypes {
  onpressClose: () => void;
  onpressContinue: () => void;
  visible: boolean;
}
const DeliveryFeesModal = ({
  onpressClose,
  onpressContinue,
  visible,
}: DeliveryFeesModalTypes) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.blur} />
      <View style={styles.main}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onpressClose} style={styles.closeButton}>
            <Image
              style={styles.closeImage}
              resizeMode="contain"
              source={closeIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Delivery Fees</Text>
          <Text style={styles.description}>
            {
              "You'll be charge $12.00 to deliver this products at your selected location."
            }
          </Text>
          <Button label="Continue" onPress={onpressContinue} />
        </View>
      </View>
    </Modal>
  );
};
export default DeliveryFeesModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
  blur: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.6,
  },
  innerContainer: {
    backgroundColor: "white",
    marginHorizontal: responsiveWidth(10),
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 20,
    paddingBottom: 10,
  },
  headerText: {
    color: DARK_RED,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: "grey",
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: LIGHT_GREY,
    padding: 12,
    borderRadius: 20,
  },
  closeImage: { height: 10, width: 10 },
});
