import { model, Schema } from 'mongoose';
import IUserRepository from './IUserRepository';
import { User } from '../models';

export class UserRepository implements IUserRepository {

  UserSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, selected: false },
      salt: { type: String, selected: false },
      sessionToken: { type: String, selected: false }
    }
  });
  
  UserModel = model('User', this.UserSchema);
  async getUsers(): Promise<Array<User> | null> {
    return await this.UserModel.find().lean().exec();
  }
  getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  getUsersBySessionToken(sessionToken: string): Array<User> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string) {
    throw new Error('Method not implemented.');
  }
  createUser(values: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }
  deleteUserById(id: string): void {
    throw new Error('Method not implemented.');
  }
  updateUserById(id: string, values: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }
}

export default UserRepository



// import mongoose, { Schema }  from 'mongoose';
// import { User } from '../models';

// const UserSchema = new Schema<User>({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   authentication: {
//     password: { type: String, required: true, selected: false },
//     salt: { type: String, selected: false },
//     sessionToken: { type: String, selected: false }
//   }
// });

// export const UserModel = mongoose.model('User', UserSchema);

// const getUsers = () => UserModel.find();

// export default getUsers();
// export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// export const getUsersBySessionToken = (sessionToken: string) => 
//     UserModel.findOne( { 'authentication.sessionToken': sessionToken });
// export const getUserById = (id: string) => UserModel.findById({ id });
// export const createUser = (values: Record<string, any>) => new UserModel(values)
//   .save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findOneAndUpdate({ id, values });
