 export type AuthResponse = {
  jwt: string,
  user: {
    userId?: string,
    username: string,
    email: string,
    active: boolean
  }
 }