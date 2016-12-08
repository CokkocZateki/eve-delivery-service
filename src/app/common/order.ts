export class Order {
  constructor(
    public client: string,
    public link: string,
    public expectedPrice: number,
    public destination: string,
    public id?:string,
    public status?: string,
    public items?: any,
    public assignee?: string,
    public created?: any,
    public age?: number,
    public prefit?: boolean
  ) {  }
}
