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
  getBlogPostId:string ="";
  getProductDetailsId:string = "";

  async componentDidMount() {
    if(this.props.route.params.blog){      
      this.getBlogPostDetails(this.props.route.params.id);
    }else if(this.props.route.params.product){
      this.getProductDetails(27)
    }
    else {
      this.getVideoLibrary();
    }
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
     this.videoLibraryCallback(blogDetails,error)
    }
    else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getBlogPostId != null &&
      this.getBlogPostId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      let blogPostDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      console.log('blogPostDetailsblogPostDetails ',blogPostDetails);
      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        Alert.alert("Error", "Something went wrong");
      }else {
        console.log('blogPostDetails?.data?.attributes?.name ',blogPostDetails?.data?.attributes?.name);
        
        this.props.navigation.reset({
          index: 1,
          routes: [
            { name: "LandingPage" },
            {
              name: "DetailsPage",
              params: {
                name: blogPostDetails?.data?.attributes?.name,
                created_at: blogPostDetails?.date?.attributes?.created_at,
                url: blogPostDetails?.data?.attributes?.images[0]?.url,
                description: blogPostDetails?.data?.attributes?.description,
                id:blogPostDetails?.data?.attributes?.id,
                type: "image",
              },
            },
          ],
        });
      }
    }  else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductDetailsId != null &&
      this.getProductDetailsId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      let productDetails = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );      
      let error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
     this.productDetailCallBack(productDetails,error)
    }
    
  }
  videoLibraryCallback(blogDetails:any,error:any){
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

  productDetailCallBack(productDetails:any,error:any){
    if (error) {
      Alert.alert("Error", "Something went wrong");
    }else {        
      console.log('productDetails ',productDetails);
      
    }
  }
  async getVideoLibrary() {
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
  async getBlogPostDetails(id:number) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getBlogPostId = subcategory.messageId;    

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_posts/posts/show?id=${id}`
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
  async getProductDetails(id:number) {
    this.setState({ showLoader: true });
    const userDetails: any = await AsyncStorage.getItem("userDetails");
    const data: any = JSON.parse(userDetails);
    const headers = {
      token: data?.meta?.token,
    };
    const subcategory = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getProductDetailsId = subcategory.messageId;    

    subcategory.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_catalogue/catalogues/show?id=${27}`
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
