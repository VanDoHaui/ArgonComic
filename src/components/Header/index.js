import { Icon, TopNavigationAction } from "@ui-kitten/components";
import navigation from "../../routers/navigation";
import React from "react";

export const renderBackAction = () => (
    <TopNavigationAction
        icon={<Icon name="arrow-back" />}
        onPress={() => navigation.goBack()}
    />
);
export default {renderBackAction}
