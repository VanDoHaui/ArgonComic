import React, { useState } from "react";
import { Button, Icon, Layout, Text, TopNavigation, useStyleSheet } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { metrics } from "../../../utils/themes";
import {renderBackAction} from "../../../components/Header";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import ModalForm from "./ModalForm";

const AdmAuthorIndex = () => {
    const styles = useStyleSheet(themedStyles);
    const [authors, setAuthors] = useState([]);
    const [isShowModal, setShowModal] = useState(false);
    const [author, setAuthor] = useState(null);

    const _deleteItem = (item) => {
        firestore().collection('authors').doc(item.id).delete()
            .then(()=>{console.log("successfully deleted! ")})
            .catch((error)=>{ console.log("Error removing document:", error)})
    }

    const createOrUpdateData = (item) => {
        setAuthor(item);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false);
    };

    const todoRef = firestore().collection('authors');
    React.useEffect(() => {
        todoRef.onSnapshot(
            querySnapshot => {
                const datas = []
                querySnapshot.forEach((doc) => {
                    datas.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                })
                setAuthors(datas);
            }
        )

    },[]);

    const Block = React.useCallback(
        ({ item }) => {
            return (
                <View style={{ marginBottom: 16 }}>
                    <View style={{
                        padding: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Text category="h6" style={{ flex: 10}}>{item?.name}</Text>
                        <View style={{ flex: 2, justifyContent: "space-between", flexDirection:'row' }}>
                            <TouchableOpacity onPress={() => createOrUpdateData(item)}>
                                <Icon
                                    name={"edit-2-outline"}
                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  _deleteItem(item)}>
                                <Icon
                                    name={"trash-2-outline"}
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        },
        [authors],
    );
    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="QUẢN LÝ TÁC GIẢ"
                alignment="center"
                accessoryLeft={renderBackAction}
            />

            {authors.slice(0, 10).map((item, index) => {
                return <Block key={index} item={item} />;
            })}
            <ModalForm isShowModal={isShowModal} onCloseModal={onCloseModal} author={author}/>
            <Button
                onPress={() => createOrUpdateData(author)}
                appearance="outline"
                style={{
                    margin: 16,
                    position: "absolute",
                    bottom: metrics.bottomSpaceHeightPlus16,
                    left: 0,
                    right: 0,
                }}>
                Thêm mới
            </Button>
        </Layout>
    )
}

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
});


export default AdmAuthorIndex;
