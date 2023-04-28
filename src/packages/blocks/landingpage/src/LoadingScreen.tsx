import React from "react";
import { Alert, View } from "react-native";
import CommonLoader from "../../../components/src/CommonLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  showLoader: boolean;
}

interface SS {
  id: any;
}

export default class LoadingScreen extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.CountryCodeMessage),
    ];

    this.state = {
      showLoader: false,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  getDetailsId: string = "";

  async componentDidMount() {
    this.getBlogDetails();
  }

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getDetailsId != null &&
      this.getDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let blogDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong");
      } else {
        AsyncStorage.getItem("userDetails").then((res) => {
          if (res) {
            this.setState({showLoader:false})
            this.props.navigation.reset({
              index: 1,
              routes: [
                { name: "LandingPage" },
                {
                  name: "DetailsPage",
                  params: {
                    name: blogDetails?.data?.attributes?.name,
                    created_at: blogDetails?.date?.attributes?.created_at,
                    url: blogDetails?.data?.attributes?.videos[0]?.url,
                    description: blogDetails?.data?.attributes?.description,
                    type: "video",
                  },
                },
              ],
            });
          } else {
            this.setState({showLoader:false})
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "EmailAccountLoginBlock" }],
            });
          }
        });
      }
    }
  }
  async getBlogDetails() {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getDetailsId = subcategory.messageId;

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_posts/posts/${this.props.route?.params?.video}`
    );

    subcategory.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    subcategory.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(subcategory.id, subcategory);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CommonLoader visible={this.state.showLoader} />
      </View>
    );
  }
}
