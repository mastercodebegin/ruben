import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	FlatList
} from "react-native";
import { CART, DARK_RED, LIGHT_GREY, MID_PEACH, PRIMARY, RATING, WHITE, backGroundImage, badge } from "../assets";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import { deviceHeight, deviceWidth } from "../../../../framework/src/Utilities";
import LandingPageController, { Props } from "../LandingPageController";
import CommonLoader from "../../../../components/src/CommonLoader";
import FastImage from "react-native-fast-image";

export default class ViewProduct extends LandingPageController {
	constructor(props: Props) {        
		super(props);
		this.receive = this.receive.bind(this);
	}
	async componentDidMount() {
		this.getViewAllProduct(this.props.route.params.category.id);
	}

	render() {
		return (
			<SafeAreaView style={styles.main}>
				<HeaderWithBackArrowTemplate
					headerText={this.props.route.params?.category?.name}
					scrollView
					showsVerticalScrollIndicator={false}
					navigation={this.props.navigation}
				>
					<View>
						<FlatList
                            testID="termsCondsList"
							data={this.state.viewAllProductList}
							numColumns={1}
							contentContainerStyle={styles.contentContainer}
							bounces={false}
							renderItem={({ item,index }: any) => {                                
								return (
                                    <TouchableOpacity
                                    testID={`navigate_to_product_details_id_${index}`}
                                    onPress={() =>
                                      this.props.navigation.navigate("ProductDetailScreen", {
                                        id: item?.id,
                                        description:  item?.attributes?.description,
                                        name: item?.attributes?.categoryCode,
                                        price:  item?.attributes?.price,
                                      })
                                    }
                                    style={styles.renderContainer}
                                  >
                                    <View style={styles.itemImage}>
                                      <FastImage resizeMode="stretch" style={styles.itemImage} source={item?.attributes?.productImage ? {uri:item.attributes.productImage} :backGroundImage} />
                                      <View style={{position:"absolute",right:0,left:0,top:0,bottom:0}}>
                                      <View style={styles.offerContainer}>
                 
                                          <View style={styles.ratingContainer}>
                                            <TouchableOpacity style={styles.badgeContainer}>
                                              <Image style={styles.badge} source={RATING} />
                                            </TouchableOpacity>
                                            <Text style={styles.rating}>
                                              {item?.attributes?.average_rating + "/5"}
                                            </Text>
                                          </View>
                                     
                                        <TouchableOpacity
                                          testID={"add_to_fav_id_" + index}
                                          onPress={() => this.AddToFavorites(item?.id)}
                                          style={styles.badgeContainer}
                                        >
                                          <Image resizeMode="contain" style={styles.badge} source={badge} />
                                        </TouchableOpacity>
                                      </View>
                              
                                      </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 15 }}>
                                      <Text style={styles.productName}>{ item?.attributes?.categoryCode}</Text>
                                      <Text style={styles.description} numberOfLines={1}>
                                      { item?.attributes?.description}
                                      </Text>
                                      <View style={styles.priceContainer}>
                                        <Text style={styles.price}>
                                          {`$ ${item?.attributes?.price.toFixed(2)}` + "/kg"}
                                        </Text>
                                        <TouchableOpacity
                                          testID={"add_to_cart_id_" + index}
                                          onPress={() => this.addToCart(item?.id)}
                                          style={styles.cartContainer}
                                        >
                                          <Image resizeMode="contain" style={styles.cart} source={CART} />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                    
								);
							}}
							keyExtractor={(_, index) => {
								return String(index);
							}}
						/>
					</View>
				</HeaderWithBackArrowTemplate>
                {this.state.show_loader && (
                    <CommonLoader visible={this.state.show_loader} />
                    )}
            </SafeAreaView>

		);
	}
}

export const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: LIGHT_GREY,
		paddingTop: 20,
	},
	contentContainer: {
		marginVertical: 20,
	},
	renderContainer: {
		backgroundColor: WHITE,
		width: deviceWidth * 0.9,
		overflow: "hidden",
		paddingHorizontal: 10,
		paddingTop: 10,
		borderRadius: 20,
	},
	price: {
		fontSize: 22,
		color: DARK_RED,
		fontWeight: "bold",
		marginTop: 10,
	},
	itemImage: {
		height: deviceHeight * 0.2,
		width: "100%",
		borderRadius: 18,
		overflow: "hidden",
	},
	priceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 20,
	},
	offerContainer: {
        paddingTop: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
	},
	badgeContainer: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	badge: {
		height: 20,
		width: 20,
	},
	rating: {
		color: "white",
		paddingLeft: 10,
		fontSize: 17,
		fontWeight: "bold",
	},
	productName: {
		fontSize: 22,
		color: DARK_RED,
		fontWeight: "bold",
		marginTop: 10,
	},
    description: {
        fontSize: 15,
        marginTop:8,
        color: MID_PEACH,
        paddingBottom: 15,
      },
      cartContainer: {
        paddingVertical: 10,
        backgroundColor: LIGHT_GREY,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: PRIMARY,
      },
      cart: { height: 20, width: 20 },

});