import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { styles } from "./Myprofile";
import {  BUTTON_COLOR_SECONDARY, CART, PRIMARY_COLOR, backGroundImage, badge } from "../assets";

interface RenderProductsTypes {
  navigate: (params:any)=>void;
  id: number;
  description: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  onPressRemoveFromFav: () => void;
  onPressAddToCart: () => void;
  isRecommendations?: boolean;
}
const RenderProducts = ({
  navigate,
  id,
  description,
  name,
  price,
  discount,
  image,
  onPressRemoveFromFav,
  onPressAddToCart,
  isRecommendations=false
}: RenderProductsTypes) => {
  console.log('image===',image);
  
  return (
    <View style={styles.FavContainer}>
      <TouchableOpacity
        testID={"navigateToProductDetailScreen"}
        onPress={() =>
            navigate({
            id: id,
            description: description,
            name: name,
            price: price,
          })
        }
        style={styles.renderContainer}
      >
        <ImageBackground
          resizeMode="stretch"
          style={image ? styles.itemImage : styles.itemNoImage}
          source={image?{uri:image}:backGroundImage}
        >
          <View style={styles.offerContainer}>
            <Text style={styles.offer}>{`${discount || " "}` + " 10% off"}</Text>

            <TouchableOpacity
              testID={"removeFavList"}
              onPress={onPressRemoveFromFav}
              style={[styles.badgeContainer,
                {borderWidth:1,borderColor:PRIMARY_COLOR,backgroundColor:PRIMARY_COLOR}]}
            >
              <Image resizeMode="contain" 
              style={[styles.badge,{tintColor:BUTTON_COLOR_SECONDARY},isRecommendations && {tintColor:BUTTON_COLOR_SECONDARY}]} source={badge} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.productName}>{name || " "}</Text>
          <Text style={styles.favdescription} numberOfLines={1}>
            {description || ""}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`$ ${price}` + "/Kg"}</Text>
            <TouchableOpacity
              testID={"addtocart"}
              onPress={onPressAddToCart}
              style={[styles.FavcartContainer,{backgroundColor:PRIMARY_COLOR}]}
            >
              <Image
                resizeMode="contain"
                style={[styles.Favcart,{tintColor:BUTTON_COLOR_SECONDARY}]}
                source={CART}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RenderProducts;
