import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    ImageBackground,
} from "react-native";
import {
    Layout,
    Text,
    Icon,
    useStyleSheet,
    useTheme,
    Button,
} from "@ui-kitten/components";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import RequestBook from "../../services/RequestBook";
import { formatCash } from "../../utils/formatter";
import firestore from '@react-native-firebase/firestore';
import ManagePage from "../Manage/Category";
import Banner from "./Banner";

const Home = () => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const [categoryList, setCategoryList] = useState([]);
    const [categories, setCategoriesHome] = useState([]);
    const [bookList, setBookList] = useState({});


    const todoRef = firestore().collection('categories');
    React.useEffect(() => {
        todoRef.onSnapshot(
            querySnapshot => {
                const datas = []
                querySnapshot.forEach((doc) => {
                    datas.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                    let categoryID = doc.id;
                    // console.info("===========[] ===========[categoryID] : ",categoryID);
                    let todoRefStory = firestore().collection('stories')
                        .where("category.id","==", categoryID);
                    console.info("===========[] ===========[categoryID] : ",categoryID);
                    todoRefStory.onSnapshot(
                        querySnapshot => {
                            const datas = []
                            querySnapshot.forEach((doc) => {
                                datas.push({
                                    ...doc.data(),
                                    id: doc.id,
                                });
                            })
                            setBookList(prevState => {
                                return {
                                    ...prevState,
                                    [`${categoryID}`]: datas,
                                };
                            });
                            // console.info("===========[] ===========[Story] : ",datas);
                        }
                    )
                })
                setCategoriesHome(datas);
            }
        )

    },[]);
    React.useEffect(() => {


    },[]);

    const goGoBookList = itemId => {
        console.info("===========[] ===========[itemId] : ",itemId);
        navigation.navigate("StoryListsScreen", {
            tabInit: itemId,
            categories: categories,
        });
    };

    const onPressSearch = () => {
        navigation.navigate("SearchScreen", {
            categories: categories,
        });
    };

    const onPressBook = item => {
        navigation.navigate("StoryDetailScreen", {
            id: item?.id,
            item: item
        });
    };

    const onPressAvatar = () => {
        navigation.navigate("ManageScreen");
    };

    const _renderListEmpty = () => {
        return <Text style={styles.textNoCamp}>Không có dữ liệu</Text>;
    };

    const BookItem = React.useCallback(({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressBook(item)}
                activeOpacity={0.85}
                style={{
                    borderRadius: 4,
                    width: metrics.screenWidth / 3,
                    flex: 1,
                    justifyContent: "space-between",
                }}>
                <View>
                    <ImageBackground
                        source={{
                            uri: item?.avatar,
                        }}
                        style={{
                            width: metrics.screenWidth / 3,
                            height: (metrics.screenWidth / 3) * 1.2,
                            borderRadius: 4,
                            alignItems: "flex-end",
                        }}>
                        {/*{item?.pay_code === 1 && (*/}
                        {/*    <Image*/}
                        {/*        source={require("../../assets/images/img_vip.png")}*/}
                        {/*        style={{*/}
                        {/*            width: 24,*/}
                        {/*            height: 24,*/}
                        {/*            margin: 4,*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </ImageBackground>

                    <Text
                        category="p2"
                        style={{ marginTop: 8, fontWeight: "500" }}
                        numberOfLines={2}>
                        {item?.name}
                    </Text>
                    <Text
                        category="c1"
                        style={{
                            marginTop: 4,
                            color: "gray",
                            fontWeight: "500",
                            fontSize: 10,
                        }}>
                        {item?.author?.name}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                    }}>
                    {/*<Icon*/}
                    {/*    name={"eye-outline"}*/}
                    {/*    style={{ width: 12, height: 12, marginRight: 2 }}*/}
                    {/*    fill={theme["color-success-700"]}*/}
                    {/*/>*/}
                    <Text category="c2" style={{ color: theme["color-success-700"] }}>
                        {formatCash(item?.total_view || 0)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Block = React.useCallback(
        ({ item }) => {
            return (
                <View style={{ marginBottom: 16 }}>
                    <TouchableOpacity
                        onPress={() => goGoBookList(item?.id)}
                        activeOpacity={0.85}
                        style={{
                            padding: 16,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <Text category="h5">{item?.name}</Text>
                        <Icon
                            name={"arrow-ios-forward-outline"}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        data={bookList[item?.id]}
                        renderItem={BookItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        ListEmptyComponent={_renderListEmpty}
                    />
                </View>
            );
        },
        [bookList],
    );

    const Header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity >
                    <Image
                        source={require("../../assets/images/img_logo_vertical.png")}
                        style={{
                            width: metrics.screenWidth / 8,
                            height: metrics.screenWidth / 10,
                            marginLeft: 10
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => onPressAvatar()}
                        activeOpacity={0.85}
                        style={{
                            alignSelf: "flex-end",
                            padding: 4,
                            borderRadius: 24,
                            borderWidth: 2,
                            marginHorizontal: 4,
                        }}>
                        <Image
                            source={require("../../assets/icon/icon-person-40.png")}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.container}>
                <Layout style={styles.container}>
                    {/*<Banner />*/}
                    {categories.slice(0, 10).map((item, index) => {
                        return <Block key={index} item={item} />;
                    })}
                </Layout>
                <Button
                    appearance="ghost"
                    style={{ marginBottom: 32 }}
                    onPress={() => goGoBookList(0)}>
                    Xem tất cả
                </Button>

            </ScrollView>
        </View>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        height: metrics.statusBarHeight + 56,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
        marginRight: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default Home;
