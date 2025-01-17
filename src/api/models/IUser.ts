export interface IUser {
  userId: string,
  username: string,
  email: string,
  authentication: {
    password: string,
    salt: string,
    sessionToken: string
  }
}