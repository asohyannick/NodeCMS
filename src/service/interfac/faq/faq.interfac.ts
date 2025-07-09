import { Document } from 'mongoose';

export interface IFAQ extends Document {
    question: string; // The frequently asked question
    answer: string; // The answer to the question
    category?: string; // Optional category for organization
    isActive: boolean; // Flag to mark if the FAQ is active or not
}