import { io } from "socket.io-client";

export default function Home() {
  const socket = io("ws://localhost:4242");
  socket.emit("room::join", { room: "default" });
  socket.emit("room::message::send", { room: "default", message: "Hello" });

  socket.on("room::message::send", ({ room, message }) => {
    console.log("Message received:", room, message);
  });

  return (
    <div>
    </div>
  )
}
