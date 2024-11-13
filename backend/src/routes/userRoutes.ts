// routes/userRoutes.ts
import express from "express";
import { registerUser, loginUser,addCandidates } from '../controllers/userController'

const router = express.Router();

// מסלול הרשמה
router.post("/register", registerUser);

// מסלול התחברות
router.post("/login", loginUser);

// מסלול קבלת מועמדים
// router.get("/candidates", getCandidates);

//הכנסת מועמדים דיפולטיביים
router.post("/add", addCandidates);



export default router;
