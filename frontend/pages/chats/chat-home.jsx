import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../contexts/socket";
import {PlayerContext} from "../../contexts/player";
import {useRouter} from "next/router";

export default function ChatHome() {
    const router = useRouter();

    const player = useContext(PlayerContext);
    const socket = useContext(SocketContext);

    const [message, setMessage] = useState("");

    const sendMessage = (nickName, message) => {
        socket.emit("room::message::send", {
            room: "default",
            nickName: nickName,
            message: message
        });
    }

    const sendMessageRoom = (room, nickName, message) => {
        socket.emit("room::message::send", {
            room: room,
            nickName: nickName,
            message: message
        });
    }

    const joinRoom = (room) => {
        socket.emit("room::join", room);
    }

    const leaveRoom = (room) => {
        socket.emit("room::leave", room);
    }

    useEffect(() => {
        if (player.nickname === "") {
            router.push("/login");
            return;
        }

        socket.on("room::message::send", ({room, nickName, message}) => {
            console.log("[ROOM:" + room + "] From", nickName, ":", message);
        });

        socket.on("room::join", (room) => {
            console.log("Room " + room + " successfully joined");
        });

        socket.on("room::leave", (room) => {
            console.log("Room " + room + " successfully left");
        });
    }, []);

    return (
        <div>
            <input value={message} onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={() => {
                if (player.room === "") {
                    sendMessage(player.nickname, message);
                    return;
                }

                sendMessageRoom(player.room, player.nickname, message)
            }}>Envoyer un message
            </button>

            <input value={player.room} onChange={(event) => player.setRoom(event.target.value)}/>
            <button onClick={() => joinRoom(player.room)}>Rejoindre une room</button>

            <input value={player.room} onChange={(event) => player.setRoom(event.target.value)}/>
            <button onClick={() => leaveRoom(player.room)}>Quitter une room</button>
        </div>
    );
}
