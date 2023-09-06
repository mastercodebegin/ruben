import React from "react";

import {
  StyleSheet,
  View,
  // Customizable Area Start
  TouchableOpacity,
  Image,
  Text
  // Customizable Area End
} from "react-native";
import { chicken, chicken_Back, chicken_Breast, chicken_Neck, chicken_Thigh, chicken_Wing, chicken_leg } from "./assets";

import AnalyticsController, { Props } from "./AnalyticsController";
import AnimalChart from "../../../components/src/AnimalChart";

export default class AnimalChicken extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    console.log("value== == == == ::::", this.props?.animalSelectedValue);
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const {
      x: left,
      y:top ,
      isShow: isAnimalChartSow,
      sold,
      remaining,
      lineHeight
    } = this.state.soldChart;


    return (
      <View style={styles.container}>
        {this.props?.animalSelectedValue == 'Chicken' &&
          <View style={styles.animalImgContainer}>
            <AnimalChart top={top} left={left} isShow={isAnimalChartSow} sold={sold} remaining={remaining} lineHeight={lineHeight} />
            <View style={styles.animalImgCont}>
              {
                this.state.chicken_Defult &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken}
                />
              }
              {this.state.chicken_Neck &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_Neck}
                />
              }
              {this.state.chicken_Back &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_Back}
                />
              }
              {this.state.chicken_Breast &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_Breast}
                />
              }
              {this.state.chicken_Wing &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_Wing}
                />
              }
              {this.state.chicken_leg &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_leg}
                />
              }
              {this.state.chicken_Thigh &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={chicken_Thigh}
                />
              }
              <TouchableOpacity onPress={() => { this.clickOnChickenNeck() }} style={styles.clickOnChickenNeck} testID="chickenNeck">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnChickenBack() }} style={styles.clickOnChickenBack} testID="chickenback">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnChickenBreast() }} style={styles.clickOnChickenBreast} testID="chickenBreast">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnChickenWing() }} style={styles.clickOnChickenWing} testID="chickenWing">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnChickenLeg() }} style={styles.clickOnChickenLeg} testID="chickenLeg">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnChickenThigh() }} style={styles.clickOnChickenThigh} testID="chickenThigh">
              </TouchableOpacity>
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
        }
      </View>
    )
    // Customizable Area End
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  animalImgContainer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 40
  },
  hoverView: {
    alignItems: 'center',
    position: 'absolute',
    top: -90,
    right: 30,
    zIndex: 1
  },
  linebottom: {
    width: 2,
    height: 30,
    backgroundColor: 'red',
  },
  animalImgCont: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginTop: 40
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
  touchableList: {
    width: '100%',
    height: 300
  },
  clickOnChickenNeck: {
    width: 40,
    height: 65,
    position: 'absolute',
    top: 2,
    left: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 20,
    transform: [{ rotate: '-15deg' }],
  },
  clickOnChickenBack: {
    width: 82,
    height: 23,
    position: 'absolute',
    top: 58,
    left: 80,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 10,
  },
  clickOnChickenBreast: {
    width: 35,
    height: 72,
    position: 'absolute',
    top: 68,
    left: 55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    transform: [{ rotate: '-15deg' }],
  },
  clickOnChickenWing: {
    width: 73,
    height: 32,
    position: 'absolute',
    top: 83,
    left: 95,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    transform: [{ rotate: '10deg' }],
  },
  clickOnChickenLeg: {
    width: 40,
    height: 52,
    position: 'absolute',
    bottom: 20,
    left: 105,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  clickOnChickenThigh: {
    width: 55,
    height: 38,
    position: 'absolute',
    bottom: 58,
    right: 55,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    transform: [{ rotate: '-35deg' }],
  }
});
// Customizable Area End
