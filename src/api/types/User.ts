export type User = {
  userId: string,
  username: string,
  email: string,
  authentication: {
    password: string,
    salt: string,
    sessionToken: string
  }
}