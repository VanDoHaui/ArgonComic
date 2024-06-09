import {
    Button,
    Input,
    Layout,
    Select,
    SelectItem,
    Text,
    TopNavigation,
    IndexPath,
    useStyleSheet,
} from "@ui-kitten/components";
import { renderBackAction } from "../../../components/Header";
import React, { useState } from "react";
import { Keyboard, ScrollView, StyleSheet } from "react-native";
import { metrics } from "../../../utils/themes";
import firestore from "@react-native-firebase/firestore";
import navigation from "../../../routers/navigation";

const AddStoryPage = () => {
    const styles = useStyleSheet(themedStyles);
    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState('https://liftlearning.com/wp-content/uploads/2020/09/default-image.png');

    const [selectedCategoryIndex, setSelectedCategoryIndex] =  useState(0);
    const [selectedAuthorIndex, setSelectedAuthorIndex] = useState(0)
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

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

    const todoRefCategory = firestore().collection('categories');
    React.useEffect(() => {
        todoRefCategory.onSnapshot(
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

    const processData = () => {
        Keyboard.dismiss();
        let data = {
            name: name,
            avatar: avatar,
            category: categories.find((item, index) => { return index === selectedCategoryIndex.row; }),
            author: authors.find((item, index) => { return index === selectedAuthorIndex.row; }),
        }

        firestore().collection('stories').add(data);
        console.info("===========[] ===========[data] : ",data);
        navigation.navigate('AdmStoryScreen')
    }

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="THÊM TRUYỆN"
                alignment="center"
                accessoryLeft={renderBackAction}
            />
            <ScrollView style={styles.box}>
                <Text category="p2" style={{ marginBottom: 12 }}>Tên truyện</Text>
                <Input
                    placeholder='Tên truyện'
                    value={name}
                    onChangeText={nextValue => setName(nextValue)}
                />
                <Text category="p2" style={{ marginBottom: 12 }}>Link ảnh</Text>
                <Input
                    placeholder='Link ảnh'
                    value={avatar}
                    onChangeText={nextValue => setAvatar(nextValue)}
                />

                <Text category="p2" style={{ marginBottom: 12, marginTop: 12 }}>Thể loại</Text>
                {/*<Select*/}
                {/*    selectedIndex={selectedCategoryIndex}*/}
                {/*    onChange={_handleChangeCategory}*/}
                {/*    onSelect={index => setSelectedCategoryIndex(index)}*/}
                {/*>*/}
                {/*    {categories.map((item, index) => {*/}
                {/*        return <SelectItem title={item.name} key={item.name} />;*/}
                {/*    })}*/}

                {/*</Select>*/}
                <Select selectedIndex={selectedCategoryIndex}
                        onSelect={index => setSelectedCategoryIndex(index)}
                    >
                    {categories.map((item, keyIndex) => {
                        return <SelectItem title={item.name} key={item.id}/>;
                    })}
                </Select>
                <Text category="p2" style={{ marginBottom: 12, marginTop: 12}}>Tác giả</Text>
                <Select style={{placeholder :'Vui lòng lựa chọn'}} 
                    selectedIndex={selectedAuthorIndex}
                    onSelect={index => setSelectedAuthorIndex(index)}
                >
                    {authors.map((item, keyIndex) => {
                        return <SelectItem title={item.name} key={item.id} />;
                    })}

                </Select>
                <Button style={{ marginTop: 32 }} onPress={processData}>
                    Thêm mới
                </Button>
            </ScrollView>
        </Layout>
    )
}

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    box: {
        margin: 10
    }
});

export default AddStoryPage;
