import { Document } from "mongoose";
export interface IProfile extends Document {
    firstName:string;
    lastName:string;
    email:string;
    address:{
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    occupation:string;
    hobbies:string[];
    date: Date;
}