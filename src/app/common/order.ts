export class Order {
  constructor(
    public client: string,
    public link: string,
    public expectedPrice: number,
    public id?:string,
    public status?: string,
    public items?: any,
    public setPrice?: number
  ) {  }
}
