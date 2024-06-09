import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Divider,
    Layout,
    TopNavigation,
    Text,
    useStyleSheet,
    useTheme,
} from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import storage from "../../utils/storage";
import { useUser } from "../../hooks/useAuth";
import PaymentModal from "../../components/PaymentModal";
import RequestAuth from "../../services/RequestAuth";

const Row = ({ iconName, label, value }) => (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {/*<Icon name={iconName} style={{ width: 13, height: 13, marginRight: 8 }} />*/}
            <Text category="p2">{label}</Text>
        </View>
        <Text category="s1" style={{ flex: 2 }}>
            {value}
        </Text>
    </View>
);

const Profile = () => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { user, setUser } = useUser();
    const [isShowModal, setShowModal] = useState(false);

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const userRes = await RequestAuth.getUser({});
                if (userRes?.data?.user) {
                    setUser(userRes?.data?.user);
                }
            } catch (error) {
            }
        };
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCloseModal = () => {
        setShowModal(false);
    };

    const addCoin = () => {
        setShowModal(true);
    };

    const logout = async () => {
        await storage.removeAll();
        navigation.replace("AuthStack");
    };

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="Cá nhân"
                alignment="center"
                accessoryLeft={renderBackAction}
            />
            <Divider />
            <View style={{ margin: 16 }}>
                <Text category="h6" style={{ marginBottom: 12 }}>
                    Thông tin cá nhân
                </Text>
                <Row
                    iconName={"person-outline"}
                    label={"Họ và tên"}
                    value={user?.name}
                />
                <Row iconName={"email-outline"} label={"Email"} value={user?.email} />
                <Row
                    iconName={"phone-outline"}
                    label={"Số điện thoại"}
                    value={user?.phone}
                />
                <Text category="h6" style={{ marginVertical: 12 }}>
                    Tài khoản xu
                </Text>
                <Row
                    iconName={"credit-card-outline"}
                    label={"Số xu"}
                    value={user?.balance}
                />
                <Button onPress={addCoin} status="success" style={{ marginTop: 8 }}>
                    Nạp thêm xu
                </Button>
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
            <PaymentModal isShowModal={isShowModal} onCloseModal={onCloseModal} />
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default Profile;
