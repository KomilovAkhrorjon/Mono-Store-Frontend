import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import {useState} from "#imports";


export class CartService {

  http;
  cartData;
  authState;

  constructor() {
    this.http = useHttpService();
    this.cartData = useState('cartData');
    this.authState = useState('authState');
  }

  async addToCart(skuId: number, quantity: number) {
    const body = [
      {
        skuId: skuId,
        quantity: quantity
      }
    ]
    await this.http.put(Endpoint.CART, body);
    await this.getCartCount();
  }

  async getCartCount() {
    if (localStorage.getItem('token') == null) {
     return;
    }
    this.cartData.value = await this.http.getClearedUrl(Endpoint.CART);
  }

  async checkoutCart() {
    await this.http.post(Endpoint.ORDERS, {});
    await this.getCartCount();
  }
}

export function useCartService() {
  return new CartService();
}
