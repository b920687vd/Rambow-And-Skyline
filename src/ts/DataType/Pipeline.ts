export class Pipeline<T,R> {
  private funcLinks: Array<(t: any) => any> = [];

  public static Create<T,R>(func: (k: T) => R): Pipeline<T,R> {
    const pipeline = new Pipeline<T,R>();
    pipeline.funcLinks.push(func);
    return pipeline;
  }

  public Link<U>(func: (k: R) => U): Pipeline<T,U> {
    const pipeline = new Pipeline<T,U>();
    pipeline.funcLinks = [...this.funcLinks, func];
    return pipeline;
  }

  public Execute(params: T): R {
    let result = params;

    for (const func of this.funcLinks) {
      result = func(result);
    }

    return result as unknown as R;
  }
}
