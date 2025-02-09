import { model, Schema, Types } from "mongoose";
import { User, UserFilterParams } from "../../types";
import { IUserRepository } from "./IUserRepository";
import { filterData } from "./userFilterRules";

class UserRepository implements IUserRepository {

  private UserSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      passwordHash: { type: String, required: true, selected: false },
      salt: { type: String, selected: false }
    },
    active: {type: Boolean, required: true
  }});
  
  private UserModel = model<User>('User', this.UserSchema);
  
  async getUsers(filterParams: UserFilterParams): Promise<User[]> {
    let users = await this.UserModel.find().lean().exec();

    return filterData(users.map(user => ({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      authentication: user.authentication,
      active: user.active
    })), filterParams);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ email }).lean().exec();
 
    return user 
    ? { userId: user._id.toString(), username: user.username, email: user.email, authentication: user.authentication, active: user.active}
    : null;
  }
  
  async getUserById(id: string): Promise<User | null> {
    if (Types.ObjectId.isValid(id)) {
      let user = await this.UserModel.findById({ _id: id }).lean().exec();
      
      if (!user) {
        return null;
      }
      
      return {
        userId: user._id.toString(),
          username: user.username,
          email: user.email,
          authentication: user.authentication,
          active: user.active
      }
    }
  
    return null;
  }

  createUser(user: User): void {
    new this.UserModel(user)
      .save().then((user) => user.toObject());
  }

  async deleteUserById(id: string): Promise<void> {
    await this.UserModel.findOneAndDelete({ _id: id })
  }

  updateUserById(id: string, values: Record<string, any>): void {
    this.UserModel.findOneAndUpdate({ id, values });
  }
}

export default new UserRepository();