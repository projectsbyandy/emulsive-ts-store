export interface ILoadable {
  loaded() : Promise<void>
}