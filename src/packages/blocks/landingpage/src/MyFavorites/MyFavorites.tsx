import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import { WHITE, DARK_RED, badge } from "../assets";
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
          <View style={styles.flex}>
            <FlatList
              data={this.state.favoritesList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              bounces={false}
              renderItem={({ item }) => {
                if (!item?.attributes?.catalogue_id?.data) {
                  return <></>;
                }
                return (
                  <View style={styles.main}>
                    <Image
                      resizeMode="stretch"
                      style={styles.image}
                      source={{
                        uri:
                          item?.attributes?.catalogue_id?.data?.attributes
                            ?.images[0]?.url,
                      }}
                    />
                    <View style={styles.renderContainer}>
                      <Text style={styles.text}>
                        {item?.attributes?.catalogue_id?.data?.attributes?.name}
                      </Text>
                      <View style={styles.row}>
                        <Text style={styles.text}>
                          ${" "}
                          {
                            item?.attributes?.catalogue_id?.data?.attributes
                              ?.price
                          }
                        </Text>
                        <Text style={styles.kg}>{" / kg"}</Text>
                      </View>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>
                        {
                          item?.attributes?.catalogue_id?.data?.attributes
                            ?.description
                        }
                      </Text>
                      <View>
                        <TouchableOpacity style={styles.badgeButton}>
                          <Image style={styles.badge} source={badge} />
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
        )}
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
  renderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
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
  descriptionContainer: { flexDirection: "row", width: "100%" },
  contentContainer: { paddingHorizontal: 20 },
  flex: { flex: 1 },
  row: { flexDirection: "row" },
});
