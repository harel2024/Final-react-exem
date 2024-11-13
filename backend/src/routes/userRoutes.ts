// routes/userRoutes.ts
import express from "express";
import { loginUser, registerUser } from '../controllers/userController'
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// מסלול הרשמה
router.post("/register", registerUser);

// מסלול התחברות
// authenticateToken,
router.post("/login", loginUser);

// מסלול קבלת מועמדים
// router.get("/candidates", getCandidates);

//הכנסת מועמדים דיפולטיביים
// router.post("/add", addCandidates);



export default router;
