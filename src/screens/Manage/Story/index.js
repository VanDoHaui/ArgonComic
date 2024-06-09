import React, { useState } from "react";
import {
    Button,
    Icon,
    Layout,
    List,
    ListItem,
    Text,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { metrics } from "../../../utils/themes";
import {renderBackAction} from "../../../components/Header";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import navigation from "../../../routers/navigation";

const SettingsIcon = (props) => (
    <Icon
        {...props}
        name='plus-outline'
    />
);

const AdmStoryIndex = () => {
    const styles = useStyleSheet(themedStyles);
    const [stories, setStories] = useState([]);

    const _deleteItem = (item) => {
        firestore().collection('stories').doc(item.id).delete()
            .then(()=>{console.log("successfully deleted! ")})
            .catch((error)=>{ console.log("Error removing document:", error)})
    }

    const todoRef = firestore().collection('stories');
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
                setStories(datas);
            }
        )

    },[]);

    const addStory = () => {
        navigation.navigate('AdmStoryAddScreen')
    }

    const renderItemAccessory = (item)  => (
        <View style={{ justifyContent: "space-between", flexDirection:'row' }}>
            <TouchableOpacity onPress={() =>  _deleteItem(item)}>
                <Icon
                    name={"trash-2-outline"}
                    style={{ height: 20, width: 20 }}
                />
            </TouchableOpacity>
        </View>
    );

    const renderItemIcon = (item) => (
        <Image source={{uri: item?.avatar}} />
    );

    const renderSettingsAction = () => (
        <TopNavigationAction icon={SettingsIcon} onPress={() => addStory()} />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.name}`}
            description={`${item.category.name}`}
            accessoryLeft={renderItemIcon(item)}
            accessoryRight={renderItemAccessory(item)}
        />
    );

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="QUẢN LÝ TRUYỆN"
                alignment="center"
                accessoryLeft={renderBackAction}
                accessoryRight={renderSettingsAction}
            />

            <List
                data={stories}
                renderItem={renderItem}
            />
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


export default AdmStoryIndex;
