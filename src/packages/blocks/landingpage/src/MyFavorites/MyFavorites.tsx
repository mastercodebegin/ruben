import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import { WHITE, DARK_RED, badge, MID_PEACH, LIGHT_GREY, PRIMARY, CART } from "../assets";
import CommonLoader from "../../../../components/src/CommonLoader";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { IBlock } from "../../../../framework/src/IBlock";
import { runEngine } from "../../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const configJSON = require("../config");

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  show_loader: boolean;
  favoritesList: Array<any>;
}

interface SS {
  id: any;
}
interface MetaTypes {
  token: string;
}
interface AsyncStorageType {
  meta: MetaTypes;
}
export default class MyFavorites extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
    ];
    this.state = {
      show_loader: false,
      favoritesList: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    this.getFavorites();
  }
  getFavoritesId: string = "";
  async getFavorites() {
    this.setState({ show_loader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: AsyncStorageType = JSON.parse(userDetails);
    const headers = {
      token: data.meta.token,
    };
    const Favorites = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getFavoritesId = Favorites.messageId;
    Favorites.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.favoritesEndPoint
    );
    Favorites.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    Favorites.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(Favorites.id, Favorites);
  }

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getFavoritesId != null &&
      this.getFavoritesId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let Favorites = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong please try again", [
          {
            text: "OK",
            onPress: () => this.setState({ show_loader: false }),
          },
        ]);
      } else {
        this.setState({
          show_loader: false,
          favoritesList: Favorites.data || [],
        });
        console.log("favoritesList == == == =::",this.state.favoritesList);
        
      }
    }
  }
  render() {
    return (
      <HeaderWithBackArrowTemplate
        headerText="My Favorites"
        navigation={this.props.navigation}
      >
        {this.state.show_loader ? (
          <View>
            <CommonLoader visible={this.state.show_loader} />
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.favoritesList}
              numColumns={1}
              contentContainerStyle={styles.contentContainer}
              bounces={false}
              renderItem={({ item }) => {
                // if (!item?.attributes?.catalogue_id?.data) {
                //   return <></>;
                // }
                console.log('itttttmmmmmmm', item);
                return (
                  // <View style={styles.main}>
                  //   <Image
                  //     resizeMode="stretch"
                  //     style={styles.image}
                  //     source={{
                  //       uri:
                  //         item?.attributes?.catalogue_id?.data?.attributes
                  //           ?.images[0]?.url,
                  //     }}
                  //   />
                  //   <View style={styles.renderContainer}>
                  //     <Text style={styles.text}>
                  //       {item?.attributes?.catalogue_id?.data?.attributes?.name}
                  //     </Text>
                  //     <View style={styles.row}>
                  //       <Text style={styles.text}>
                  //         ${" "}
                  //         {
                  //           item?.attributes?.catalogue_id?.data?.attributes
                  //             ?.price
                  //         }
                  //       </Text>
                  //       <Text style={styles.kg}>{" / kg"}</Text>
                  //     </View>
                  //   </View>
                  //   <View style={styles.descriptionContainer}>
                  //     <Text style={styles.description}>
                  //       {
                  //         item?.attributes?.catalogue_id?.data?.attributes
                  //           ?.description
                  //       }
                  //     </Text>
                  //     <View>
                  //       <TouchableOpacity style={styles.badgeButton}>
                  //         <Image style={styles.badge} source={badge} />
                  //       </TouchableOpacity>
                  //     </View>
                  //   </View>
                  // </View>

                  <View style={styles.FavContainer}>
                    <TouchableOpacity
                      testID={'navigateToProductDetailScreen'}
                      // onPress={() =>
                      //   this.props.navigation.navigate("ProductDetailScreen", {
                      //     id:item?.id,
                      //     description: item?.attributes?.catalogue_id?.data?.attributes?.description,
                      //     name: item?.attributes?.catalogue_id?.data?.attributes?.name,
                      //     price: item?.attributes?.catalogue_id?.data?.attributes?.price,
                      //   })
                      // }
                      style={styles.renderContainer}
                    >
                      <ImageBackground
                        resizeMode="stretch"
                        style={[
                          item?.attributes?.catalogue_id
                            ?.data?.attributes?.productImage
                            ? styles.itemImage
                            : styles.itemNoImage,
                        ]}
                        source={{
                          uri: item?.attributes?.catalogue_id
                            ?.data?.attributes?.productImage
                        }}
                      >
                        <View style={styles.offerContainer}>
                          <Text style={styles.offer}>
                            {`${item?.attributes?.catalogue_id?.data?.attributes?.discount ? item?.attributes?.catalogue_id?.data?.attributes?.discount : " "}` + " % off"}
                          </Text>

                          <TouchableOpacity
                            testID={"removeFavList"}
                            // onPress={() => this.removeFavListProduct(item?.id)}
                            style={styles.badgeContainer}
                          >
                            <Image resizeMode="contain" style={styles.badge} source={badge} />
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                      <View style={{ paddingHorizontal: 15 }}>
                        <Text style={styles.productName}>{item?.attributes?.catalogue_id
                          ?.data?.attributes?.name ? item?.attributes?.catalogue_id
                            ?.data?.attributes?.name : ' '}</Text>
                        <Text style={styles.favdescription} numberOfLines={1}>
                          {item?.attributes?.catalogue_id?.data?.attributes?.description}
                        </Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>
                            {`$ ${item?.attributes?.catalogue_id?.data?.attributes?.price}` + "/Kg"}
                          </Text>
                          <TouchableOpacity
                            testID={"addtocart"}
                            // onPress={() => this.addToCart(item?.id)}
                            style={styles.FavcartContainer}
                          >
                            <Image resizeMode="contain" style={styles.Favcart} source={CART} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(_, index) => {
                return String(index);
              }}
            />
          </View>
        )}
      </HeaderWithBackArrowTemplate>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: LIGHT_GREY,
    paddingHorizontal: 10,
  },
  text: {
    color: DARK_RED,
    fontWeight: "bold",
    fontSize: 18,
  },
  renderContainer: {
    backgroundColor: WHITE,
    width: deviceWidth * 0.77,
    marginRight: 20,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 20,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  badgeButton: {
    padding: 7,
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 10,
  },
  badge: {
    tintColor: "red",
    height: 20,
    width: 20,
  },
  contentContainer: { paddingHorizontal: 10 },
  flex: { flex: 1 },
  row: { flexDirection: "row" },

  FavContainer: {
    padding: 0
  },
  itemImage: {
    height: deviceHeight * 0.2,
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  itemNoImage: {
    height: deviceHeight * 0.2,
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: MID_PEACH,
  },
  offerContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offer: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 17,
  },
  badgeContainer: {
    backgroundColor: DARK_RED,
    padding: 10,
    borderRadius: 20,
  },
  productName: {
    fontSize: 22,
    color: DARK_RED,
    fontWeight: "bold",
    marginTop: 15,
  },
  FavcartContainer: {
    paddingVertical: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  Favcart: { height: 20, width: 20 },
  favdescription: {
    fontSize: 17,
    color: MID_PEACH,
    paddingBottom: 15,
  },
  price: {
    fontSize: 22,
    color: DARK_RED,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
});
