import * as React from "react";
import {
    CommonActions,
    StackActions,
    TabActions,
} from "@react-navigation/native";
import _ from "lodash";

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

const navigate = (routeName, params) => {
    if (isReadyRef.current && navigationRef.current) {
        const currentRoutes = navigationRef.current.getCurrentRoute().name;
        if (currentRoutes !== routeName) {
            const action = CommonActions.navigate(routeName, params);
            navigationRef.current.dispatch(action);
        }
    }
};

const goBack = () => {
    if (isReadyRef.current && navigationRef.current) {
        const action = CommonActions.goBack();
        navigationRef.current.dispatch(action);
    }
};

const reset = (routeName, params) => {
    if (isReadyRef.current && navigationRef.current) {
        const action = CommonActions.reset({
            index: 0,
            routes: [{ name: routeName, params }],
        });
        navigationRef.current.dispatch(action);
    }
};

const setParams = params => {
    if (isReadyRef.current && navigationRef.current) {
        const action = CommonActions.setParams(params);
        navigationRef.current.dispatch(action);
    }
};

const replace = (routeName, params) => {
    if (isReadyRef.current && navigationRef.current) {
        const action = StackActions.replace(
            routeName,
            params,
            null,
            Math.random().toString,
        );
        navigationRef.current.dispatch(action);
    }
};

const jumpTo = (routeName, params) => {
    if (isReadyRef.current && navigationRef.current) {
        const action = TabActions.jumpTo(routeName, params);
        navigationRef.current.dispatch(action);
    }
};

const popToTop = () => {
    if (isReadyRef.current && navigationRef.current) {
        const action = StackActions.popToTop();
        navigationRef.current.dispatch(action);
    }
};

const pop = index => {
    if (isReadyRef.current && navigationRef.current) {
        const action = StackActions.pop(index);
        navigationRef.current.dispatch(action);
    }
};

const push = (routeName, params) => {
    if (isReadyRef.current && navigationRef.current) {
        const action = StackActions.push(
            routeName,
            params,
            null,
            Math.random().toString,
        );
        navigationRef.current.dispatch(action);
    }
};

// add other navigation functions that you need and export them
export default {
    navigate,
    goBack,
    reset,
    replace,
    jumpTo,
    popToTop,
    push,
    pop,
    setParams,
};
