import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import RequestBook from "../../services/RequestBook";
import {
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Input,
    Divider,
    useStyleSheet,
    useTheme,
    MenuItem,
    OverflowMenu,
} from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import BookItem from "../BookList/BookItem";
import firestore from "@react-native-firebase/firestore";

const Search = ({ route }) => {
    const { categories } = route.params;
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

    const onItemSelect = index => {
        if (index !== selectedIndex) {
            const categoryId = categories?.[index - 2]?.id || 0;
            if (categoryId) {
                searchApi({ categoryId: categoryId });
            } else if (searchTerm.length >= 3) {
                searchApi({});
            }
        }
        setSelectedIndex(index);
        setVisible(false);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length >= 3) {
                searchApi({});
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const searchApi = async ({ categoryId }) => {
        try {
            let params = {
                page: 1,
                page_size: 50,
                keyword: searchTerm,
            };

            if (categoryId) {
                params = {
                    ...params,
                    category_id: categoryId,
                };
            }

            setLoading(true);
            const todoRefStory = firestore().collection('stories');

            todoRefStory.onSnapshot(
                querySnapshot => {
                    const datas = []
                    querySnapshot.forEach((doc) => {
                        datas.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    })
                    console.info("===========[] ===========[STORY] : ",datas);
                    setSearchResults(datas);
                }
            )
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error searching for products:", error);
        }
    };

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<Icon name="arrow-back" />}
            onPress={() => navigation.goBack()}
        />
    );

    const renderFilter = () => {
        return (
            <OverflowMenu
                anchor={() => (
                    <TopNavigationAction
                        icon={
                            <Icon
                                name={selectedIndex > 1 ? "funnel" : "funnel-outline"}
                                fill={selectedIndex > 1 ? theme["color-success-700"] : null}
                            />
                        }
                        onPress={() => setVisible(true)}
                    />
                )}
                visible={visible}
                selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}>
                <MenuItem title={"Bỏ lọc"} style={{ backgroundColor: "#D9D8D8" }} />
                {categories.map((obj, index) => {
                    return <MenuItem key={index} title={obj.name} />;
                })}
            </OverflowMenu>
        );
    };

    const _renderListEmpty = () => {
        if (isLoading) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator color={"gray"} style={{ margin: 16 }} />
                </View>
            );
        }
        return <Text style={styles.textNoCamp}>Không có dữ liệu</Text>;
    };

    const keyExtractor = React.useCallback((item, index) => String(index), []);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                }}>
                {renderBackAction()}
                <Input
                    style={{ marginVertical: 8, flex: 1, marginHorizontal: 8 }}
                    onChangeText={text => setSearchTerm(text)}
                    value={searchTerm}
                    placeholder="Tìm kiếm theo tên truyện"
                    autoFocus
                />
                {renderFilter()}
            </View>

            <Divider />

            <FlatList
                style={{}}
                contentContainerStyle={{ padding: 8 }}
                numColumns={2}
                data={searchResults}
                extraData={searchResults}
                width="100%"
                keyExtractor={keyExtractor}
                renderItem={({ item }) => <BookItem item={item} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListEmptyComponent={_renderListEmpty}
            />
        </View>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: metrics.statusBarHeight + 8,
    },
    textNoCamp: {
        textAlign: "center",
        margin: 16,
    },
    centeredView: {
        flex: 1,
    },
});

export default Search;
