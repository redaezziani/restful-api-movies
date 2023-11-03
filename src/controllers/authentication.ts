import express  from "express";
import { getUserByEmail , createUser} from "../db/users";
import { random , authentication} from "../helpers";


export const register = async (req:express.Request, res:express.Response) => {
    try{
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).send('Missing required fields');
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser){
            return res.status(400).send('User already exists');
        }

        const salte=random();
        const user = await createUser({
            email,
            username,
            authentication: {
                password: authentication(salte, password),
                salte,
            },
        });

        return res.status(200).send(user).end();
    }


    catch(err){
        console.log(err);
        return res.status(400);
    }
}