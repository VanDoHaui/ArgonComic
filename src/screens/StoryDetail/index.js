import React from "react";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import {
    Divider,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Text, Input, Button, List, ListItem,
} from "@ui-kitten/components";
import navigation from "../../routers/navigation";
import { metrics } from "../../utils/themes";
import ScrollableTabView from "react-native-scrollable-tab-view";
// import ScrollableTabBar from "./../../components/ScrollableTabBar";
import Preview from "./Preview";
import Chapter from "./Chapter";
import RequestBook from "../../services/RequestBook";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../../hooks/useAuth";

const FOOTER_HEIGHT = 50;

const StoryDetailPage = ({ route }) => {
    const { id: bookId, item: bookDetail } = route?.params;
    const tabView = React.useRef();

    const [isLoading, setLoading] = React.useState(false);
    const { user, setUser } = useUser();
    const [checkPay, setCheckPay] = React.useState();
    const [comments, setComments] = React.useState([]);
    console.info("===========[] ===========[bookDetail] : ", bookDetail);

    const [name, setName] = React.useState('');

    React.useEffect(() => {

    }, [bookId]);

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<Icon name="arrow-back" />}
            onPress={() => navigation.goBack()}
        />
    );

    const onPressReadNow = () => {
        if (tabView.current) {
            tabView.current.goToPage(1);
        }
    };

    const processData = async () => {
        Keyboard.dismiss();
        let data = {
            contents: name,
            story: bookDetail,
            story_id: bookDetail.id,
            user: user,
            user_id: user.uid
        }
        firestore().collection('comments').add(data);
        setName('');
    }

    React.useEffect(() => {
        if (bookId) {
            const todoRefComment = firestore().collection('comments')
                .where('story_id','==',bookId);
            todoRefComment.onSnapshot(
                querySnapshot => {
                    const datas = []
                    querySnapshot.forEach((doc) => {
                        datas.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    })
                    setComments(datas);
                }
            )
        }
    },[]);

    const renderItemComment = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
        <ListItem
            title={`${item.user?.displayName}`}
            description={`${item.contents}`}
        />
    );


    return (
        <View style={styles.container}>
            <TopNavigation
                title={evaProps => (
                    <Text
                        category="s1"
                        {...evaProps}
                        numberOfLines={1}
                        style={{ marginLeft: 48, marginRight: 16 }}>
                        {bookDetail?.name}
                    </Text>
                )}
                alignment="center"
                accessoryLeft={renderBackAction}
            />
            <Divider />
            <ScrollView style={styles.box}>
                <Preview
                    tabLabel={"Preview"}
                    isLoading={isLoading}
                    bookDetail={bookDetail}
                    checkPay={checkPay}
                    setCheckPay={setCheckPay}
                    onPressReadNow={onPressReadNow}
                />
                <View style={{ padding: 15 }}>
                    <Text category="h6">Danh sách bình luận</Text>
                    <List
                        // style={{ padding: 10}}
                        data={comments}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItemComment}
                    />
                    <Text category="h6" style={{ marginBottom: 12 }}>Bình luận</Text>
                    <Text category="p2" style={{ marginBottom: 12 }}> Nhập Nội dung bình luận</Text>
                    <Input style ={{borderRadius:49 }}
                        placeholder='Truyện hay quá ...'
                        value={name}
                        onChangeText={nextValue => setName(nextValue)}
                    />
                    <Button style={{ marginTop: 32,borderRadius:49 }} onPress={processData}>
                        Để lại bình luận
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    header: {
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: FOOTER_HEIGHT,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default StoryDetailPage;
