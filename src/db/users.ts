import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password  : {
            type: String,
            required: true,
            selected : false,
        },
        salte: {
            type: String,
            selected: false,
        },
        sessionToken : {
            type: String,
            selected: false,
        },

    },
});


export const User = mongoose.model('User', UserSchema);

export const getUser = async ()=> User.find({});

export const getUserByEmail = async (email:string) => User.findOne({email});

export const getUserBySessionToken = async (sessionToken:string) => User.findOne({'authentication.sessionToken': sessionToken});

    
