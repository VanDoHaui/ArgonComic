import React, { useState } from "react";
import { Button, Icon, Layout, Text, TopNavigation, useStyleSheet } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { metrics } from "../../../utils/themes";
import {renderBackAction} from "../../../components/Header";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import ModalForm from "./ModalForm";

const AdmCategoryIndex = () => {
    const styles = useStyleSheet(themedStyles);
    const [categories, setCategories] = useState([]);
    const [isShowModal, setShowModal] = useState(false);
    const [category, setCategory] = useState(null);

    const _deleteItem = (item) => {
        firestore().collection('categories').doc(item.id).delete()
            .then(()=>{console.log("successfully deleted! ")})
            .catch((error)=>{ console.log("Error removing document:", error)})
    }

    const createOrUpdateData = (item) => {
        setCategory(item);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false);
    };

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
                })
                setCategories(datas);
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
        [categories],
    );
    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="QUẢN LÝ THỂ LOẠI"
                alignment="center"
                accessoryLeft={renderBackAction}
            />

            {categories.slice(0, 10).map((item, index) => {
                return <Block key={index} item={item} />;
            })}
            <ModalForm isShowModal={isShowModal} onCloseModal={onCloseModal} category={category}/>
            <Button
                onPress={() => createOrUpdateData(category)}
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


export default AdmCategoryIndex;
