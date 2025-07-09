import { Types, Document } from 'mongoose';
export enum MediaStatus {
    IMAGE = 'Image',
    VIDEO = 'Video',
    AUDIO = 'Audio',
    DOCUMENT = 'Document',
}
export interface IMedia extends Document {
    uploadedBy: Types.ObjectId; // Reference to the user who uploaded the media
    relatedContent: Types.ObjectId[]; // Array of references to related content
    title: string; // Title of the media item
    url: string; // URL of the media item
    mediaType: MediaStatus; // Type of media
    description?: string; // Optional description of the media item
    size: number; // Size of the media file in bytes
}