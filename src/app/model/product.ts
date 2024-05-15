

export class Product {
  id: string = "";
  name: string;
  price: number;
  description: string;
  loc: string;
  since: string;
  image: string = "";
  sellerEmail: string = "";
  wisherEmail: string = "";
  buyerEmail: string = "";
  category: string = "";


  constructor(name: string, price: number, description: string, loc: string) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.loc = loc;
    this.since = ''; // Assuming since is an empty string by default
    this.image = ""; // Assuming images is undefined by default
  }
}
