import express from 'express';

import {getUsers, deleteUserById, getUserById} from '../db/users';

export const getAllUsers = async (req:express.Request, res:express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }

    catch(err){
        console.log(err);
        return res.status(400);
    }
}

export const deletedUser = async (req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);

        return res.status(200).json(deletedUser);
    }

    catch(err){
        console.log(err);
        return res.status(400);
    }
}

export const updateUser = async (req:express.Request, res:express.Response) => {
    try{
        const {username}=req.body;
        const {id,} = req.params;

        if (!username){
            return res.status(400).send('Username is required');
        }



        const user=await getUserById(id);

        if (!user){
            return res.status(404).send('User not found');
        }

        user.username=username;

        await user.save();

        return res.status(200).json(user);
    }

    catch(err){
        console.log(err);
        return res.status(400);
    }
}
