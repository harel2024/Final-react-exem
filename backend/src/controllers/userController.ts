// controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

import { StartSocket } from '../soketVote'
import Missile from "../models/Missiles";
import Organization from "../models/Organizations";

// // פונקציה להרשמה
// export const registerUser = async (req: Request, res: Response) => {
//   const { username, password, isAdmin } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//        res.status(400).json({ message: "Username already exists" });
//        return
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//       isAdmin,
//       hasVoted: false,
//       votedFor: null
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// };


// רישום משתמש חדש
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, organization, area } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'שם משתמש כבר קיים' });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const specificOrganization = await Organization.findOne({ name: organization });
    if (!specificOrganization) {
       res.status(400).json({ message: 'הארגון לא נמצא' });
       return
    }

    const specificMissiles = await Promise.all(specificOrganization.resources.map(async (missile: any) => {
      const missileObject = await Missile.findOne({ name: missile.name });
      if (missileObject) {
        missileObject.amount = missile.amount; 
        return missileObject;
      }
    }));

    const newUser = new User({
      username,
      password: hashedPassword,
      organization,
      area,
      missiles: specificMissiles.filter(Boolean), 
    });

    await newUser.save();
    res.status(201).json({ message: 'המשתמש נוצר בהצלחה',  newUser });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'שגיאה ברישום המשתמש' });
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
      { id: user._id, username: user.username, organization: user.organization, area: user.area },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, organization: user.organization, area: user.area },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};





// פונקציה לקבלת מועמדים
// export const getCandidates = async (req: Request, res: Response) => {
//   try {
//     const candidates = await Candidate.find();
    
//     /////קורא לפונקציה שמפעילה את הסוקט להוספת הצבעות
//     StartSocket();
//     res.json(candidates);

//   } catch (error) {
//     res.status(500).json({ message: "Error fetching candidates", error });
//   }
// };


// export const addCandidates = async (req: Request, res: Response) => {
//   try {
//     const { name, image } = req.body;
//     const newCandidate = new Candidate({ name, image });
//     await newCandidate.save();
//     res.status(201).json({ message: "Candidate added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding candidate", error });
//   }
// };





