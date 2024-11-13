import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./DAL/db"; // connectToMongoDB from "./DAL/db";
import routerUsers from "./routes/userRoutes";
// import routerCandidates from "./routes/candidateRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB();

// Routes

app.use("/api", routerUsers);
// app.use("/api", routerCandidates);





// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




