import { model, Schema, Types }  from 'mongoose';
import { type User } from '../types'

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    passwordHash: { type: String, required: true, selected: false },
    salt: { type: String, selected: false },
    sessionToken: { type: String, selected: false }
  }});

const UserModel = model<User>('User', UserSchema);

export const getUsers = async () : Promise<User[]> => {
  let users = await UserModel.find().lean().exec();

  return users.map(user => ({
    userId: user._id.toString(),
    username: user.username,
    email: user.email,
    authentication: user.authentication
  }));
}

export const getUserByEmail = async (email: string) : Promise<User | null> => {
  const user = await UserModel.findOne({ email }).lean().exec();
 
  return user 
  ? { userId: user._id.toString(), username: user.username, email: user.email, authentication: user.authentication }
  : null;
}

export const getUserById = async (id: string) : Promise<User | null> => {
  
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
