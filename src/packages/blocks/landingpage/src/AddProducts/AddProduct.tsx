import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,

} from "react-native";
import LandingPageController from "../LandingPageController";
import {

  LIGHT_GREY,
  close,
  backArrow,
  TEXT_COLOR,
  SECONDARY_COLOR,
  APP_BACKGROUND,
  SECONDARY_TEXT_COLOR,
  BUTTON_TEXT_COLOR_SECONDARY,
  PRIMARY_COLOR,
  ICON_COLOR
} from "../assets";
import {
  ADD_PRODUCTS,
  ADD_MORE,
  PRODUCT,
  ENTERT_TITLE,
  ENTER_DESCRPTION,
  ENTER_PRICE,
  PER_KG,
  UPLOAD_IMAGE,
  PUBLISH_NOW,
  CHOOSE_CATEGORY,
  CANCEL,
  CHOOSE_SUB_CATEGORY
  //@ts-ignore
} from "../../../../components/src/constants";
import Button from "../../../../components/src/CustomButton";
import { Dropdown } from "../../../../components/src/DropDown/src";
import CommonLoader from "../../../../components/src/CommonLoader";

export default class AddProducts extends LandingPageController {
  constructor(props: any) {
    super(props);
    this.receive = this.receive.bind(this);
  }
  async componentDidMount() {
    this.getCategory.bind(this)(1)
  }
  render() {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: APP_BACKGROUND }]}>
        <KeyboardAvoidingView behavior="padding" style={styles.main}>
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity testID="goBack" onPress={() => this.props.navigation.goBack()}>
                <Image style={{ height: 15, width: 15 }} source={backArrow} />
              </TouchableOpacity>
              <Text style={styles.header}>{ADD_PRODUCTS}</Text>
            </View>
            <TouchableOpacity
              testID="addMore"
              onPress={() =>
                this.setState({
                  productsList: [
                    ...this.state.productsList,
                    { category_id: '', sub_category_id: '', name: "", price: "", images: [] },
                  ],
                })
              }
            >
              <Text style={styles.addMore}>{`+ ${ADD_MORE}`}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            testID="Product_list_id"
            data={this.state.productsList}
            bounces={false}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => {
              return String(index);
            }}
            renderItem={({ item, index }: any) => {
              return (
                <View style={styles.productContainer}>
                  <Text style={styles.productHeader}>{`#${index +
                    1} ${PRODUCT}`}</Text>
                  <Text style={styles.label}>{ENTERT_TITLE}</Text>
                  <TextInput
                    //@ts-ignore
                    value={item.title}
                    onChangeText={(title) => {
                      const list = this.state.productsList;
                      list[index] = {
                        ...list[index],
                        name: title,
                      };
                      this.setState({ productsList: list });
                    }}
                    style={styles.textInput}
                  />
                  <Text style={styles.label}>{CHOOSE_CATEGORY}</Text>
                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={styles.containerStyle}
                      data={this.state.categoryList}
                      maxHeight={400}
                      itemContainerStyle={{ padding: 8, paddingLeft: 20 }}
                      labelField="title"
                      valueField="title"
                      placeholder={this.state.categoryItem ? this.state.categoryItem : 'Select item'}

                      onChange={(item: any) => {
                        console.log('', item)

                        this.getSubcategories(item?.id)
                        const list = this.state.productsList;
                        list[index] = {
                          ...list[index],
                          category_id: item?.id,
                        };
                        this.setState({ productsList: list, categoryItem: item.title, subCategoryList: [], subCategoryItem: '' })
                      }}
                      renderItem={(item: any) => {
                        return (
                          <View>
                            <Text style={styles.textItem}>{item?.title}</Text>
                          </View>
                        )
                      }}
                      value={this.state.categoryItem}
                    />

                  </View>
                  <Text style={styles.label}>{CHOOSE_SUB_CATEGORY}</Text>
                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={styles.containerStyle}
                      itemContainerStyle={{ margin: 8 }}
                      data={this.state.subCategoryList}
                      maxHeight={400}
                      labelField="title"
                      valueField="title"
                      placeholder={this.state.subCategoryItem ? this.state.subCategoryItem : 'Select item'}
                      onChange={(item: any) => {
                        const list = this.state.productsList;
                        list[index] = {
                          ...list[index],
                          sub_category_id: item?.id,
                        };
                        this.setState({ productsList: list, subCategoryItem: item?.title })
                      }}
                      renderItem={(item: any) => {
                        return (
                          <View style={styles.itemListStyle}>
                            <Text style={styles.textItem}>{item?.title}</Text>
                          </View>
                        )
                      }}
                      value={this.state.subCategoryItem}
                    />
                  </View>
                  <Text style={styles.label}>{ENTER_DESCRPTION}</Text>
                  <TextInput
                    //@ts-ignore
                    value={item?.desciption}
                    multiline
                    onChangeText={(desciption) => {
                      const list = this.state.productsList;
                      list[index] = {
                        ...list[index],
                        desciption: desciption,
                      };
                      this.setState({ productsList: list });
                    }}
                    style={[styles.textInput, { height: 70 }]}
                  />
                  <Text style={styles.label}>{ENTER_PRICE}</Text>
                  <View style={styles.priceTextInput}>
                    <Text style={styles.dollar}>$</Text>
                    <TextInput
                      //@ts-ignore
                      value={item.price}
                      keyboardType="number-pad"
                      onChangeText={(price) => {
                        const list = this.state.productsList;
                        list[index] = {
                          ...list[index],
                          price: price,
                        };
                        this.setState({ productsList: list });
                      }}
                      style={[styles.textInput, styles.priceText]}
                    />
                    <Text style={styles.perKg}>{PER_KG}</Text>
                  </View>
                  <Text style={styles.label}>{UPLOAD_IMAGE}</Text>
                  <FlatList
                    data={item?.images}
                    keyExtractor={(_, index) => {
                      return String(index)
                    }}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => {
                      return (<TouchableOpacity
                        style={styles.addImage}
                        onPress={() =>
                          this.selectImage.bind(this)(
                            (res) => {
                              const list = this.state.productsList;
                              list[index] = {
                                ...list[index],
                                //@ts-ignore
                                images: [...list[index].images, res],
                              };
                              this.setState({ productsList: list });
                            },
                            (err) => {
                              Alert.alert('Error', 'Something ')
                            }
                          )
                        }
                      >
                        <Text style={{ color: PRIMARY_COLOR, fontSize: 20 }}>+</Text>
                      </TouchableOpacity>)
                    }}
                    horizontal
                    renderItem={(prop: any) => {
                      return (
                        <ImageBackground
                          source={{ uri: Platform.OS === 'ios' ? `file://${prop.item?.path}` : prop.item?.path }}
                          style={styles.imagesContainer}>
                          <TouchableOpacity onPress={() => {
                            const imageList = [...item.images]
                            imageList.splice(prop.index, 1)
                            const list = this.state.productsList;
                            list[index] = {
                              ...list[index],
                              images: [...imageList],
                            };
                            this.setState({ productsList: list });
                          }} style={styles.closeContainer}>
                            <View style={styles.blur} />
                            <Image resizeMode="contain" style={styles.closeIcon} source={close} />
                          </TouchableOpacity>
                        </ImageBackground>
                      )
                    }} />
                </View>
              );
            }}
            ListFooterComponent={() => (
              <View style={{ height: 200 }}>
                <Button style={styles.buttonStyle} onPress={() => { this.addProduct() }} label={PUBLISH_NOW} />
                <Button style={[styles.buttonStyle, { backgroundColor: APP_BACKGROUND, color: BUTTON_TEXT_COLOR_SECONDARY }]} transparentBackground onPress={() => { this.props.navigation.navigate('ExplorePage') }} label={CANCEL} />
              </View>
            )}
          />
          {this.state.show_loader && (
            <CommonLoader visible={this.state.show_loader} />
          )}
        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 5
  },
  dollar: {
    fontSize: 17,
    color: TEXT_COLOR,
    paddingLeft: 20,
    fontWeight: 'bold'
  },
  closeIcon: {
    height: '25%',
    width: '25%',
    tintColor: 'white'
  },
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.5
  },
  closeContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagesContainer: {
    height: 80,
    width: 80,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  priceText: {
    flex: 1,
    paddingHorizontal: undefined,
  },
  priceTextInput: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
  },
  perKg: {
    paddingHorizontal: 10,
    fontSize: 15,
    color: "grey",
  },
  addImage: {
    height: 80,
    width: 80,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderStyle: "dotted",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  label: {
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14,
    paddingBottom: 10,
    paddingTop: 10,
  },
  productContainer: {
    backgroundColor: APP_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  productHeader: {
    color: TEXT_COLOR,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: SECONDARY_COLOR,
    paddingVertical: Platform.OS === "ios" ? 15 : undefined,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 17,
    color: TEXT_COLOR,
    fontWeight: 'bold'
  },
  safeArea: { flex: 1, backgroundColor: LIGHT_GREY },
  main: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    color: TEXT_COLOR,
    fontSize: 22,
    paddingLeft: 15
  },
  addMore: {
    color: TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 10,
    marginBottom: 0
  },
  dropdown: {
    height: 50,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemListStyle: {
    padding: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: TEXT_COLOR,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: TEXT_COLOR
  },
  placeholderStyle: {
    fontSize: 16,
    color: TEXT_COLOR
  },
  selectedTextStyle: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: "700",
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: ICON_COLOR,
  },
  containerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -38
  }
});
