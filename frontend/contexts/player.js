import {createContext} from "react";

export const PlayerContext = createContext({
    nickname: "",
    setNickname: () => {},
    room: "",
    setRoom: () => {},
});
