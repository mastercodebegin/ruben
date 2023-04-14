import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import {
  MEAT_IMAGE1,
  WHITE,
  DARK_RED,
  badge,
} from "../../landingpage/src/assets";
import RecomentationsController from "./RecomentationsController";
export default class Recomentations extends RecomentationsController {
  render(): React.ReactNode {
    return (
      <HeaderWithBackArrowTemplate
        headerText="Recomentations"
        navigation={this.props.navigation}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={() => {
              return (
                <View style={styles.main}>
                  <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={MEAT_IMAGE1}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={styles.text}>Meat</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>$ 29.00</Text>
                      <Text style={styles.kg}>{" / kg"}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text
                      style={{
                        flex: 1,
                        color: DARK_RED,
                        fontSize: 15,
                        paddingTop: 10,
                      }}
                    >
                      Filler text is text that shares some characteristics of a
                      real written text, but is random or otherwise generated
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          padding: 7,
                          borderRadius: 20,
                          borderColor: "red",
                          borderWidth: 2,
                          marginTop: 10,
                          marginLeft: 10,
                        }}
                      >
                        <Image
                          style={{
                            tintColor: "red",
                            height: 20,
                            width: 20,
                          }}
                          source={badge}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(_, index) => {
              return String(index);
            }}
          />
        </View>
      </HeaderWithBackArrowTemplate>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    overflow: "hidden",
    marginBottom: 15,
    borderRadius: 15,
  },
  image: { height: 200, width: "100%", borderRadius: 15 },
  text: {
    color: DARK_RED,
    fontWeight: "bold",
    fontSize: 18,
  },
  kg: {
    fontSize: 17,
    color: DARK_RED,
  },
});
