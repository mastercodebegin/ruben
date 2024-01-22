import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { APP_BACKGROUND, PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR, TEXT_COLOR } from "../../blocks/landingpage/src/assets";
interface MileStoneTypes {
  list: Array<string>;
  selected: string;
}
const MileStone = ({ list, selected }: MileStoneTypes) => {
  const numberOfItems = list.length;
  const selectedIndex = list.indexOf(selected);
  const dotSize = 25;
  return (
    <View style={styles.container}>
      {list.map((item, i) => {
        return (
          <View key={item} style={styles.main}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.lineContainer}>
                {i != 0 && (
                  <View
                    style={{
                      ...styles.line,
                      backgroundColor:
                        i <= selectedIndex ? PRIMARY_COLOR : SECONDARY_COLOR,
                    }}
                  />
                )}
              </View>
              <View
                style={[
                  styles.dotContainer,
                  {
                    height: dotSize,
                    width: dotSize,
                    borderRadius: dotSize / 2,
                  },
                ]}
              >
                {i <= selectedIndex && <View style={styles.dot} />}
              </View>
              <View style={styles.lineContainer}>
                {i != numberOfItems - 1 && (
                  <View
                    style={{
                      ...styles.line,
                      backgroundColor:
                        i <= selectedIndex - 1 ? PRIMARY_COLOR : SECONDARY_COLOR,
                    }}
                  />
                )}
              </View>
            </View>
            <Text
              style={[
                styles.text,
                { color: i <= selectedIndex ? TEXT_COLOR : SECONDARY_TEXT_COLOR },
              ]}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  lineContainer: { flex: 1, justifyContent: "center" },
  dotContainer: {
    backgroundColor: APP_BACKGROUND,
    justifyContent: "center",
    borderWidth:.5,
    borderColor:PRIMARY_COLOR,
    alignItems: "center",
  },
  line: { height: 2, width: "100%" },
  container: { flexDirection: "row" },
  main: { flex: 1, alignItems: "center" },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 7.5,
  },
  selectedLine: {
    height: "100%",
    backgroundColor: PRIMARY_COLOR,
  },
  text: { color: TEXT_COLOR, textAlign: "center", fontSize: 15, paddingTop: 7 },
});
export default MileStone;
