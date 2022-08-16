import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";


import PostCreationCommonController from './PostCreationCommonController'

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
// Customizable Area End

export const configJSON = require("./config");

export default class PostCreationController extends PostCreationCommonController {
  // Customizable Area Start
  // Customizable Area End

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  chooseImage = () => {

    const options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };
    
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true
    }).then(async (image:any) => {
      let filename = image.path.substring(
        image.path.lastIndexOf("/") + 1,
        image.path.length
      );
      this.setState({
        image: image.sourceURL,
        profileImageData: {
          data: image.data,
          filename: filename,
          content_type: image.mime
        }
      });
    });
  };
  // Customizable Area End
}
