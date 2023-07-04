import React from "react";

import {
  StyleSheet,
  View,
  Text,
  // Customizable Area Start
  TouchableOpacity,
  Image,
  FlatList,
  // Customizable Area End
} from "react-native";
import { chicken, chicken_Back, chicken_Breast, chicken_Neck, chicken_Thigh, chicken_Wing, chicken_leg, cow_brisket, cow_chuch, cow_flank, cow_foreshank, cow_head, cow_rib, cow_round, cow_shank, cow_shortlion, cow_sirlion } from "./assets";

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
          {/* {this.state.chuck &&
            <View style={styles.hoverView}>
              <View style={styles.graphContainer}>
              </View>
              <View style={styles.linebottom}>
              </View>
            </View>
          } */}
          {this.state.animalSelectedValue == 'Cow' &&
            <View style={styles.animalImgCont}>
              {this.state.cow_Defult &&
                <Image
                  style={styles.animalImg}
                  resizeMode="contain"
                  source={cow_head}
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
                  <View style={styles.hoverView}>
                    <View style={styles.graphContainer}>
                    </View>
                    <View style={styles.linebottom}>
                    </View>
                  </View>
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
                  source={cow_shortlion}
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
              <TouchableOpacity onPress={() => { this.clickOnChuck() }} style={styles.clickOnChuck} testID="cowChuck">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnCowhead() }} style={styles.clickOnHead} testID="cowHead">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnCowRib() }} style={styles.clickOnRib} testID="cowRib">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnShortlion() }} style={styles.clickOnShortlionStyle} testID="cowShortlion">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnSirlion() }} style={styles.clickOnSirlion} testID="cowSirLion">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnRound() }} style={styles.clickOnRound} testID="cowRound">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnShank() }} style={styles.clickOnshank} testID="cowShank">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnFlank() }} style={styles.clickOnFlank} testID="cowFlank">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnShortPlate() }} style={styles.clickOnShortPlate} testID="cowShortplate">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnForeShank() }} style={styles.clickOnForeShank} testID="cowForeShank">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnBrisket() }} style={styles.clickOnBrisket} testID="cowBrisket">
              </TouchableOpacity>
            </View> 
          }
         {this.state.animalSelectedValue == 'Chicken' &&
           <View style={styles.animalImgCont}>
    
           {this.state.chicken_Defult &&
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
           <TouchableOpacity onPress={() => { this.clickOnChickenNeck() }} style={styles.clickOnChickenNeck}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => { this.clickOnChickenBack() }} style={styles.clickOnChickenBack}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => { this.clickOnChickenBreast() }} style={styles.clickOnChickenBreast}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => { this.clickOnChickenWing() }} style={styles.clickOnChickenWing}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => { this.clickOnChickenLeg() }} style={styles.clickOnChickenLeg}>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => { this.clickOnChickenThigh() }} style={styles.clickOnChickenThigh}>
           </TouchableOpacity>
           

         </View>
         }
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
    marginTop: 40
  },
  animalImgContainer: {
    padding: 1,
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
  },
  // chicken
  clickOnChickenNeck:{
    width: 40,
    height: 65,
    position: 'absolute',
    top: 2,
    left: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 20,
    transform: [{ rotate: '-15deg' }],
  },
  clickOnChickenBack:{
    width: 82,
    height: 23,
    position: 'absolute',
    top: 58,
    left: 80,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 10,
  },
  clickOnChickenBreast:{
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
  clickOnChickenWing:{
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
  clickOnChickenLeg:{
    width: 40,
    height: 52,
    position: 'absolute',
    bottom: 20,
    left: 105,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  clickOnChickenThigh:{
    width: 55,
    height: 38,
    position: 'absolute',
    bottom: 58,
    right: 55,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    transform: [{ rotate: '-35deg' }],
  },




});
// Customizable Area End
