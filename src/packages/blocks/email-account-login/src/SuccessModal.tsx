import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Clipboard,
  ToastAndroid,
  Platform,
} from "react-native";
import Button from "../../../components/src/CustomButton";
import { close, copy, emoji } from "./assets";
import Toast from "react-native-simple-toast";
import { APP_BACKGROUND, PRIMARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../landingpage/src/assets";

interface ModalTypes {
  visible: boolean;
  onpressClose: () => void;
  onpressContinue: () => void;
  couponCode: string;
  onCloseTestID?: string;
}
const SuccessModal = ({
  visible = false,
  onpressClose,
  onpressContinue,
  couponCode,
  onCloseTestID,
}: ModalTypes) => {
  const onpressCopy = () => {
    Clipboard.setString(couponCode);
    if (Platform.OS === "ios") {
      Toast.show("Code copied", Toast.LONG);
      return;
    }
    ToastAndroid.show("Code copied", ToastAndroid.SHORT);
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.blur} />
        <View style={styles.innerView}>
          <TouchableOpacity
            testID={onCloseTestID}
            onPress={onpressClose}
            style={[styles.close,{backgroundColor:APP_BACKGROUND}]}
          >
            <Image
              resizeMode="contain"
              style={[styles.closeIcon,{tintColor:PRIMARY_COLOR}]}
              source={close}
            />
          </TouchableOpacity>
          <View style={styles.congratulationContainer}>
            <Text style={[styles.congratulation,{color:TEXT_COLOR}]}>{"Congratulations "}</Text>
            <Image style={styles.emoji} source={emoji} />
          </View>
          <Text style={styles.description}>
            You earned discount coupon code. You can check this out in your
            Profile or Redeem Now!
          </Text>
          <Text style={styles.discount}>
            To get instant 10% discount on first order
          </Text>
          <TouchableOpacity
            testID="copy_code_id"
            onPress={onpressCopy}
            style={styles.copyContainer}
          >
            <Text style={[styles.copy,{color:TEXT_COLOR}]}>COPY COUPON CODE</Text>
            <Image style={[styles.copyImg,{tintColor:PRIMARY_COLOR}]} source={copy} />
          </TouchableOpacity>
          <Button onPress={onpressContinue} label={"Continue"} />
        </View>
      </View>
    </Modal>
  );
};
export default SuccessModal;

const styles = StyleSheet.create({
  copy: {
    color: "#A0272A",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
  },
  closeIcon: { height: 15, width: 15 },
  emoji: { height: 35, width: 35 },
  congratulationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  description: { color: TEXT_COLOR, textAlign: "center", fontSize: 15 },
  copyImg: {
    height: 27,
    width: 27,
    marginLeft: 10,
  },
  congratulation: {
    color: "#5c2221",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
  innerView: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 35,
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8,
  },
  close: {
    backgroundColor: "#FFE3D4",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 20,
  },
  copyContainer: {
    justifyContent: "center",
    paddingTop: 10,
    marginBottom: 25,
    flexDirection: "row",
  },
  discount: {
    color: SECONDARY_TEXT_COLOR,
    paddingTop: 20,
    textAlign: "center",
    fontSize: 15,
  },
});
