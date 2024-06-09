import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Divider,
    Icon,
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import storage from "../../utils/storage";

const Row = ({ iconName, label, value }) => (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Icon name={iconName} style={{ width: 20, height: 20, marginRight: 8 }} />
            <Text category="p2">{label}</Text>
        </View>
        <Text category="s1" style={{ flex: 10 }}>
            {value}
        </Text>
    </View>
);
const ManagePage = () => {
    const styles = useStyleSheet(themedStyles);

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<Icon name="arrow-back" />}
            onPress={() => navigation.goBack()}
        />
    );
    const logout = async () => {
        await storage.removeAll();
        navigation.replace("AuthStack");
    };

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="Trạng quản trị"
                alignment="center"
                accessoryLeft={renderBackAction}
            />
            <Divider />
            <View style={{ margin: 16 }}>
                <TouchableOpacity onPress={ () => navigation.navigate('AdmCategoryScreen')}>
                    <Row
                        iconName={"list-outline"}
                        value={'Category'}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('AdmAuthorScreen')}>
                    <Row
                        iconName={"people-outline"}
                        value={'Author'}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('AdmStoryScreen')}>
                    <Row
                        iconName={"book-open-outline"}
                        value={'Story'}
                    />
                </TouchableOpacity>
            </View>
            <Button
                onPress={logout}
                appearance="outline"
                style={{
                    margin: 16,
                    position: "absolute",
                    bottom: metrics.bottomSpaceHeightPlus16,
                    left: 0,
                    right: 0,
                }}>
                Đăng xuất
            </Button>
        </Layout>
    );
}

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
});

export default ManagePage;
