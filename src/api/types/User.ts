export type User = {
  userId?: string,
  username: string,
  email: string,
  authentication: {
    passwordHash: string,
    salt: string
  },
  active: boolean
}