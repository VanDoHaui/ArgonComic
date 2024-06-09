import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    ImageBackground,
    Alert,
} from "react-native";
import { Button, Layout, Icon, Text, useStyleSheet } from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import { formatCash } from "../../utils/formatter";
import PaymentModal from "../../components/PaymentModal";
import { usePayment } from "../../hooks/usePayment";
import navigation from "../../routers/navigation";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../../hooks/useAuth";

const Preview = props => {
    const { isLoading, bookDetail, checkPay, setCheckPay } = props;
    const styles = useStyleSheet(themedStyles);
    const [total, setTotal] = useState(0);
    const [idFavorite, setIdFavorite] = useState(0);
    const { isLoadingPayment, payBook } = usePayment();
    const { user, setUser } = useUser();

    const addFavorite = async () => {
        if(total > 0) {
            if(idFavorite)
            {
                _deleteItem(idFavorite)
            }
            console.info("===========[] ===========[REMOVE] : ");
            setIdFavorite(0);
            setCheckPay(false)
            setTotal(0);
            return;
        }

        await addDataFavorite({
            user_id: user.uid,
            story_id: bookDetail?.id,
            story: bookDetail
        })
        setCheckPay(true)
        setTotal(1);
        firestore().collection("favourites")
            .where('story_id', '==', bookDetail?.id)
            .where('user_id', '==', user?.uid)
            .get().then((querySnapshot) => {
            const totalFavorite = querySnapshot.size
            console.info("===========[] ===========[querySnapshot] : ",querySnapshot);
            setTotal(totalFavorite)

            let idFavorite = 0;
            querySnapshot.forEach((doc) => {
                idFavorite = doc.id;
            })
            console.info("===========[] ===========[idFavorite] : ", idFavorite);
            setIdFavorite(idFavorite);
        })
        console.info("===========[] ===========[Them moi] : ");
    };


    const _deleteItem = (id) => {
        console.info("===========[] ===========[dataDelete] : ",id);
        firestore().collection('favourites').doc(id).delete();
    }

    const addDataFavorite = async (data) => {
        await firestore().collection('favourites').add(data);
    }

    if (isLoading) {
        return <ActivityIndicator color={"#999999"} style={{ margin: 16 }} />;
    }

    useEffect(() => {
        if(user?.uid) {
            firestore().collection("favourites")
                .where('story_id', '==', bookDetail?.id)
                .where('user_id', '==', user?.uid)
                .get().then((querySnapshot) => {
                const totalFavorite = querySnapshot.size
                console.info("===========[] ===========[querySnapshot] : ",querySnapshot);
                setTotal(totalFavorite)

                let idFavorite = 0;
                querySnapshot.forEach((doc) => {
                    idFavorite = doc.id;
                })
                console.info("===========[] ===========[idFavorite] : ", idFavorite);
                setIdFavorite(idFavorite);
            })
        }
    }, [user]);
    return (
        <Layout style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 16,
                }}>
                <View style={{ flex: 1, marginRight: 16 }}>
                    <Text category="p2" style={{fontSize:20}}>{bookDetail?.category?.name}</Text>
                    <Text category="h6" style={{ marginTop: 12, fontWeight: "700" }}>
                        {bookDetail?.name}
                    </Text>
                    <Text category="c2" style={{ marginTop: 4,fontSize:20 }}>
                        {bookDetail?.author?.name}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 16 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Text category="s1" style={{ fontSize: 20 }}>
                                Tổng lượt xem:{" "}
                            </Text>
                            <Text category="s1" style={{ fontSize: 20 }}>
                                {bookDetail?.total_chapter}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: 32,
                            }}>
                            <Icon name={"eye"} style={styles.icon} />
                            <Text category="s1" style={{ fontSize: 20 }}>
                                {formatCash(bookDetail?.total_view || 0)}
                            </Text>
                        </View>
                    </View>
                    {!checkPay ? (
                        <Button
                            disabled={isLoadingPayment}
                            accessoryLeft={
                                isLoadingPayment ? <ActivityIndicator size="small" /> : null
                            }
                            onPress={addFavorite}
                            appearance="outline"
                            size="small"
                            style={{ marginTop: 16, alignSelf: "flex-start" }}>
                            <Text>Yêu thích</Text>
                        </Button>
                    ) : (
                        <Button
                            disabled={isLoadingPayment}
                            accessoryLeft={
                                isLoadingPayment ? <ActivityIndicator size="small" /> : null
                            }
                            onPress={addFavorite}
                            appearance="outline"
                            size="small"
                            style={{ marginTop: 16, alignSelf: "flex-start" }}>
                            <Text>Huỷ bỏ</Text>
                        </Button>
                    )}
                </View>
                <View>
                    <ImageBackground
                        source={{
                            uri: bookDetail?.avatar,
                        }}
                        style={{
                            width: metrics.screenWidth / 4,
                            height: (metrics.screenWidth / 4) * 1.2,
                            borderRadius: 4,
                            alignItems: "flex-end",
                        }}>
                        {bookDetail?.pay_code === 1 && (
                            <Image
                                source={require("../../assets/images/img_vip.png")}
                                style={{
                                    width: 24,
                                    height: 24,
                                    margin: 4,
                                }}
                            />
                        )}
                    </ImageBackground>
                </View>
            </View>
            <Text style={{ padding: 15, lineHeight: 20}}>{bookDetail?.contents}</Text>
            <View
                style={{
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                {/*<Button*/}
                {/*  style={{margin: 16, marginBottom: 16}}*/}
                {/*  onPress={() => {*/}
                {/*    props.onPressReadNow && props.onPressReadNow();*/}
                {/*  }}>*/}
                {/*  Đọc ngay*/}
                {/*</Button>*/}
            </View>
            {/*<PaymentModal*/}
            {/*  isShowModal={isShowModal}*/}
            {/*  onCloseModal={() => setShowModal(false)}*/}
            {/*/>*/}
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 4,
    },
});

export default Preview;
