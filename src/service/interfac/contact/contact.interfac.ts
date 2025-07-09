import { Document } from 'mongoose';

export interface IContact extends Document {
    name: string; // Name of the person contacting
    email: string; // Email address of the contact
    subject: string; // Subject of the inquiry
    message: string; // The message or inquiry details
    isResponded: boolean; // Flag to indicate if the inquiry has been responded to
}