import React from "react";
import {
    StyleSheet,
    View,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    Keyboard,
} from "react-native";
import {
    Button,
    Divider,
    Layout,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Text,
    Input,
    useStyleSheet,
    useTheme,
} from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import { validateEmail, validatePhoneNumber } from "../../utils";
import RequestAuth from "../../services/RequestAuth";
import LoadingIndicator from "../../components/LoadingIndicator";
import storage from "../../utils/storage";
import { useUser } from "../../hooks/useAuth";
import auth from '@react-native-firebase/auth';

const useEmailInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const usePhoneInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const useNameInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const usePWInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const useRePWInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const Signup = () => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const emailInputState = useEmailInputState();
    const phoneInputState = usePhoneInputState();
    const nameInputState = useNameInputState();
    const pwInputState = usePWInputState();
    const rePWInputState = useRePWInputState();
    const { setUser } = useUser();

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const [isLoading, setLoading] = React.useState(false);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const signup = async () => {
        Keyboard.dismiss();

        let isValidateSignin = true;
        if (!validateEmail(emailInputState.value)) {
            emailInputState.setStatus("danger");
            isValidateSignin = false;
        }

        if (!validatePhoneNumber(phoneInputState.value)) {
            phoneInputState.setStatus("danger");
            isValidateSignin = false;
        }

        if (pwInputState.value.length < 8) {
            pwInputState.setStatus("danger");
            isValidateSignin = false;
        }

        if (rePWInputState.value !== pwInputState.value) {
            rePWInputState.setStatus("danger");
            isValidateSignin = false;
        }

        if (isValidateSignin) {
            const body = {
                email: emailInputState.value,
                password: pwInputState.value,
                name: nameInputState.value,
                phone: phoneInputState.value,
            };

            try {
                setLoading(true);
                auth().createUserWithEmailAndPassword(emailInputState.value, pwInputState.value).then((res:any)=>{
                    res.user.updateProfile({
                        displayName:nameInputState.value,
                    })
                    console.info("===========[] ===========[TẠO TK THÀNH CÔNG] : ", res);
                    const user = res.user;
                    setUser(user);
                    setLoading(false);
                    navigation.navigate("MainStack");
                }).catch((error:any) => console.log(error.message))


                // const response = await RequestAuth.postRegister(body, {});
                // if (response?.data) {
                //     const token = response.data.token;
                //     await storage.save(storage.key.access_token, token);
                //     const userRes = await RequestAuth.getUser({});
                //     if (userRes?.data?.user) {
                //         const user = userRes?.data?.user;
                //         setUser(user);
                //     }
                //     setLoading(false);
                //     navigation.navigate("MainStack");
                // }
            } catch (error) {
                setLoading(false);
                Alert.alert(error?.message);
            }
        }
    };

    // const renderIcon = props => (
    //     <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    //         <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    //     </TouchableWithoutFeedback>
    // );

    const renderCaptionEmail = () => {
        if (emailInputState.status === "danger") {
            return (
                <Text style={[styles.captionText, styles.captionTextError]}>
                    *Địa chỉ email không chính xác
                </Text>
            );
        }
        return null;
    };

    const renderCaptionPhone = () => {
        if (phoneInputState.status === "danger") {
            return (
                <Text style={[styles.captionText, styles.captionTextError]}>
                    *Số điện thoại không chính xác
                </Text>
            );
        }
        return null;
    };

    const renderCaptionName = () => {
        if (nameInputState.status === "danger") {
            return <Text style={[styles.captionText, styles.captionTextError]} />;
        }
        return null;
    };

    const renderCaptionPW = () => {
        return (
            <Text
                style={[
                    styles.captionText,
                    pwInputState.status === "danger" && styles.captionTextError,
                ]}>
                *Mật khẩu phải chứa ít nhất 8 ký tự
            </Text>
        );
    };

    const renderCaptionRePW = () => {
        if (rePWInputState.status === "danger") {
            return (
                <Text style={[styles.captionText, styles.captionTextError]}>
                    *Mật khẩu không trùng khớp
                </Text>
            );
        }
        return null;
    };

    // const renderBackAction = () => (
    //     <TopNavigationAction
    //         icon={<Icon name="arrow-back" />}
    //         onPress={() => navigation.goBack()}
    //     />
    // );

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="Đăng ký"
                alignment="center"
                // accessoryLeft={renderBackAction}
            />
            <Divider />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        textAlign: "center",
                    }}>
                    <View style={{ margin: 32 }}>
                        <Input
                            style={styles.input}
                            label="Địa chỉ email"
                            placeholder="nhập email"
                            keyboardType="email-address"
                            caption={renderCaptionEmail}
                            onFocus={() => emailInputState.setStatus("basic")}
                            {...emailInputState}
                        />
                        <Input
                            style={styles.input}
                            label="Số điện thoại"
                            placeholder="nhập số điện thoại"
                            keyboardType="phone-pad"
                            caption={renderCaptionPhone}
                            onFocus={() => phoneInputState.setStatus("basic")}
                            {...phoneInputState}
                        />
                        <Input
                            style={styles.input}
                            label="Họ và Tên"
                            placeholder="nhập họ và tên"
                            caption={renderCaptionName}
                            onFocus={() => nameInputState.setStatus("basic")}
                            {...nameInputState}
                        />
                        <Input
                            style={[styles.input]}
                            label="Mật khẩu"
                            placeholder="nhập mật khẩu"
                            caption={renderCaptionPW}
                            // accessoryRight={renderIcon}
                            onFocus={() => pwInputState.setStatus("basic")}
                            secureTextEntry={secureTextEntry}
                            {...pwInputState}
                        />
                        <Input
                            style={[styles.input]}
                            label="Xác nhận mật khẩu"
                            placeholder="nhập lại mật khẩu"
                            caption={renderCaptionRePW}
                            // accessoryRight={renderIcon}
                            onFocus={() => rePWInputState.setStatus("basic")}
                            secureTextEntry={secureTextEntry}
                            {...rePWInputState}
                        />

                        <Button style={{ marginTop: 32 }} onPress={signup}>
                            Đăng ký ngay
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <LoadingIndicator isLoading={isLoading} />
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    input: {
        marginBottom: 24,
        width: "100%",
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 4,
    },
    captionText: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: "400",
        color: "#8F9BB3",
    },

    captionTextError: {
        color: "color-danger-600",
    },
});

export default Signup;
