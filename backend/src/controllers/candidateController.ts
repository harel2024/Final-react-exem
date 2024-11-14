import {Users, IUser} from '../models/userSchema';
import {Missiles, IMission} from '../models/MissileSchema';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { StartSocket } from '../socket';
import { log } from 'console';


// export const getCandidate = async(req: Request, res: Response)=>{
//     try{
//         const candidates = await Candidate.find();
        
//         StartSocket();

//         res.status(200).json({ candidates: candidates, success: true })
        

//     }
//     catch(error){
//         res.status(400).json({ message: error, success: false })
//     }
// }