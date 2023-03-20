export type Plugin<T,R> = (p: T)=> R;

export class Pipeline<T,R> {
  private funcLinks: Array<Plugin<any,any>> = [];

  public static Create<T,R>(func:Plugin<T,R>): Pipeline<T,R> {
    const pipeline = new Pipeline<T,R>();
    pipeline.funcLinks.push(func);
    return pipeline;
  }

  public Link<U>(func: Plugin<R, U>): Pipeline<T, U>
  public Link<U>(func: Pipeline<R, U>): Pipeline<T, U>
  public Link<U>(func: Plugin<R, U> | Pipeline<R, U>): Pipeline<T, U> {
    if (func instanceof Pipeline) {
      this.funcLinks = this.funcLinks.concat(func.funcLinks);
    } else {
      this.funcLinks.push(func as any);
    }
    return this as any;
  }

  public Execute(params: T): R {
    let result = params;

    for (const func of this.funcLinks) {
      result = func(result);
    }

    return result as unknown as R;
  }
}
