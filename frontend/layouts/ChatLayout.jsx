import {useContext, useEffect, useState} from 'react';
import {SocketContext} from "../contexts/socket";
import Chat from "../components/Chat";

export default function GameLayout({join, leave, children}) {
    const socket = useContext(SocketContext);
    const [isWaitingPlayers, setIsWaitingPlayers] = useState(true);

    useEffect(
        () => {
            socket.on("game::start", () => setIsWaitingPlayers(false));
        },
        [],
    );

    return (
        <Chat
            join={join}
            leave={leave}
        >
            {isWaitingPlayers && <p> Waiting Opponents ... </p>}
            {!isWaitingPlayers && children}
        </Chat>
    );
}
