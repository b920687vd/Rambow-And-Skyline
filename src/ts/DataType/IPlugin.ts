export interface IPlugin<T,R> {
  Run(params: T):R;
}
