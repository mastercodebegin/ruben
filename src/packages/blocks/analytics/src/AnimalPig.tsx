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
import { pig, pigHead, pigHock, pigJowl, pigLeg, pigLoin, pigNeck, pigRibs, pigShoulder, pigbacon, pigpicnis } from "./assets";

import AnalyticsController, { Props } from "./AnalyticsController";

export default class AnimalPig extends AnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    console.log("value== == == == ::::", this.props?.animalSelectedValue);
    // Customizable Area End
  }

  // Customizable Area Start
  pigCommn() {
    this.setState({
      pig: false,
      pigHead: false,
      pigJowl: false,
      pigNeck: false,
      pigShoulder: false,
      pigPicnic: false,
      pigHock: false,
      pigBacon: false,
      pigLegham: false,
      pigRibs: false,
      pigLoin: false,
    })
  }

  clickOnPigHead() {
    this.pigCommn()
    this.setState({
      pigHead: true,
    })
  }
  clickOnPigHock() {
    this.pigCommn()
    this.setState({
      pigHock: true
    })
  }

  clickOnPigBacon() {
    this.pigCommn()
    this.setState({
      pigBacon: true
    })
  }

  clickOnPigNeck() {
    this.pigCommn()
    this.setState({
      pigNeck: true
    })
  }

  clickOnPiglegham() {
    this.pigCommn()
    this.setState({
      pigLegham: true
    })
  }

  clickOnPigRib() {
    this.pigCommn()
    this.setState({
      pigRibs: true
    })
  }

  clickOnPigLoin() {
    this.pigCommn()
    this.setState({
      pigLoin: true
    })
  }

  clickOnPigShoulder() {
    this.pigCommn()
    this.setState({
      pigShoulder: true
    })
  }

  clickOnPigPicnic() {
    this.pigCommn()
    this.setState({
      pigPicnic: true
    })
  }

  clickOnPigJowl() {
    this.pigCommn()
    this.setState({
      pigJowl: true
    })
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <View style={styles.container}>
        {this.props?.animalSelectedValue == 'Pig' &&
          <View style={styles.animalImgContainer}>
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
                  source={pigHead}
                />
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
              <TouchableOpacity onPress={() => { this.clickOnPigHead() }} style={styles.clickOnPigHead} testID="pigHead">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigHock() }} style={styles.clickOnPigHockRight} testID="pigHock">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigHock() }} style={styles.clickOnPigHockLeft} testID="pigHock">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigBacon() }} style={styles.clickOnPigBacon} testID="pigBacon">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigNeck() }} style={styles.clickOnPigNeck} testID="pigNeck">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPiglegham() }} style={styles.clickOnPigLegham} testID="pigLegham">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigRib() }} style={styles.clickOnPigRib} testID="pigRib">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigLoin() }} style={styles.clickOnPigLoin} testID="pigLoin">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigShoulder() }} style={styles.clickOnPigShoulder} testID="pigShoulder">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigPicnic() }} style={styles.clickOnPigPicnic} testID="pigPicnic">
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.clickOnPigJowl() }} style={styles.clickOnPigJowl} testID="pigjowl">
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

      // Customizable Area End
    )
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

});
// Customizable Area End
