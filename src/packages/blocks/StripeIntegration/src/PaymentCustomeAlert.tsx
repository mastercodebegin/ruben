import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { DARK_RED, LIGHT_GREY } from "../../landingpage/assets/constants";
import Button from "../../../components/src/CustomButton";
const closeIcon = require("../../PersonelDetails/assets/close.png");

interface PaymentModalTypes {
  onpressClose: () => void;
  onpressContinue: () => void;
  visible: boolean;
  customeText: string;
  customeDescription: string;
  iconImage: any;
  isLoading: boolean
}
const PaymentCustomeAlert = ({
  onpressClose,
  onpressContinue,
  visible,
  customeText,
  customeDescription,
  iconImage,
  isLoading,
}: PaymentModalTypes) => {
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
          {isLoading ? (
            <>
            <View><ActivityIndicator size="large"/></View>
            </>
          ) : (
            <Image
            style={styles.mainImage}
            resizeMode="contain"
            source={iconImage}
          />
          )}
          <Text style={styles.headerText}>{customeText}</Text>
          <Text style={styles.description}>
            {customeDescription}
          </Text>
          {isLoading === false && (
               <Button label="Continue" onPress={onpressContinue}/>
          )}
          <Text>{}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default PaymentCustomeAlert;

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
    opacity: 0.7,
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
    paddingTop: 30,
  },
  description: {
    textAlign: "center",
    color: "grey",
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 25,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: LIGHT_GREY,
    padding: 12,
    borderRadius: 20,
  },
  closeImage: { height: 10, width: 10 },
  mainImage: { 
    height: 30, 
    width: 30, 
    alignSelf: "center",
    paddingBottom: 20,
},
});
