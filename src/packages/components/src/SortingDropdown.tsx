import React, { ReactElement } from "react";
import { View, Modal, StyleSheet, ActivityIndicator, Text, TouchableOpacity, FlatList } from "react-native";
interface Props {
    visible: boolean;
    sorting?: number | "high" | "low";
    onpressButton?: () => void;
    onItemPress?: () => void;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: any) => void;
}
const SortingDropdown = ({
    visible = false,
    sorting = "low",
    data = [],
    onpressButton = () => { },
    onSelect=(itme) => {},
    onItemPress = () => { },

}: Props) => {
    const renderItem = ({ item }): ReactElement<any, any> => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        );
    };
      
    return (
        <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
                style={styles.overlay}
                onPress={onpressButton}
            >
                <View style={[styles.dropdown, { top: 140, right: 25 }]}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
export default SortingDropdown;
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    blur: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'white',
        opacity: 0.5
    },
    loading: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 10
    },
    loaderContainer: {
        justifyContent: 'center'
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '50%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },

});
