import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../contexts/socket";
import {PlayerContext} from "../../contexts/player";
import {useRouter} from "next/router";

export default function ChatHome() {
    const router = useRouter();

    const player = useContext(PlayerContext);
    const socket = useContext(SocketContext);

    const [message, setMessage] = useState("");

    const sendMessage = (message) => {
        socket.emit("room::message::send", {room: "default", message: message});
    }

    const sendMessageRoom = (room, message) => {
        socket.emit("room::message::send", {room: room, message: message});
    }

    const joinRoom = (room) => {
        socket.emit("room::join", room);
    }

    useEffect(() => {
        if (player.nickname === "") {
            router.push("/login");
            return;
        }

        socket.on("room::message::send", ({room, message}) => {
            console.log("Message received from", player.nickname, ":", message);
        });

        socket.on("room::join", (room) => {
            console.log("Room " + room + " successfully joined");
        });
    }, []);

    return (
        <div>
            <input value={message} onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={() => {
                if (player.room === "") {
                    sendMessage(message);
                    return;
                }

                sendMessageRoom(player.room, message)
            }}>Envoyer le message
            </button>

            <input value={player.room} onChange={(event) => player.setRoom(event.target.value)}/>
            <button onClick={() => joinRoom(player.room)}>Rejoindre la room</button>
        </div>
    );
}
