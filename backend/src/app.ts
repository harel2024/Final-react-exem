import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDb from "./config/db";
import userRouter from "./routes/userRoute";
// import candidateRouter from "./routes/candidateRoute";
import { StartSocket } from "./socket";
import missiles from '../src/data/missiles'
import { IMission, Missiles } from "./models/MissileSchema";
import organizationsList from "./data/organizations";
import { IOrganization, Organization } from "./models/OrganizationSchema";
import { Users, IUser } from "./models/userSchema";
import { log } from "console";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
connectDb();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api', userRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




