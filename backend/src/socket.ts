import { Server } from "socket.io";

let socketOn: boolean = false;

export const StartSocket = () => {
    if (!socketOn) {
        console.log("starting socket");

        const io = new Server(5001, {
            cors: {
                origin: "*", // אפשר לציין URL ספציפי במקום "*"
                methods: ["GET", "POST"],
            }
        });

        
        io.on('connection', (socket) => {
            console.log('User connected');

            socket.on("hello", (msg) => {
                console.log("hello from client function work");
            });


            
        });

        socketOn = true;
    }
};