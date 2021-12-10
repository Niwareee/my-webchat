import {Server} from "socket.io";

export function launch(port) {
    const server = new Server({
        cors: {
            origin: "http://localhost:3000",
        },
    });

    server.on("connection", (socket) => {
        console.log("new connection.", socket.id);

        socket.on("room::join", (room) => {
            socket.join(room);
            socket.emit("room::join", room);
        });

        socket.on("room::message::send", ({room, message}) => {
            server.to(room).emit("room::message::send", {room, message});
        });
    })

    server.listen(port);
    console.log(`Server started at http://localhost:${port}`);
}