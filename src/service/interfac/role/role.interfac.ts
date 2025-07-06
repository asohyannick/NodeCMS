import { Document } from 'mongoose';
export enum HierachyLevelStatus {
    ADMIN = 'Admin',
    EDITOR = 'Editor',
    VIEWER = 'Viewer',
}
export interface IRole extends Document {
  name: string; // Name of the role
  description: string; // Description of the role
  permissions: string[]; // List of permissions associated with the role
  hierarchyLevel: HierachyLevelStatus;
  isActive: boolean; // Status of the role
}
