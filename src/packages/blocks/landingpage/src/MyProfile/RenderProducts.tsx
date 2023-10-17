import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { styles } from "./Myprofile";
import { CART, backGroundImage, badge } from "../assets";

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
            <Text style={styles.offer}>{`${discount || " "}` + " % off"}</Text>

            <TouchableOpacity
              testID={"removeFavList"}
              onPress={onPressRemoveFromFav}
              style={[styles.badgeContainer,isRecommendations&&{backgroundColor:"white"}]}
            >
              <Image resizeMode="contain" style={[styles.badge,isRecommendations &&{tintColor:"#000000"}]} source={badge} />
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
              style={styles.FavcartContainer}
            >
              <Image
                resizeMode="contain"
                style={styles.Favcart}
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
