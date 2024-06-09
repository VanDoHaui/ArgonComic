import { Button, Icon, Input, Text, useStyleSheet } from "@ui-kitten/components";
import { Keyboard, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import firestore from "@react-native-firebase/firestore";

const useNameInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const ModalForm = ({ isShowModal, onCloseModal, author }) => {
    const styles = useStyleSheet(themedStyles);
    const nameInputState = useNameInputState();

    const renderCaptionName = () => {
        if (nameInputState.status === "danger") {
            return <Text style={[styles.captionText, styles.captionTextError]} />;
        }
        return null;
    };

    const processData = () => {
        Keyboard.dismiss();
        let name = nameInputState.value;
        if(author) {
            console.info("===========[UPDATE] ===========[name] : ",name);
            const docUpdateRef = firestore().collection('authors').doc(author.id);
            docUpdateRef.update({
                name: name
            })
                .then(() => {
                    console.log('Update success!');
                });
        }else {
            firestore().collection('authors').add({
                name: name,
            })
        }


        // navigation.navigate("AdmCategoryScreen");
        onCloseModal(false);
        nameInputState.onChangeText("");
    }
    React.useEffect(() => {
        if(author) {
            console.info("===========[] ===========[author] : ", author);
            // nameInputState.onChangeText(category.name);
        }
    })

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
                        marginRight: 0,
                    }}
                    onPress={onCloseModal}>
                    <Icon
                        name="close-outline"
                        style={{ width: 32, height: 32 }}
                        fill={"#ffffff"}
                    />
                </TouchableOpacity>
                <View style={styles.modalView}>
                    <Text category="h6" style={{ marginBottom: 8, marginTop: 10 }}>
                        Thêm tác giả
                    </Text>

                    <Input
                        style={styles.input}
                        label="Tên tác giả"
                        placeholder="Tên tác giả"
                        caption={renderCaptionName}
                        onFocus={() => nameInputState.setStatus("basic")}
                        {...nameInputState}
                    />

                    <Button style={{ marginTop: 32 }} onPress={processData}>
                        Thêm mới
                    </Button>

                </View>
            </View>
        </Modal>
    );
}

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
        padding: 10,
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

export default ModalForm;
