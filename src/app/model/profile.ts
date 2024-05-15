import { Product } from "./product";

export class Profile{
    name: String  = "undefined";
    email: String = "undefined";
    phone: String = "undefined";
    since: String= "undefined";
    reviews : Number = 0;
    dateofbirth: String = "undefined";
    products: Number  = 0;
    followers: Number = 0;

    constructor(
      name: String,
      email: String,
      phone: String,
      since: String,
      dateofbirth: String,
      reviews : Number,
      products: Number,
      followers: Number
    ){

	}
}
