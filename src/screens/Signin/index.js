import React from "react";
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Alert,
} from "react-native";
import {
    useStyleSheet,
    Divider,
    Text,
    TopNavigation,
    StyleService,
    Input,
    Icon,
    Button,
    useTheme,
} from "@ui-kitten/components";
import { metrics } from "../../utils/themes";
import navigation from "../../routers/navigation";
import { validateEmail } from "../../utils";
import RequestAuth from "../../services/RequestAuth";
import LoadingIndicator from "../../components/LoadingIndicator";
import storage from "../../utils/storage";
import { useUser } from "../../hooks/useAuth";
import auth from '@react-native-firebase/auth';
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const useEmailInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const usePWInputState = (initialValue = "") => {
    const [value, setValue] = React.useState(initialValue);
    const [status, setStatus] = React.useState("basic");
    return { value, onChangeText: setValue, status, setStatus };
};

const Signin = () => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const emailInputState = useEmailInputState();
    const pwInputState = usePWInputState();
    const { setUser } = useUser();

    const [isLoading, setLoading] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    React.useEffect(() => {
        const getEmailFromStorage = async () => {
            const emailStorage = await storage.get(storage.key.email);
            emailInputState.onChangeText(emailStorage);
        };
        getEmailFromStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async () => {
        Keyboard.dismiss();
        let isValidateLogin = true;
        const email = emailInputState.value;
        const password = pwInputState.value;
        if (!validateEmail(email)) {
            emailInputState.setStatus("danger");
            isValidateLogin = false;
        }

        if (password.length < 8) {
            pwInputState.setStatus("danger");
            isValidateLogin = false;
        }

        const body = {
            email,
            password,
        };

        if (isValidateLogin) {
            try {
                setLoading(true);
                auth().signInWithEmailAndPassword(email, password).then((res:any)=>{
                    console.info("===========[] ===========[res] : ",res.user);
                    if (res?.user) {
                        console.info("===========[] ===========[LOGIN SUCCESS] : ");
                        setUser(res.user);
                        setLoading(false);
                        navigation.navigate("MainStack");
                    }
                }).catch((error)=>console.log(error.message))


                // auth().signInWithEmailAndPassword(email, password).then((res:any)=>{
                //     console.log(res);
                //     navigate("Home");

                // const response = await RequestAuth.postLogin(body, {});
                // if (response?.data) {
                //     const token = response.data.token;
                //     await storage.save(storage.key.email, email);
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
                <View style={styles.captionContainer}>
                    <Text
                        style={[styles.captionText, { color: theme["color-danger-600"] }]}>
                        *Địa chỉ email không chính xác
                    </Text>
                </View>
            );
        }
        return null;
    };

    const renderCaptionPW = () => {
        return (
            <View style={styles.captionContainer}>
                <Text
                    style={[
                        styles.captionText,
                        pwInputState.status === "danger" && {
                            color: theme["color-danger-600"],
                        },
                    ]}>
                    *Mật khẩu phải chứa ít nhất 8 ký tự
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TopNavigation title="  Đăng nhập" alignment="center" />
            <Divider />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 32,
                    textAlign: "center",
                    
                }}>
                <Text category="h2" style={{ marginHorizontal: 16, textAlign: "center", }}>
                    Chào mừng bạn đến với ARGON COMIC
                </Text>
                <View style={{ margin: 32, marginTop: 40 }}>
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
                        style={[styles.input, { marginBottom: 8 }]}
                        label="Mật khẩu"
                        placeholder="nhập mật khẩu"
                        caption={renderCaptionPW}
                        // accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onFocus={() => pwInputState.setStatus("basic")}
                        {...pwInputState}
                    />
                    <TouchableOpacity
                        onPress={toggleSecureEntry}
                        style={{ alignSelf: "center", marginVertical: 12 }}
                        activeOpacity={0.75}>
                        <Text category="c1">Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <Button style={{ marginTop: 8 }} onPress={login}>
                        Đăng nhập
                    </Button>
                    <Button
                        appearance="outline"
                        style={{ marginTop: 20 }}
                        onPress={() => navigation.navigate("SignupScreen")}>
                        Đăng ký
                    </Button>
                </View>
            </View>
            <LoadingIndicator isLoading={isLoading} />
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        paddingTop: metrics.statusBarHeight,
        backgroundColor: "white",
    },
    input: {
        marginBottom: 24,
        width: "100%",
    },
    captionContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 4,
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8F9BB3",
    },
});

export default Signin;
