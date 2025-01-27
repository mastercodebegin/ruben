import React from "react";

import {
  StyleSheet,
  View,
  Text,
  // Customizable Area Start
  TouchableOpacity,
  Image
  // Customizable Area End
} from "react-native";
import { cow_brisket, cow_chuch, cow_default, cow_flank, cow_foreshank, cow_head, cow_rib, cow_round, cow_shank, cow_shortlion, cow_shortplate, cow_sirlion } from "./assets";

import AnalyticsController, {AnimalParts, Props} from "./AnalyticsController";
import AnimalChart from "../../../components/src/AnimalChart";

export default class AnimalAnalytics extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const {x: left,y:top , isShow: isAnimalChartSow, sold, remaining, lineHeight} = this.state.soldChart;

    return (
      // Customizable Area Start
      <View style={styles.container} testID="animalView">
        {this.props?.animalSelectedValue == 'Beef Bacon(Naval)' &&
          <View style={styles.animalImgContainer}>
            <AnimalChart top={top} left={left} isShow={isAnimalChartSow} sold={sold} remaining={remaining} lineHeight={lineHeight} />
            <View style={styles.animalImgCont}>
              {this.state.cow_Defult &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_default}
                />
              }
              {this.state.cowHead &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_head}
                />
              }
              {this.state.chuck &&
                <>
                  {/* <View style={styles.hoverView}>
                      <View style={styles.graphContainer}>
                      </View>
                      <View style={styles.linebottom}>
                      </View>
                    </View> */}
                  <Image
                    style={styles.animalImg}
                    resizeMode="contain"
                    source={cow_chuch} />
                </>
              }
              {this.state.cow_Rib &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_rib}
                />
              }
              {this.state.cow_Short_lion &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shortlion}
                />
              }
              {this.state.cow_Sirllion &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_sirlion}
                />
              }
              {this.state.cow_Round &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_round}
                />
              }
              {this.state.cow_shank &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shank}
                />
              }
              {this.state.cow_Flank &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_flank}
                />
              }
              {this.state.cow_Short_plate &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_shortplate}
                />
              }
              {this.state.cow_Brisket &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_brisket}
                />
              }
              {this.state.cow_Fore_Shank &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_foreshank}
                />
              }
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.chuck) }} style={styles.clickOnChuck} testID="cowChuck" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cowHead) }} style={styles.clickOnHead} testID="cowHead" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Rib) }} style={styles.clickOnRib} testID="cowRib" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Short_lion) }} style={styles.clickOnShortlionStyle} testID="cowShortlion" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Sirllion) }} style={styles.clickOnSirlion} testID="cowSirLion" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Round) }} style={styles.clickOnRound} testID="cowRound" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_shank) }} style={styles.clickOnshank} testID="cowShank" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Flank) }} style={styles.clickOnFlank} testID="cowFlank" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Short_plate) }} style={styles.clickOnShortPlate} testID="cowShortplate" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Fore_Shank) }} style={styles.clickOnForeShank} testID="cowForeShank" />
              <TouchableOpacity onPress={() => { this.onCowClick(AnimalParts.cow_Brisket) }} style={styles.clickOnBrisket} testID="cowBrisket" />

            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.rowContainer}>
                <View style={[styles.redDot, { backgroundColor: 'yellow', }]}>
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
      // Customizable Area End
    );
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
    marginBottom: 20
  },
  animalImg: {
    paddingTop: 1,
    width: '100%',
    height: '100%',
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
    color: 'black'
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
  clickOnChuck: {
    width: 39,
    height: 35,
    position: 'absolute',
    top: 35,
    right: 63
  },
  clickOnHead: {
    width: 45,
    height: 40,
    position: 'absolute',
    top: 42,
    right: 10,
    borderBottomLeftRadius: 20
  },
  clickOnRib: {
    width: 25,
    height: 35,
    position: 'absolute',
    top: 30,
    left: 120,
    borderBottomLeftRadius: 20,
    transform: [{ rotate: '10deg' }],
  },
  clickOnShortlionStyle: {
    width: 25,
    height: 38,
    position: 'absolute',
    top: 30,
    left: 93
  },
  clickOnSirlion: {
    width: 25,
    height: 38,
    position: 'absolute',
    top: 30,
    left: 70,
  },
  clickOnRound: {
    width: 53,
    height: 45,
    position: 'absolute',
    top: 30,
    left: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  clickOnshank: {
    width: 53,
    height: 40,
    position: 'absolute',
    top: 80,
    left: 10,
    borderBottomEndRadius: 30,
  },
  clickOnFlank: {
    width: 33,
    height: 40,
    position: 'absolute',
    top: 75,
    left: 65,
    borderTopLeftRadius: 20,
  },
  clickOnShortPlate: {
    width: 37,
    height: 45,
    position: 'absolute',
    top: 70,
    left: 100,
    borderTopLeftRadius: 10,
  },
  clickOnForeShank: {
    width: 30,
    height: 43,
    position: 'absolute',
    top: 72,
    right: 82,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  clickOnBrisket: {
    width: 30,
    height: 40,
    position: 'absolute',
    top: 72,
    right: 52,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 20,
  }
});
// Customizable Area End
