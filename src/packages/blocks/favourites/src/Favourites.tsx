import React from "react";
// Customizable Area Start
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
// Customizable Area End

import { Props, configJSON } from "./FavouritesController";

import FavouritesController from "./FavouritesController";
import { DARK_RED, MEAT_IMAGE1, WHITE, arrowLeft, badge } from "../../landingpage/src/assets";

export default class Favourites extends FavouritesController {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
  }
  //@ts-ignore
  componentDidMount() {
    this.getFavoritesList()
  }

  render() {
    return (
      //@ts-ignore
      <SafeAreaView style={styles.flex}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image style={styles.backImage} source={arrowLeft} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{"My Favorites"}</Text>
        </View>
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
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text style={{ flex: 1, color: DARK_RED, fontSize: 15, paddingTop: 10 }}>
                      Filler text is text that shares some characteristics of a
                      real written text, but is random or otherwise generated
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          padding: 7,
                          borderRadius: 20,
                          borderColor: 'red',
                          borderWidth: 2,
                          marginTop: 10,
                          marginLeft: 10
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
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  flex: { flex: 1 },
  headerContainer: { flexDirection: "row", alignItems: "center",padding:15 },
  headerText: {
    fontSize: 25,
    paddingLeft: 20,
    color: DARK_RED,
    fontWeight: "400",
  },
  backImage: { height: 20, width: 20 },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
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
// Customizable Area End
