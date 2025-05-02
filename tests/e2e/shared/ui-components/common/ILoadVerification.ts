export interface ILoadVerification {
  hasLoaded(): Promise<boolean>
}