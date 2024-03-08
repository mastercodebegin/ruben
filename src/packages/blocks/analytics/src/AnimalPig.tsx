import React from "react";

import {
  StyleSheet,
  View,
  // Customizable Area Start
  Image,
  TouchableOpacity,
  Text
  // Customizable Area End
} from "react-native";
import { pig, pigBackfat, pigHead, pigHock, pigJowl, pigLeg, pigLoin, pigNeck, pigRibs, pigShoulder, pigbacon, pigpicnis } from "./assets";

import AnalyticsController, {AnimalParts, Props} from "./AnalyticsController";
import AnimalChart from "../../../components/src/AnimalChart";
export default class AnimalPig extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    
    const {x: left,y:top ,
       isShow: isAnimalChartSow, sold, remaining, lineHeight} = this.state.soldChart;
    return (
      <View style={styles.container}>
        {this.props?.animalSelectedValue == 'Pig' &&
          <View style={styles.animalImgContainer}>
            {this.props.isChartDisplay?<AnimalChart top={top} left={left} isShow={isAnimalChartSow} 
            sold={sold} remaining={remaining} lineHeight={lineHeight} />:<Text>hi</Text>}
            <View style={styles.animalImgCont}>
              {this.state.pig &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pig}
                />
              }
              {this.state.pigHead &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigHead} />
              }
              {this.state.pigHock &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigHock}
                />
              }
              {this.state.pigBacon &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigbacon}
                />
              }
              {this.state.pigNeck &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigNeck}
                />
              }
              {this.state.pigLegham &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigLeg}
                />
              }
              {this.state.pigRibs &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigRibs}
                />
              }
              {this.state.pigLoin &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigLoin}
                />
              }
              {this.state.pigShoulder &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigShoulder}
                />
              }
              {this.state.pigPicnic &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigpicnis}
                />
              }
              {this.state.pigJowl &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigJowl}
                />
              }
              {this.state.pigBackFat &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={pigBackfat}
                />
              }
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigHead) }} style={styles.clickOnPigHead} testID="pigHead" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigHock)  }} style={styles.clickOnPigHockRight} testID="pigHockRight" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigHock)  }} style={styles.clickOnPigHockLeft} testID="pigHockLeft" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigBacon)  }} style={styles.clickOnPigBacon} testID="pigBacon" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigNeck) }} style={styles.clickOnPigNeck} testID="pigNeck" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigLegham) }} style={styles.clickOnPigLegham} testID="pigLegham" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigRibs) }} style={styles.clickOnPigRib} testID="pigRibs" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigLoin)  }} style={styles.clickOnPigLoin} testID="pigLoin" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigShoulder) }} style={styles.clickOnPigShoulder} testID="pigShoulder" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigPicnic) }} style={styles.clickOnPigPicnic} testID="pigPicnic" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigJowl) }} style={styles.clickOnPigJowl} testID="pigJowl" />
              <TouchableOpacity onPress={() => { this.onPigClick(AnimalParts.pigBackFat) }} style={styles.clickBackFat} testID="pigBackFat" />

            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.redDot, { backgroundColor: '#A9C9F7', }]}>
                </View>
                <Text style={styles.textStyle}>Remaining</Text>
              </View>
              <View style={styles.rowContainer}>
                <View style={[styles.redDot, { backgroundColor: '#A9C9F7', }]}>
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
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    height:400,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 40
  },
  animalImgCont: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20
  },
  animalImg: {
    paddingTop: 1,
    width: '100%',
    height: '100%',
  },
  clickOnPigHead: {
    width: 55,
    height: 40,
    position: 'absolute',
    top: 60,
    left: 10,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
  clickOnPigHockLeft: {
    width: 25,
    height: 35,
    position: 'absolute',
    bottom: 50,
    left: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  clickOnPigHockRight: {
    width: 35,
    height: 40,
    position: 'absolute',
    bottom: 50,
    right: 40,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 10,
  },
  clickOnPigBacon: {
    width: 67,
    height: 18,
    position: 'absolute',
    bottom: 75,
    right: 77,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 20,
    transform: [{ rotate: '-10deg' }],
  },
  clickOnPigNeck: {
    width: 10,
    height: 50,
    position: 'absolute',
    top: 50,
    left: 73,
    borderBottomRightRadius: 20,
  },
  clickOnPigLegham: {
    width: 50,
    height: 55,
    position: 'absolute',
    top: 50,
    right: 33,
    borderTopLeftRadius: 15,
  },
  clickOnPigRib: {
    width: 60,
    height: 20,
    position: 'absolute',
    top: 88,
    right: 84,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 25,
    transform: [{ rotate: '-10deg' }],
  },
  clickOnPigLoin: {
    width: 60,
    height: 20,
    position: 'absolute',
    top: 62,
    right: 82,
    borderTopLeftRadius: 5,
  },
  clickOnPigShoulder: {
    width: 25,
    height: 50,
    position: 'absolute',
    top: 45,
    left: 83,
  },
  clickOnPigPicnic: {
    width: 25,
    height: 20,
    position: 'absolute',
    bottom: 85,
    left: 78,
    borderTopLeftRadius: 15,
  },
  clickOnPigJowl: {
    width: 35,
    height: 16,
    position: 'absolute',
    bottom: 85,
    left: 36,
    borderTopLeftRadius: 15,
  },
  clickBackFat: {
    width: 65,
    height: 20,
    position: 'absolute',
    bottom: 140,
    left: 107,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom:20
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
  }
});
// Customizable Area End
