import { io, Socket } from 'socket.io-client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from './store/userSlice';
import { AnyAction, AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { IUser } from './types/types';
let socketOn: boolean = false
let socket: Socket | null = null
export const StartSocket = () => {
    if (!socketOn) {
        socket = io('http://localhost:5001')
        socketOn = true
        socket?.on("hello", () => {
            console.log("hello");
        })
        socket?.on("StartAttack", async (data: { user: IUser }) => {
            //
        });
    }
    async function StartAttack(missile: string, username: string) {
        await socket!.emit("StartAttack", { missile, username })
        console.log(missile, username);
    }
    return { StartAttack }
}