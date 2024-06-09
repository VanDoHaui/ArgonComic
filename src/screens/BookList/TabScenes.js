import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
} from "react-native";
import _ from "lodash";
import { Text, useStyleSheet } from "@ui-kitten/components";
import RequestBook from "../../services/RequestBook";
import BookItem from "./BookItem";

const TabScenes = props => {
    const categoryId = props.categoryId;
    const styles = useStyleSheet(themedStyles);
    const [isRefresh, setRefresh] = React.useState(false);
    const [isLoadMore, setLoadMore] = React.useState(false);
    const [listBookByCategory, setBookByCategory] = useState(null);
    const [isLoading, setLoading] = useState(false);

    React.useEffect(() => {
        const getBookByCateId = async () => {
            try {
                setLoading(true);
                const bookRes = await RequestBook.getStories({
                    params: { page: 1, page_size: 50, category_id: categoryId },
                });

                if (bookRes?.data?.stories) {
                    const stories = bookRes?.data?.stories;
                    setBookByCategory(stories);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        if (categoryId) {
            getBookByCateId();
        }
    }, [categoryId]);

    const loadMoreData = () => {
        if (isLoading === false) {
            setRefresh(false);
            setLoadMore(true);
            //call api load more
        }
    };

    const onRefresh = () => {
        if (isLoading === false) {
            setRefresh(true);
            setLoadMore(false);
            //call api refresh
        }
    };

    const _renderFooter = () => {
        return isLoadMore && isLoading ? (
            <View style={styles.footer}>
                <ActivityIndicator color={"gray"} style={{ margin: 16 }} />
            </View>
        ) : null;
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

    const _renderItem = React.useCallback(
        ({ item }) => <BookItem item={item} />,
        [],
    );

    const keyExtractor = React.useCallback((item, index) => String(index), []);

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ padding: 8 }}
            numColumns={2}
            data={listBookByCategory}
            extraData={listBookByCategory}
            width="100%"
            keyExtractor={keyExtractor}
            renderItem={_renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListEmptyComponent={_renderListEmpty}
            ListFooterComponent={_renderFooter}
            refreshControl={
                <RefreshControl
                    refreshing={isRefresh && isLoading}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export default React.memo(TabScenes);

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    textNoCamp: {
        textAlign: "center",
        marginTop: 8,
        marginBottom: 20,
    },
});
