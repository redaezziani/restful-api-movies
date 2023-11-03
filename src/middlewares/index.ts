import express from 'express';
import {get, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';
export const isOwner = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    try{
        const {id}=req.params;
        const currentUser = get(req,'identity._id') as string;

        if (!currentUser){
            return res.status(403).send('Unauthorized');
        }

        if (currentUser !== id){
            return res.status(403).send('Not owner');
        }

        return next();
    }
    catch(err){
        console.log(err);
        return res.status(400);
    }
}
export const  isAuthenticated = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    try{
        const sessionToken = req.cookies['sessionToken'];

        if (!sessionToken){
            return res.status(403).send('Unauthorized');
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser){
            return res.status(403).send('Unauthorized');
        }

        merge(req,{identity:existingUser});

        return next();
    }
    catch(err){
        console.log(err);
        return res.status(400);

    }
}





