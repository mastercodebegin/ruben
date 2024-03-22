import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import {
  cow_default,
  cow_head,
  cow_rib,
  cow_brisket,
  cow_flank,
  cow_foreshank,
  cow_round,
  cow_shank,
  cow_chuch,
  cow_shortlion,
  cow_sirlion,
  cow_shortplate
} from "../../blocks/analytics/src/assets";

import AnalyticsController, { AnimalParts, Props } from "../../blocks/analytics/src/AnalyticsController";
import AnimalChart from "../src/AnimalChart";

export default class AnimalCow extends AnalyticsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      x: left,
      y: top,
      isShow: isAnimalChartShow,
      sold,
      remaining,
      lineHeight
    } = this.state.soldChart;

    return (
      <View style={styles.container}>
        {this.props?.animalSelectedValue =='Angus Beef' && (
          <View
            style={
              this.props.isChartDisplay
                ? styles.animalImgContainer
                : styles.animalImgContainerForStore
            }
          >
            {this.props.isChartDisplay ? (
              <AnimalChart
                top={top}
                left={left}
                isShow={isAnimalChartShow}
                sold={sold}
                remaining={remaining}
                lineHeight={lineHeight}
              />
            ) : (
<></>            )}
            <View style={styles.animalImgCont}>
              {this.state.cow_Defult && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_default}
                />
              )}
              {this.state.cowHead && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_head}
                />
              )}
              {this.state.cow_Rib && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_rib}
                />
              )}
              {this.state.cow_Brisket && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_brisket}
                />
              )}
              {this.state.cow_Flank && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_flank}
                />
              )}
              {this.state.cow_Fore_Shank && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_foreshank}
                />
              )}
              {this.state.cow_Round && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_round}
                />
              )}
              {this.state.cow_shank && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shank}
                />
              )}
              {this.state.chuck && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_chuch}
                />
              )}
              {this.state.cow_Short_lion && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shortlion}
                />
              )}
              {this.state.cow_Sirllion && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_sirlion}
                />
              )}
              {this.state.cow_Short_plate && (
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shortplate}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  this.onCowClick(AnimalParts.cowHead);
                }}
                style={styles.clickOnCowHead}
                testID="cowHead"
              />

             <TouchableOpacity
                onPress={() => {
                  this.onCowClick(AnimalParts.chuck);
                }}
                style={styles.chuck}
                testID="chuck"
              />

             <TouchableOpacity
                onPress={() => {
                  this.onCowClick(AnimalParts.cow_Rib);
                }}
                style={styles.cowRib}
                testID="cowRib"
              />
             
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Short_lion);}}
                style={styles.cowShortLion}
                testID="cowShortLion"
              />


               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Round);}}
                style={styles.cowRound}
                testID="cowRound"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Brisket);}}
                style={styles.brisket}
                testID="cowRound"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Fore_Shank);}}
                style={styles.forShank}
                testID="cowRound"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Fore_Shank);}}
                style={styles.forShank}
                testID="cowRound"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Short_plate);}}
                style={styles.shortPlate}
                testID="shortPlate"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Flank);}}
                style={styles.flank}
                testID="flank"
              />
               <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_shank);}}
                style={styles.shank}
                testID="shank"
              />
            
              
             
            
              
            </View>
            {this.props.isChartDisplay ? (
              <View style={styles.bottomContainer}>
                <View style={styles.rowContainer}>
                  <View
                    style={[
                      styles.redDot,
                      { backgroundColor: "#A9C9F7" },
                    ]}
                  ></View>
                  <Text style={styles.textStyle}>Remaining</Text>
                </View>
                <View style={styles.rowContainer}>
                  <View
                    style={[
                      styles.redDot,
                      { backgroundColor: "#A9C9F7" },
                    ]}
                  ></View>
                  <Text style={styles.textStyle}>Sold</Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  animalImgContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 40,
  },
  animalImgContainerForStore: {
    justifyContent: "center",
    height: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  animalImgCont: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  animalImg: {
    paddingTop: 1,
    width: "100%",
    height: "100%",
  },
  clickOnCowHead: {
    width: 55,
    height: 40,
    position: "absolute",
    top: 40,
    left: 200,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
  chuck: {
    width: 55,
    height: 40,
    position: "absolute",
    top: 30,
    left: 136,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
 
  cowRub: {
    width: 30,
    height: 40,
    position: "absolute",
    top: 30,
    left: 100,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
 

  cowRib: {
    width: 24,
    height: 36,
    position: "absolute",
    top: 28,
    left: 120,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  cowShortLion: {
    width: 24,
    height: 36,
    position: "absolute",
    top: 30,
    left: 96,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  cowSirlon: {
    width: 22,
    height: 36,
    position: "absolute",
    top: 30,
    left: 70,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  cowRound: {
    width: 55,
    height: 45,
    position: "absolute",
    top: 30,
    left: 10,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
  },
  brisket: {
    width: 30,
    height: 36,
    position: "absolute",
    top: 74,
    left: 170,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  forShank: {
    width: 30,
    height: 44,
    position: "absolute",
    top: 74,
    left: 140,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  shortPlate: {
    width: 30,
    height: 44,
    position: "absolute",
    top: 74,
    left: 106,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  flank: {
    width: 30,
    height: 44,
    position: "absolute",
    top: 74,
    left: 66,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  shank: {
    width: 36,
    height: 44,
    position: "absolute",
    top: 78,
    left: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  legs: {
    width: 36,
    height: 50,
    position: "absolute",
    top: 60,
    left: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  /* Add TouchableOpacity styles for other body parts as needed */
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 20,
    color: "#8D7D75",
  },
});
