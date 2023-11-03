import express  from "express";
import { getUserByEmail , createUser} from "../db/users";
import { random , authentication} from "../helpers";

export const register = async (req:express.Request, res:express.Response) => {
    try{
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).send('Missing required fields');
        }

        const existingUser:any = await getUserByEmail(email);

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


export const login = async (req:express.Request, res:express.Response) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send('Missing required fields');
        }
    
        const user = await getUserByEmail(email);

    if(!user){
        return res.status(400).send('User does not exist');
    }
    const expectedHash = authentication(user.authentication.salte, password);

    if(expectedHash !== user.authentication.password){
        return res.status(403).send('Wrong password');
    }

    const salte = random();

    user.authentication.sessionToken = authentication(salte, user._id.toString());

    await user.save();

    res.cookie('sessionToken', user.authentication.sessionToken, {  
        domain: 'localhost',
        path: '/',
    });

    return res.status(200).json(user).end();  

    
}
catch(err){
    console.log(err);
    return res.status(400);
}
}