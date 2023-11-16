import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	ImageBackground,
} from "react-native";
import { CART, DARK_RED, LIGHT_GREY, MID_PEACH, PRIMARY, WHITE, backGroundImage, badge } from "../assets";
import HeaderWithBackArrowTemplate from "../../../../components/src/HeaderWithBackArrowTemplate";
import { deviceHeight, deviceWidth } from "../../../../framework/src/Utilities";
import LandingPageController, { Props } from "../LandingPageController";
export default class MyFavoritesScreen extends LandingPageController {
	constructor(props: Props) {
		super(props);
		this.receive = this.receive.bind(this);
	}
	async componentDidMount() {
		this.getFavorites();
	}

	render() {
		return (
			<SafeAreaView style={styles.main}>
				<HeaderWithBackArrowTemplate
					headerText="My Favorites"
					scrollView
					showsVerticalScrollIndicator={false}
					navigation={this.props.navigation}
				>
					<View>
						<FlatList
							data={this.state.showFavoriteList}
							numColumns={1}
							contentContainerStyle={styles.contentContainer}
							bounces={false}
							renderItem={({ item }: any) => {
								return (
									<View style={styles.FavContainer}>
										<TouchableOpacity
											testID={'navigateToProductDetailScreen'}
											onPress={() =>
												this.props.navigation.navigate("ProductDetailScreen", {
													id: item?.id,
													description: item?.attributes?.catalogue_id?.data?.attributes?.description,
													name: item?.attributes?.catalogue_id?.data?.attributes?.categoryCode,
													price: item?.attributes?.catalogue_id?.data?.attributes?.price,
												})
											}
											style={styles.renderContainer}
										>
											<ImageBackground
												resizeMode="stretch"
												style={[
													item?.attributes?.catalogue_id
														?.data?.attributes?.images[0]?.url
														? styles.itemImage
														: styles.itemNoImage,
												]}
												source={item?.data?.attributes?.images[0]?.url?{
													
												
													uri: item?.attributes?.catalogue_id
														?.data?.attributes?.images[0]?.url
												}:backGroundImage}
											>
												<View style={styles.offerContainer}>
													<TouchableOpacity
														testID={"removeFavList"}
														onPress={() =>{this.removeFavListProduct(item?.id)
														setTimeout(() => {
															this.getFavorites()
														}, 500);	
														}}
														style={styles.badgeContainer}
													>
														<Image resizeMode="contain" style={styles.badge} source={badge} />
													</TouchableOpacity>
												</View>
											</ImageBackground>
											<View style={{ paddingHorizontal: 15 }}>
											<View style={styles.priceContainer}>
												<Text style={styles.productName}>{item?.attributes?.catalogue_id
														?.data?.attributes?.categoryCode ||''}</Text>
														<Text style={styles.price}>
														{`$ ${item?.attributes?.catalogue_id?.data?.attributes?.price}`}
														<Text style={styles.kgStyle}>/Kg</Text>
													</Text>
												</View>
												<View style={styles.priceContainer}>
													<Text style={styles.favdescription}>
													{item?.attributes?.catalogue_id
														?.data?.attributes?.description}
													</Text>
													<TouchableOpacity
														testID={"addtocart"}
														onPress={() =>{ this.addToCart(item?.attributes?.catalogue_id?.data?.id)
														}}
														style={styles.FavcartContainer}
													>
														<Image resizeMode="contain" style={styles.Favcart} source={CART} />
													</TouchableOpacity>
												</View>
												
											</View>
										</TouchableOpacity>
									</View>
								);
							}}
							keyExtractor={(_, index) => {
								return String(index);
							}}
						/>
					</View>
				</HeaderWithBackArrowTemplate>
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
	FavContainer: {
		padding: 0,
		marginBottom:20,
	},
	renderContainer: {
		backgroundColor: WHITE,
		width: deviceWidth * 0.9,
		overflow: "hidden",
		paddingHorizontal: 10,
		paddingTop: 10,
		borderRadius: 20,
	},
	favdescription: {
		fontSize: 17,
		color: MID_PEACH,
		// paddingBottom: 5,
		width:'80%'
	},
	price: {
		fontSize: 22,
		color: DARK_RED,
		fontWeight: "bold",
		marginTop: 10,
	},
	kgStyle:{
		fontSize: 17,
		color: DARK_RED,
		fontWeight: "500",
		marginTop: 10,
	},
	itemImage: {
		height: deviceHeight * 0.2,
		width: "100%",
		borderRadius: 18,
		overflow: "hidden",
	},
	itemNoImage: {
		height: deviceHeight * 0.2,
		width: "100%",
		borderRadius: 18,
		overflow: "hidden",
		backgroundColor: MID_PEACH,
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
		justifyContent: "flex-end",
		alignItems: "center",
	},
	itemHeader: {
		paddingHorizontal: 20,
		paddingTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	offer: {
		color: WHITE,
		fontWeight: "bold",
		fontSize: 17,
	},
	badgeContainer: {
		backgroundColor: DARK_RED,
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
		tintColor: WHITE
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
	FavcartContainer: {
		paddingVertical: 10,
		backgroundColor: LIGHT_GREY,
		borderRadius: 20,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: PRIMARY,
	},
	Favcart: { height: 20, width: 20 },


});
