import { Share ,Platform} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export const isIOs = Platform.OS === 'ios';
import { createStore } from 'redux';
const imagePath = isIOs ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
export const downloadFiles = (
  url: string,
  fileName: string,
  title: string,
  mime: string,
  descriptionAndroid: string,
  notification: boolean,
  useDownloadManager: boolean
) => {
  const filePath = `${imagePath}/rubensftcapp/${fileName}`;
  return new Promise((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
      path: filePath,
      addAndroidDownloads: {
        useDownloadManager,
        notification,
        title,
        description: descriptionAndroid,
        mime,
        path: filePath,
      },
    })
      .fetch("GET", url)
      .then(async () => {
        resolve(isIOs ?`file://${filePath}`: filePath)
      })
      .catch((error) => {
        reject(error);
      })
  });
};

export const shareFiles = async (
  content: string,
  url: string,
  title: string
) => {
  return new Promise((resolve, reject) => {
    Share.share({
      message: content,
      url,
      title,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

const initialState = { currentUser: 'user', profileDetails: null,cartDetails:[] };

const reducer = (state = initialState, action: any) => {
    switch (action?.type) {
      case 'UPDATE_USER':
        return { ...state, currentUser: action.payload }
      case 'PROFILE_DETAILS':
        return { ...state, profileDetails: action.payload }
      case 'UPDATE_CART_DETAILS':
        return {...state,cartDetails:action.payload}
      default:
        return state;
    }
  };

  export const store = createStore(reducer);

  const config = {
    screens: {
    },
  };
  
 export const linking:any = {
    prefixes: ['https://'],
    config: config,
    getStateFromPath: (path: string) => {
      const specifiedPath =  path.split("=")[0];
      const screen =specifiedPath.split("/").pop()
      switch (screen) {
        case 'video':
          return {
            routes: [
              {
                name: 'LoadingScreen',
                params: { video: path?.split("video=")[1] },
              },
            ],
          };
        case 'token':
          return {
            routes: [
              {
                name: 'ResetPassword',
                params: { token: path?.split("token=")[1] },
              },
            ],
          };
          case'blogpost':
          return {
            routes: [
              {
                name: 'LoadingScreen',
                params: { blog :true , id: path?.split("blogpost=")[1] },
              },
            ],
          };
          case'product':
          return {
            routes: [
              {
                name: 'LoadingScreen',
                params: { product :true , id: path?.split("product=")[1] },
              },
            ],
          };
        default:
          return null;
      }
    },
  };