import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CommonLoader from "../../../components/src/CommonLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = ({ route }: any) => {
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setShowLoader(true);
    AsyncStorage.getItem("userDetails").then((res) => {
      if (res) {
        const data: any = JSON.parse(res);

        let myHeaders = new Headers();
        myHeaders.append("token", data?.meta?.token);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `https://ruebensftcapp-263982-ruby.b263982.dev.eastus.az.svc.builder.cafe/bx_block_posts/posts/${route?.params?.video}`,
          //@ts-ignore
          requestOptions
        )
          .then(async (response) => {
            const res = await response.json();
            const item = res.data;
            setShowLoader(false);
            navigation.reset({
                index: 1,
                routes: [{ name: "LandingPage" },
            {name:'DetailsPage',params:{
                name: item?.attributes?.name,
                created_at: item?.attributes?.created_at,
                url: item?.attributes?.videos[0]?.url,
                description: item?.attributes?.description,
                type: "video",
              }}],
              });
          })
          .catch((error) => console.log("error", error));
      } else {
        setShowLoader(false);

        navigation.reset({
          index: 0,
          routes: [{ name: "EmailAccountLoginBlock" }],
        });
      }
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <CommonLoader visible={showLoader} />
    </View>
  );
};
export default LoadingScreen;
