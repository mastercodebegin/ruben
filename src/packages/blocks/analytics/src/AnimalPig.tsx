import React from "react";

import {
  StyleSheet,
  View,
  // Customizable Area Start
  Image
  // Customizable Area End
} from "react-native";
import { pig } from "./assets";

import AnalyticsController, { Props } from "./AnalyticsController";

export default class AnimalChicken extends AnalyticsController {
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
          <View style={styles.animalImgCont}>
            <Image
                style={styles.animalImg}
                resizeMode="contain"
                source={pig}
              />
          </View>
      // Customizable Area End
    )
  }
}
  // Customizable Area Start
  const styles = StyleSheet.create({
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
  });
// Customizable Area End
