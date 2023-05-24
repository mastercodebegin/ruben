import React from "react";
import { FlatList } from "react-native";
import RenderCategories from "./ExploreStore/RenderCategories";

interface CategoriesTypes {
  data: Array<any>;
  onEndReached: () => void;
  onPressCategory: (id:string) => void;
}
const RenderCategoriesList = ({
  data,
  onEndReached,
  onPressCategory,
}: CategoriesTypes) => (
  <FlatList
    data={data}
    horizontal
    bounces={false}
    showsHorizontalScrollIndicator={false}
    onEndReached={onEndReached}
    renderItem={({ item, index }) => {
      return (
        <RenderCategories onpress={onPressCategory} item={item} index={index} />
      );
    }}
  />
);
export default RenderCategoriesList;