import { Schema, model } from 'mongoose';

export interface IUser{
    id: string;
    email: string;
    password: string;
    Firstname: string;
    Lastname: string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<IUser>(
    {
        Firstname: { type:String, requred:true },
        Lastname: { type:String, requred:true },
        email: { type:String, requred:true, unique:true },
        password: { type:String, requred:true },
        isAdmin: { type:Boolean, requred:true },
        
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const UserModel = model<IUser>('user', UserSchema);