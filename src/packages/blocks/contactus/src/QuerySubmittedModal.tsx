import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  DARK_RED,
  LIGHT_GREY,
  closeIcon,
} from "../../../components/src/constants";
import Button from "../../../components/src/CustomButton";
const TickImage = require("../assets/check-mark.png");
interface QuerySubmittedModalTypes {
  visible: boolean;
  setVisible: () => void;
  navigation?: any;
}
const QuerySubmittedModal = ({
  visible = false,
  setVisible = () => { },
  navigation
}: QuerySubmittedModalTypes) => {
  return (
    <Modal visible={visible} transparent>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.blur} />
        <View style={styles.container}>
          <TouchableOpacity onPress={setVisible} style={styles.close}>
            <Image source={closeIcon} style={styles.icon} />
          </TouchableOpacity>
          <Image source={TickImage} style={styles.tick} />
          <Text style={styles.header}>{"Your Query Submitted"}</Text>
          <Text style={styles.text}>
            {"Be Patience! We'll try to solve your issues as soon as possible."}
          </Text>
          <Text style={styles.text}>{"Thank you for reaching out."}</Text>
          <Button
            label="Continue"
            onPress={() =>navigation.navigate("LandingPage")}
            containerStyle={{ marginTop: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8,
  },
  text: { fontSize: 17, color: "grey", textAlign: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: DARK_RED,
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  close: {
    backgroundColor: LIGHT_GREY,
    alignSelf: "flex-end",
    padding: 17,
    borderRadius: 25,
  },
  container: {
    backgroundColor: "white",
    marginHorizontal: 30,
    paddingTop: 20,
    borderRadius: 23,
    paddingHorizontal: 20,
  },
  tick: { height: 50, width: 50, alignSelf: "center" },
  icon: { height: 12, width: 12 },
});
export default QuerySubmittedModal;
