// controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Candidate from "../models/Candidate";
import { StartSocket } from '../soketVote'

// פונקציה להרשמה
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
       res.status(400).json({ message: "Username already exists" });
       return
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin,
      hasVoted: false,
      votedFor: null
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// פונקציה להתחברות
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
       res.status(400).json({ message: "Invalid username or password" });
       return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(400).json({ message: "Invalid username or password" });
       return
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// פונקציה לקבלת מועמדים
export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();
    
    /////קורא לפונקציה שמפעילה את הסוקט להוספת הצבעות
    StartSocket();
    res.json(candidates);

  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};


export const addCandidates = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;
    const newCandidate = new Candidate({ name, image });
    await newCandidate.save();
    res.status(201).json({ message: "Candidate added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding candidate", error });
  }
};


// בקובץ הבקר של המועמדים בשרת
// export const voteForCandidate = async (req: Request, res: Response) => {
  







//   const userId = req.user._id; // יש לוודא שמזהה המשתמש מאומת דרך ה-token
//   const { candidateId } = req.body;

//   try {
//     const candidate = await Candidate.findById(candidateId);
//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });

//     // בדיקה אם המשתמש כבר הצביע
//     if (candidate.voters.includes(userId)) {
//       return res.status(400).json({ message: "User has already voted for this candidate" });
//     }

//     // הוספת הצבעה
//     candidate.votes += 1;
//     candidate.voters.push(userId); // שמירת מזהה המשתמש
//     await candidate.save();

//     res.json({ votes: candidate.votes });
//   } catch (error) {
//     res.status(500).json({ message: "Error voting for candidate", error });
//   }
// };


