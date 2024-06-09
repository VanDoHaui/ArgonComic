import React from "react";
import { Image } from "react-native";
import { metrics } from "../../utils/themes";
import Carousel from "react-native-reanimated-carousel";
import { useIsFocused } from "@react-navigation/native";
import RequestCommon from "../../services/RequestCommon";
import { TouchableOpacity } from "react-native-gesture-handler";
import navigation from "../../routers/navigation";

const goToDetailBook = actionId => {
    navigation.navigate("BookDetailScreen", {
        id: actionId,
    });
};

const CustomItem = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => goToDetailBook(item?.action_id)}>
            <Image
                source={{ uri: item?.avatar }}
                style={{
                    width: metrics.screenWidth,
                    height: metrics.screenWidth / 3,
                    borderRadius: 8,
                }}
            />
        </TouchableOpacity>
    );
};

const Banner = () => {
    const isFocused = useIsFocused();
    const [banner, setBanner] = React.useState([]);

    React.useEffect(() => {
        const getBanner = async () => {
            try {
                const bannerRes = await RequestCommon.getBanner({
                    params: { page: 1, page_size: 10 },
                });
                if (bannerRes?.data?.banners) {
                    const banners = bannerRes?.data?.banners;
                    setBanner(banners);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getBanner();
    }, []);

    return (
        <Carousel
            width={metrics.screenWidth}
            height={metrics.screenWidth / 3}
            loop
            autoPlay={isFocused}
            autoPlayInterval={2500}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
            data={banner}
            renderItem={({ index }) => {
                const item = banner[index];
                return <CustomItem key={index} index={index} item={item} />;
            }}
        />
    );
};

export default Banner;
