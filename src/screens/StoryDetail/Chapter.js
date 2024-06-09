import React from "react";
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image,
} from "react-native";
import { metrics } from "../../utils/themes";
import { Text, Icon, useStyleSheet, Button } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import RequestBook from "../../services/RequestBook";
import { formatCash, formatDay } from "../../utils/formatter";
import navigation from "../../routers/navigation";

const Chapter = props => {
    const { bookId, checkPay, bookDetail } = props;
    const [isRefresh, setRefresh] = React.useState(false);
    const [isLoadMore, setLoadMore] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [chapterList, setListChapter] = React.useState([]);

    const chapterFree = bookDetail?.chapter_free;

    const styles = useStyleSheet(themedStyles);

    const fetchListChapter = async () => {
        try {
            setLoading(true);
            const chapterRes = await RequestBook.getChapter(bookId, {});
            if (chapterRes?.data?.chapters) {
                const chapters = chapterRes?.data?.chapters;
                const viewChapters = checkPay
                    ? chapters
                    : chapters.slice(0, chapterFree || 10);
                setListChapter(viewChapters);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (bookId) {
            fetchListChapter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId]);

    const goToDetailChapter = item => {
        const listChapterId = chapterList.map((obj, index) => {
            return obj.id;
        });

        navigation.navigate("BookChapterScreen", {
            id: item.id,
            listChapterId: listChapterId,
        });
    };

    const loadMoreData = () => {
        if (isLoading === false) {
            setRefresh(false);
            setLoadMore(true);
            //call api
        }
    };

    const onRefresh = () => {
        if (isLoading === false) {
            setRefresh(true);
            setLoadMore(false);
            fetchListChapter();
        }
    };

    const _renderFooter = () => {
        return (
            <View>
                {!checkPay && chapterList.length >= chapterFree && (
                    <Text
                        style={{ alignSelf: "center", color: "red", marginTop: 24 }}
                        category="s1">
                        Mua truyện để tiếp tục đọc
                    </Text>
                )}
                {isLoadMore && isLoading ? (
                    <View style={styles.footer}>
                        <ActivityIndicator color={"gray"} style={{ margin: 16 }} />
                    </View>
                ) : null}
            </View>
        );
    };

    const _renderListEmpty = () => {
        if (!isLoading) {
            return <Text style={styles.textNoCamp}>Không có dữ liệu</Text>;
        }
        return <ActivityIndicator color={"gray"} style={{ margin: 16 }} />;
    };

    const _renderItemSeparator = () => {
        return <View style={styles.separator} />;
    };

    const _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => goToDetailChapter(item)}
            activeOpacity={0.85}
            data={item}
            index={index}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={{
                        uri: item?.avatar,
                    }}
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 4,
                    }}
                />
                <View style={{ marginLeft: 16 }}>
                    <Text category="s1" style={{ marginBottom: 8 }}>
                        {item?.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Icon name={"eye-outline"} style={styles.icon} />
                            <Text category="s2">{formatCash(item?.total_view || 0)}</Text>
                        </View>
                        <Text category="p2" style={{ marginLeft: 16 }}>
                            {formatDay(item?.created_at)}
                        </Text>
                    </View>
                </View>
            </View>
            <Text>#{index + 1}</Text>
        </TouchableOpacity>
    );

    const keyExtractor = React.useCallback((item, index) => String(item?.id), []);

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.contentFlatList}
            data={chapterList}
            extraData={chapterList}
            keyExtractor={keyExtractor}
            renderItem={_renderItem}
            ListEmptyComponent={_renderListEmpty}
            ListFooterComponent={_renderFooter}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={4}
            onEndReached={loadMoreData}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={_renderItemSeparator}
            refreshControl={
                <RefreshControl
                    refreshing={isRefresh && isLoading}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export default Chapter;

const themedStyles = StyleSheet.create({
    flatList: {
        flex: 1,
        backgroundColor: "white",
    },
    contentFlatList: {
        padding: metrics.space * 2,
    },
    viewListHeader: {},
    separator: {
        height: 1,
        marginVertical: 8,
    },
    icon: {
        width: 14,
        height: 14,
        marginRight: 2,
    },
});
