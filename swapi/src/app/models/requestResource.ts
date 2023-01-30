export interface IResponseResource<T> {
  count: string;
  next: string;
  previous: string;
  results: T[];
}
