import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, RefreshControl, FlatList } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "./../../components/ScrollableTabBar";
import { metrics } from "../../utils/themes";
import {
    Divider,
    TopNavigation,
    TopNavigationAction,
    Icon,
} from "@ui-kitten/components";
import navigation from "../../routers/navigation";
import TabScenes from "./TabScenes";
import firestore from "@react-native-firebase/firestore";
import BookItem from "./BookItem";

const BookList = ({ route }) => {
    const { categories, tabInit } = route.params;
    const [stories, setStories] = useState([]);
    const tabView = React.useRef();

    const todoRefStory = firestore().collection('stories').where('category.id', '==', tabInit);
    React.useEffect(() => {
        console.info("===========[] ===========[tabInit] : ",tabInit);
        if(tabInit){
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
                    setStories(datas);
                }
            )
        }
        if (tabView.current && tabInit) {
            setTimeout(() => {
                tabView.current.goToPage(tabInit);
            }, 150);
        }
    }, [tabInit]);

    const _renderTab = () =>
        categories.map((obj, index) => {
            let label = obj.name;
            return <TabScenes key={index} tabLabel={label} categoryId={obj?.id} />;
        });

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<Icon name="arrow-back" />}
            onPress={() => navigation.goBack()}
        />
    );

    const _renderItem = React.useCallback(
        ({ item }) => <BookItem item={item} />,
        [],
    );

    const renderSearchAction = () => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("SearchScreen", {
                    categories: categories,
                })
            }
            activeOpacity={0.85}
            style={{
                alignSelf: "flex-end",
                padding: 4,
                marginHorizontal: 8,
            }}>
            <Icon
                name={"search"}
                style={{
                    height: 24,
                    width: 24,
                }}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TopNavigation
                title="Danh sách truyện"
                alignment="center"
                accessoryLeft={renderBackAction}
                accessoryRight={renderSearchAction}
            />
            <Divider />

            <FlatList
                style={{}}
                contentContainerStyle={{padding: 8}}
                numColumns={2}
                data={stories}
                extraData={stories}
                width="100%"
                // keyExtractor={keyExtractor}
                renderItem={({item}) => <BookItem item={item} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                // ListEmptyComponent={_renderListEmpty}
            />
        </View>
    );
};

export default BookList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    scrollable: {},
});
