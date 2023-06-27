import React from "react";

import {
  StyleSheet,
  View,
  Text,
  // Customizable Area Start
  TouchableOpacity,
  Image,
  // Customizable Area End
} from "react-native";
import { cow_head } from "./assets";

import AnalyticsController, { Props, configJSON } from "./AnalyticsController";

export default class AnimalAnalytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <View style={styles.container}>
        <View style={styles.animalImgContainer}>
          <View style={styles.hoverView}>
            <View style={styles.graphContainer}>
            </View>
            <View style={styles.linebottom}>
            </View>
          </View>
          <View style={styles.animalImgCont} >
            <Image
              style={styles.animalImg}
              resizeMode="contain"
              source={cow_head}
            />
          </View>
          
          <View style={styles.bottomContainer}>
            <View style={styles.rowContainer}>
              <View style={[styles.redDot, { backgroundColor: '#A0272A', }]}>
              </View>
              <Text style={styles.textStyle}>Remaining</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={[styles.redDot, { backgroundColor: '#5C2221', }]}>
              </View>
              <Text style={styles.textStyle}>Sold</Text>
            </View>
          </View>
        </View>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginTop:40
  },
  animalImgContainer: {
    padding:1,
  },
  hoverView: {
    alignItems: 'center',
    position: 'absolute',
    top:-50,
    right:20,
    zIndex:1

  },
  animalImgCont:{
    width:250,
    height:200,
    alignSelf:'center',
    marginTop:40
  },
  animalImg: {
    paddingTop: 1,
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  textStyle: {
    fontSize: 20,
    color: '#8D7D75'
  },
  graphContainer: {
    padding: 1,
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    borderRadius: 50
  },
  linebottom: {
    width: 2,
    height:40,
    backgroundColor: 'red',
  }
});
// Customizable Area End
