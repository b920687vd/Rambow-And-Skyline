export class Pipeline<T,R> {
  private funcLinks: Array<(t: any) => any> = [];

  public static Create<T,R>(func: (k: T) => R): Pipeline<T,R> {
    const pipeline = new Pipeline<T,R>();
    pipeline.funcLinks.push(func);
    return pipeline;
  }

  public Link<U>(func: (k: R) => U): Pipeline<T, U> {
    this.funcLinks.push(func as any);
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
