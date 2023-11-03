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

export const getUserById= async (id:string) => User.findById(id);

export const createUser = async (values:Record<string,any>) => new User(values).save().then((user:any) => user.toObject());

export const deleteUserById = async (id:string) => User.findByIdAndDelete({_id:id});

export const updateUserById = async (id:string, values:Record<string, any> ) =>User.findByIdAndUpdate(id , values);

    
