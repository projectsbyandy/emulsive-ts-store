export interface Rule<T, Y> {
  condition?: (paramFilters: T) => boolean;
  perform: (response: Y, paramFilters: T) => Y;
}