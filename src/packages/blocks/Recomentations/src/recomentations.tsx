import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import CommonLoader from "../../../components/src/CommonLoader";
import HeaderWithBackArrowTemplate from "../../../components/src/HeaderWithBackArrowTemplate";
import {
  WHITE,
  DARK_RED,
  badge,
  backGroundImage,
} from "../../landingpage/src/assets";
import RecomentationsController from "./RecomentationsController";
export default class Recomentations extends RecomentationsController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);
  }
  async componentDidMount() {
    this.callRecomentationsApi();
  }
  render(): React.ReactNode {
    return (
      <HeaderWithBackArrowTemplate
        headerText="Recommendations"
        navigation={this.props.navigation}
      >
        {this.state.show_loader ?
        <CommonLoader visible={this.state.show_loader}/>:
        <View style={styles.flex}>
          <FlatList
            data={this.state.recomentedProducts}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{paddingHorizontal:20}}
              renderItem={({ item }: any) => {                  
              return (
                <TouchableWithoutFeedback onPress={() => {
                  this.props.navigation.navigate("ProductDetailScreen", {
                    id: item?.id,
                    description: item?.attributes?.description,
                    name: item?.attributes?.categoryCode,
                    price: item?.attributes?.price
                  })
                }}>
                  <View  style={styles.main}>
                  <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={backGroundImage}
                  />
                  <View
                    style={styles.row}
                  >
                    <Text style={styles.text}>{item?.attributes?.categoryCode}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text}>$ {item?.attributes?.price}</Text>
                      <Text style={styles.kg}>{" / kg"}</Text>
                    </View>
                  </View>
                  <View style={styles.descContainer}>
                    <Text
                      style={styles.description}
                    >
                     {item?.attributes?.description}
                    </Text>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(_, index) => {
              return String(index);
            }}
          />
        </View>}
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
  badgeContainer:{
    padding: 7,
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 10,
  },
  description:{
    flex: 1,
    color: DARK_RED,
    fontSize: 15,
    paddingTop: 10,
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  badge:{
    tintColor: "red",
    height: 20,
    width: 20,
  },
  descContainer:{ flexDirection: "row", width: "100%" },
  flex:{ flex: 1 }
});
