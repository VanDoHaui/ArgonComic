import React from "react";
import { View, Image, ImageBackground } from "react-native";
import _ from "lodash";
import { metrics } from "../../utils/themes";
import { Text, Icon, useTheme } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import navigation from "../../routers/navigation";
import { formatCash } from "../../utils/formatter";

const BookItem = ({ item }) => {
    const theme = useTheme();

    const onPressBook = () => {
        navigation.navigate("StoryDetailScreen", {
            id: item?.id,
            item: item
        });
    };

    return (
        <TouchableOpacity
            onPress={onPressBook}
            activeOpacity={0.85}
            style={{
                borderRadius: 4,
                width: metrics.screenWidth / 2 - 24,
                margin: 8,
                flex: 1,
                justifyContent: "space-between",
            }}>
            <View>
                <ImageBackground
                    source={{
                        uri: item?.avatar,
                    }}
                    style={{
                        width: metrics.screenWidth / 2 - 24,
                        height: (metrics.screenWidth / 2 - 24) * 1.2,
                        borderRadius: 4,
                        alignItems: "flex-end",
                    }}>
                    {item?.pay_code === 1 && (
                        <Image
                            source={require("../../assets/images/img_vip.png")}
                            style={{
                                width: 32,
                                height: 32,
                                margin: 4,
                            }}
                        />
                    )}
                </ImageBackground>

                <Text
                    category="s1"
                    style={{ marginTop: 8, fontWeight: "600" }}
                    numberOfLines={2}>
                    {item?.name}
                </Text>
                <Text
                    category="label"
                    style={{
                        marginTop: 4,
                        color: "gray",
                        fontWeight: "500",
                        fontSize: 11,
                    }}>
                    {item?.author?.name}
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <Icon
                    name={"eye-outline"}
                    style={{ width: 12, height: 12, marginRight: 2 }}
                    fill={theme["color-success-700"]}
                />
                <Text category="c2" style={{ color: theme["color-success-700"] }}>
                    {formatCash(item?.total_view || 0)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(BookItem);
