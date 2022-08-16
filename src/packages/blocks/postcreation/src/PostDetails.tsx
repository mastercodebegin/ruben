import React from "react";

// Customizable Area Start
import scale, { verticalScale } from "../../../components/src/Scale";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image
} from "react-native";
// Customizable Area End

import PostCreationController from "./PostCreationController";
import { Props } from "./PostCreationCommonController";

export default class PostDetails extends PostCreationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    // Customizable Area Start
    // Customizable Area End
    return (
      <SafeAreaView style={styles.container}>
      {/* Customizable Area Start */}
        <StatusBar barStyle="light-content" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.containerBoxStyle}
        >
          <KeyboardAvoidingView enabled style={styles.container}>
            <View style={styles.bodyContent} />
            <Image
              style={{
                width: "90%",
                height: scale(287.6),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "black",
                marginTop: verticalScale(10),
                opacity: 0.6,
                alignSelf: "center"
              }}
              source={{
                uri: this.state.profileImageData.data
              }}
            />
            <Text style={styles.textDescriptionTitle}>Post Name:</Text>
            <Text style={styles.textDescription}>{this.state.name}</Text>
            <Text style={styles.textDescriptionTitle}>Cost:</Text>
            <Text style={styles.textDescription}>${this.state.price}</Text>
            <Text style={styles.textDescriptionTitle}>Description:</Text>
            <Text style={styles.textDescription}>{this.state.description}</Text>
            <Text style={styles.textDescriptionTitle}>Post ID:</Text>
            <Text style={styles.textDescription}>{this.state.id}</Text>
          </KeyboardAvoidingView>
        </ScrollView>
      {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  bodyContent: {
    marginStart: scale(10),
    marginEnd: scale(10)
  },

  textStyleTitle: {
    fontSize: scale(18.7),
    marginStart: scale(17.7),
    marginTop: verticalScale(12.7)
  },

  textStylePrice: {
    fontSize: scale(18.2),
    marginStart: scale(17.7),
    marginTop: verticalScale(8.7)
  },

  row: {
    flexDirection: "row",
    height: scale(37.7),
    alignItems: "center",
    marginTop: verticalScale(14),
    paddingStart: scale(17.7)
  },

  viewEditDelete: {
    alignItems: "center",
    alignSelf: "center",
    top: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-end",
    marginEnd: scale(17)
  },

  textActive: {
    alignSelf: "flex-start",
    paddingStart: scale(15),
    paddingEnd: scale(15),
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    borderRadius: 10,
    fontSize: scale(10.7),
    marginStart: scale(7),
    marginEnd: scale(7)
  },

  textPublish: {
    fontSize: scale(14.2)
  },

  textDescriptionTitle: {
    fontSize: scale(20),
    marginStart: scale(17.7),
    marginTop: verticalScale(5),
    fontWeight: "bold"
  },

  textDescription: {
    fontSize: scale(16),
    marginStart: scale(16.7),
    marginTop: verticalScale(8),
    textAlign: "left"
    // lineHeight: scale(20.7),
  },

  textPostId: {
    fontSize: scale(16.2),
    marginLeft: scale(16.7),
    marginVertical: verticalScale(5)
  },

  ButtonConatiner: {
    position: "absolute",
    bottom: verticalScale(14.3),
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    height: scale(72),
    width: scale(414),
    alignContent: "center"
  },

  InnerConatiner: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(14.3),
    marginHorizontal: scale(16.3)
  },

  customTxtStyle: {
    alignSelf: "center",
    fontSize: scale(16.5)
  },

  customTxtStyleClose: {
    alignSelf: "center",
    fontSize: scale(16.5)
  },

  buttonCustom: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonCustomClose: {
    width: scale(182.3),
    height: scale(43.3),
    borderRadius: 22.1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  userConatiner: {
    height: verticalScale(66),
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: verticalScale(13)
  },

  userProfileName: {
    flexDirection: "row",
    marginTop: verticalScale(14),
    alignItems: "center"
  },

  userImagesIcon: {
    width: scale(37.7),
    height: scale(38),
    borderRadius: scale(18.7)
  },

  userIcon: {
    width: scale(20),
    height: scale(24),
    alignSelf: "center",
    marginTop: verticalScale(7)
  },

  userName: {
    fontSize: scale(14.2),
    textAlign: "left"
  },

  userMemberShip: {
    fontSize: scale(10.7),
    textAlign: "left"
  },

  offerPrice: {
    marginBottom: verticalScale(12),
    marginTop: verticalScale(28),
    fontSize: scale(16.7)
  },

  buttonCustomSend: {
    width: scale(185.7),
    height: scale(43.3),
    borderRadius: 22.1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },

  containerBoxStyle: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: verticalScale(10)
  }
});
// Customizable Area End