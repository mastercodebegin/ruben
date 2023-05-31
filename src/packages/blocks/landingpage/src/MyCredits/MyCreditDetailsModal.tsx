import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from "react-native";
import LandingPageController from "../LandingPageController";
import { DARK_RED, LIGHT_GREY, MID_PEACH, cow, } from "../assets";
import { BLACK } from "../colors";
export default class MyCreditDetailsModal extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {

    return (
      <Modal transparent>
        <View style={styles.blur} />
        <View style={styles.innerContainer}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.mainContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.invImageContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.invImgStyle}
                    source={cow}
                  />
                </View>
                <View style={styles.invDesContainer}>
                  <Text style={styles.invDesText}>Available cuts</Text>
                  <Text style={styles.invTotalText}>10</Text>
                </View>
              </View>
              <Text style={styles.pickHeading}>Pickup / Deliver Remaining Cuts</Text>
              <View style={styles.optionContainer}>
                <Text>
                  Choose an option
                </Text>
                <View style={styles.optionContainerIn}>
                  <View style={styles.chooseOptionContainer}>
                    <Text>
                      Pickup
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({

  //@ts-ignore
  blur: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.8,
  },
  contentContainer: { flexGrow: 1 },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginVertical: 40,
    marginHorizontal: 25,
  },
  mainContainer: {
    padding: 0
  },
  invImageContainer: {
    width: '40%',
    height: 120,
  },
  invImgStyle: {
    width: '100%',
    height: '100%'
  },
  invDesContainer: {
    width: '60%',
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  invDesText: {
    color: MID_PEACH,
    fontSize: 14,
    textTransform: "uppercase"
  },
  invTotalText: {
    color: DARK_RED,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  pickHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLACK,
    alignSelf: 'center',
    paddingVertical: 25
  },
  optionContainer:{
    padding:0
  },
  optionContainerIn:{
    padding:20,
    backgroundColor:LIGHT_GREY
  },
  chooseOptionContainer:{
    padding:0
  }
});
