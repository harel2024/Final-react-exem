import { Server } from "socket.io";
import { Users } from "./models/userSchema";
import { ActiveMissile, IActiveMissile } from "./models/ActiveMissile";
import { Missiles } from "./models/MissileSchema";
import { log } from "console";
let socketOn: boolean = false;
export const StartSocket = () => {
    if (!socketOn) {
        const io = new Server(5001, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });
        socketOn = true;
        io.on('connection', (socket) => {
            socket.on("StartAttack", async ({ missile, username }) => {
                try {
                  
                    //למצוא את היוזר ולהוריד לו את הטיל מרשימת הטילים
                    const userFound = await Users.findOne({ username: username }).populate("resources.missile");
                    userFound?.resources?.forEach((resource) => {
                        if (resource.missile?._id.toString() === missile && resource.amount > 0) {
                            console.log("in if");
                            resource.amount -= 1;
                            userFound.save();
                            
                        }
                    })
                    //להכניס לדתא בייס את הטיל עם הסטטוס
                    const missileFound = await Missiles.findOne({ _id: missile });
                    if (missileFound) {
                        const activeMissile: IActiveMissile = {
                            name: missileFound.name,
                            id: missileFound._id.toString(),
                            status: "onAir",
                            location: "Theater",
                        }
                        ActiveMissile.create(activeMissile);
                        //שליחת הודעה שמכילה את הטיל השניות והמיקום, את היוזר ורשימת הטילים המעודכנת שלו
                        io.emit("StartAttack", { missile: missileFound, location: activeMissile.location, user: userFound });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
};