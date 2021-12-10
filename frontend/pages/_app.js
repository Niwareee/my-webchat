import 'tailwindcss/tailwind.css'
import {useState} from "react";
import {PlayerContext} from "../contexts/player";

import '../styles/style.css';

function MyApp({Component, pageProps}) {
    const [nickname, setNickname] = useState("")
    const [room, setRoom] = useState("")

    return (
        <PlayerContext.Provider value={{nickname, setNickname, room, setRoom}}>
            <Component {...pageProps} />
        </PlayerContext.Provider>
    );
}

export default MyApp;