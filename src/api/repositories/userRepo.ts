import { model, Schema, Types }  from 'mongoose';
import { type IUser } from '../models'

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, selected: false },
    salt: { type: String, selected: false },
    sessionToken: { type: String, selected: false }
  }});

const UserModel = model<IUser>('User', UserSchema);

export const getUsers = async () : Promise<IUser[]> => {
  let users = await UserModel.find().lean().exec();

  return users.map(user => ({
    userId: user._id.toString(),
    username: user.username,
    email: user.email,
    authentication: user.authentication
  }));
}

export const getUserByEmail = (email: string) : Promise<IUser | null> => UserModel.findOne({ email }).lean().exec();

export const getUserBySessionToken = async (sessionToken: string) : Promise<IUser | null> => {
  let user = await UserModel.findOne( { 'authentication.sessionToken': sessionToken }).lean().exec();

  return user 
    ? {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      authentication: user.authentication
      }
    : null;
}

export const getUserById = async (id: string) : Promise<IUser | null> => {
  
  if (Types.ObjectId.isValid(id)) {
    let user = await UserModel.findById({ _id: id }).lean().exec();
    
    if (!user) {
      return null;
    }
    
    return {
      userId: user._id.toString(),
        username: user.username,
        email: user.email,
        authentication: user.authentication
    }
  }

  return null;
};

export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());

  export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findOneAndUpdate({ id, values });

export const updateUserSessionByEmail = (email: string, sessionToken: string) : Promise<IUser | null > => 
UserModel.findOneAndUpdate( 
    { email }, 
    { $set: { 'authentication.sessionToken': sessionToken }},
    { new: true, runValidators: true } ).lean().exec();
