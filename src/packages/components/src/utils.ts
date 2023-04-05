import { Share ,Platform} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
export const isIOs = Platform.OS === 'ios' 
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
