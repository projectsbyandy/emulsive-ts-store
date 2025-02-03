import { Types } from 'mongoose'; 
 
 export const generateId = () : string => new Types.ObjectId().toString();