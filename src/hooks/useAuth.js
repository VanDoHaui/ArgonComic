import React, { useState } from "react";
import storage from "../utils/storage";

export const useUser = () => {
    const [userInfo, setUserInfo] = useState(null);

    const getUser = async () => {
        const userStr = await storage.get(storage.key.user);
        console.info("===========[] ===========[userStr] : ",userStr);
        const userJson = JSON.parse(userStr);
        console.info("===========[] ===========[userJson] : ",userJson);
        setUserInfo(userJson);
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const setUser = async userString => {
        await storage.save(storage.key.user, JSON.stringify(userString));
        await getUser();
    };

    return { user: userInfo, setUser };
};
