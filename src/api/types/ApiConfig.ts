export type ApiConfig = {
  port: number,
  jwtExpiry: string,
  useFake: boolean,
  mongoConfig: {
    username: string,
    password: string
  }
}