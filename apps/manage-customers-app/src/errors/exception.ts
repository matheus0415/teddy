export class Exception extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'Exception';
    this.status = status;
  }
}
