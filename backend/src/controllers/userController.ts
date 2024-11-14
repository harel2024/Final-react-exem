import {Users, IUser} from '../models/userSchema';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { log } from 'console';
import { IOrganization, Organization } from '../models/OrganizationSchema';
import { IMission, Missiles } from '../models/MissileSchema';

export const register = async (req: Request, res: Response) => {
    try {
        
        const { username, password, organization, location } = req.body.user;
        if (!username || !password || !organization) {
            res.status(200).json({ message: "Username and password are required", success: false });
            return;
        }
        console.log(location);
        
        const user: IUser = {
            username,
            password,
            organization : organization == "IDF"? `${organization} - ${location}`: organization,
            resources: [],
            location : organization == "IDF"? location: undefined
        };
        
        const organizationOfUser: IOrganization | null = await Organization.findOne({ name: user.organization });
        console.log(user.organization);
        
        if (organizationOfUser) {
            
            await Promise.all(organizationOfUser.resources.map(async (resource) => {
                const missile: IMission | null = await Missiles.findOne({ name: resource.name });
                
                if (missile) {
                    
                    user.resources!.push({ missile: missile._id, amount: resource.amount });
                    
                }
            }));

            // יצירת המשתמש לאחר שכל ה-resources התווספו
            const UserAdded = await Users.create(user); 
            res.status(201).json({ newUser: UserAdded, success: true });
            return;
        }

        res.status(400).json({ message: "Organization not found", success: false });
    } catch (error) {
        res.status(400).json({ message: error, success: false });
    }
};

export const login = async(req: Request, res: Response)=>{
    try{
        
        const {username, password} = req.body.user;
        
        if(!username || !password){
            res.status(400).json({ message: "Username and password are required", success: false })
            return;
        }
        
        const user = await Users.findOne({username}).populate("resources.missile");
        
        if(!user ){
            res.status(200).json({ message: "usename or password is incorrect", success: false })
            return;
        }
        if(user.password !== password){
            res.status(200).json({ message: "usename or password is incorrect", success: false })
            return;
        }
        const token = jwt.sign(
            { id: user._id },
            "your_secret_key",
            { expiresIn: "1h" }
        );
        
        res.status(200).json({token: token, ResUser: user , message: "Login successful", success: true })
    }
    catch(error){
        res.status(400).json({ message: error, success: false })
    }
}

