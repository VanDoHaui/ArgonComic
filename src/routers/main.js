import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import _ from "lodash";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ManagePage from "../screens/Manage";
import AdmCategoryIndex from "../screens/Manage/Category";
import AdmAuthorIndex from "../screens/Manage/Author";
import AdmStoryIndex from "../screens/Manage/Story";
import AddStoryPage from "../screens/Manage/Story/add";
import StoryDetailPage from "../screens/StoryDetail";
import BookList from "../screens/BookList";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={"HomeScreen"}
            screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    cardStyle: { backgroundColor: "white" },
                    animationEnabled: false,
                };
            }}>
            <Stack.Screen name={"HomeScreen"} component={Home} />
            <Stack.Screen name={'StoryListsScreen'} component={BookList} />
            <Stack.Screen name={'StoryDetailScreen'} component={StoryDetailPage} />
            {/*<Stack.Screen name={'BookChapterScreen'} component={BookChapter} />*/}
            <Stack.Screen name={"ProfileScreen"} component={Profile} />
            {/*<Stack.Screen name={'AdsTestingScreen'} component={AdsTesting} />*/}
            <Stack.Screen name={'SearchScreen'} component={Search} />
            {/* ADMIN */}
            <Stack.Screen name={"ManageScreen"} component={ManagePage} />
            <Stack.Screen name={"AdmCategoryScreen"} component={AdmCategoryIndex} />
            <Stack.Screen name={"AdmAuthorScreen"} component={AdmAuthorIndex} />
            <Stack.Screen name={"AdmStoryScreen"} component={AdmStoryIndex} />
            <Stack.Screen name={"AdmStoryAddScreen"} component={AddStoryPage} />
        </Stack.Navigator>
    );
};

export default MainStack;
