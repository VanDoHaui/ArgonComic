import React from "react";
import {
    StatusBar,
} from "react-native";

import * as eva from "@eva-design/eva";
import { default as theme } from "./src/assets/custom-theme.json";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "./src/routers/navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AuthStack from "./src/routers/auth";
import MainStack from "./src/routers/main";
import Splash from "./src/screens/Splash";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const RootStack = createNativeStackNavigator();

const App = () => {
    React.useEffect(() => {
        return () => {
            isReadyRef.current = false;
        };
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true;
                }}>
                <IconRegistry icons={EvaIconsPack} />
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent
                    barStyle="dark-content"
                />
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                    <RootStack.Navigator
                        screenOptions={({ route }) => {
                            return {
                                headerShown: false,
                                cardStyle: { backgroundColor: "white" },
                                orientation: "portrait"
                            };
                        }}
                        initialRouteName={"SplashScreen"}>
                        <RootStack.Screen name={"SplashScreen"} component={Splash} />
                        <RootStack.Screen name={"AuthStack"} component={AuthStack} />
                        <RootStack.Screen name={"MainStack"} component={MainStack} />
                    </RootStack.Navigator>
                </ApplicationProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
export default App;
