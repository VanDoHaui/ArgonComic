import React from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import { Button, Icon, Text, useStyleSheet } from "@ui-kitten/components";
// import Clipboard from '@react-native-clipboard/clipboard';

const PaymentModal = ({ isShowModal, onCloseModal }) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isShowModal}
            onRequestClose={onCloseModal}>
            <View style={styles.centeredView}>
                <TouchableOpacity
                    style={{
                        width: 48,
                        height: 48,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "flex-end",
                        marginRight: 16,
                    }}
                    onPress={onCloseModal}>
                    <Icon
                        name="close-outline"
                        style={{ width: 32, height: 32 }}
                        fill={"#ffffff"}
                    />
                </TouchableOpacity>
                <View style={styles.modalView}>
                    <Text category="h5" style={{ marginBottom: 8 }}>
                        Momo
                    </Text>

                    <Text style={{ marginVertical: 2 }}>Số tài khoản: 0907355557</Text>
                    <Text style={{ marginVertical: 2 }}>
                        Chủ tài khoản: Đoàn Xuân Hoàng
                    </Text>
                    {/*<Button*/}
                    {/*  size="small"*/}
                    {/*  style={{marginVertical: 2, marginTop: 8}}*/}
                    {/*  onPress={() => {*/}
                    {/*    Clipboard.setString('0907355557');*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <Text>Copy số tài khoản</Text>*/}
                    {/*</Button>*/}
                    <Text category="h5" style={{ marginBottom: 8, marginTop: 32 }}>
                        Chuyển khoản ngân hàng
                    </Text>
                    <Text style={{ marginVertical: 2 }}>Tên ngân hàng: VietinBank</Text>
                    <Text style={{ marginVertical: 2 }}>Số tài khoản: 101881225924</Text>
                    <Text style={{ marginVertical: 2 }}>
                        Chủ tài khoản: Đoàn Xuân Hoàng
                    </Text>
                    {/*<Button*/}
                    {/*  size="small"*/}
                    {/*  style={{marginVertical: 2, marginTop: 8}}*/}
                    {/*  onPress={() => {*/}
                    {/*    Clipboard.setString('101881225924');*/}
                    {/*  }}>*/}
                    {/*  <Text>Copy số tài khoản</Text>*/}
                    {/*</Button>*/}
                    <Text category="h5" style={{ marginBottom: 8, marginTop: 32 }}>
                        Nội dung chuyển khoản
                    </Text>
                    <Text style={{ marginVertical: 2 }}>
                        GTC + [Sdt] , Ví dụ: GTC 0929158858
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const themedStyles = StyleSheet.create({
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

export default PaymentModal;
