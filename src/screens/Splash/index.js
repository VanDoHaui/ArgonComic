import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { Text } from "@ui-kitten/components";
import navigation from "../../routers/navigation";
import RequestAuth from "../../services/RequestAuth";
import { useUser } from "../../hooks/useAuth";
import { metrics } from "../../utils/themes";

const Splash = () => {
    const { setUser } = useUser();
    console.info("===========[] ===========[setUser] : ",setUser);
    React.useEffect(() => {
        setTimeout(async () => {
            try {
                const userRes = await RequestAuth.getUser({});
                console.info("===========[] ===========[userRes] : ",userRes);
                if (userRes?.data?.user) {
                    console.info("===========[] ===========[USER] : ");
                    const user = userRes?.data?.user;
                    setUser(user);
                    navigation.replace("MainStack");
                } else {
                    console.info("===========[] ===========[AuthStack] : ");
                    navigation.replace("AuthStack");
                }
            } catch (error) {
                console.info("===========[] ===========[FAIL GET INFO] : ");
                navigation.replace("AuthStack");
            }
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}>
            {/*<Image*/}
            {/*    source={require("../../assets/images/img_logo.gif")}*/}
            {/*    style={{*/}
            {/*        width: metrics.screenWidth - 64,*/}
            {/*        height: metrics.screenWidth - 64,*/}
            {/*    }}*/}
            {/*/>*/}
            <ActivityIndicator color={"#999999"} style={{ marginBottom: 156 }} />
        </View>
    );
};

export default Splash;
