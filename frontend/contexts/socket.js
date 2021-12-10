import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(
    typeof window !== undefined ? io("http://localhost:4242") : null
);
