export class Adventure {
  constructor(
    private _id: string,
    private _name: string,
    private _date: Date
  ) {
  }

  get id(): string {
    return this._id
  }

  get slug(): string {
    return this._name.toLowerCase().replaceAll(" ", "-")
  }

  get name(): string {
    return this._name;
  }

  get date(): Date {
    return this._date;
  }

  public toObject(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      date: this._date
    }
  }
}
