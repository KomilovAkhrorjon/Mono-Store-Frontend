import {useHttpService} from "~/util/HttpService";
import {useState} from "#imports";
import {Endpoint} from "~/util/Endpoint";

export class OrderService {
  http;
  authState;

  constructor() {
    this.http = useHttpService();
    this.authState = useState('authState');
  }

  async loadOrders(): Promise<any> {

    if (!this.authState) {
      return;
    }

    return await this.http.get(Endpoint.ORDERS);
  }

  async loadOderProducts(orderId: number): Promise<any> {
    if (!this.authState) {
      return;
    }
    try {
      return await this.http.get(`${Endpoint.ORDERS}/${orderId}`);
    }catch (error) {
      alert("Error while loading order products");
    }
  }

  async loadPayments(orderId: number): Promise<any> {
    if (!this.authState) {
      return;
    }
    try {
      return await this.http.getWithParams(`${Endpoint.TO_PAYMENT}`, {orderId: orderId, paymentMethod: "PAYME"});
    }catch (error) {
      alert("Error while loading order payments");
    }
  }
}

export function useOrderService() {
  return new OrderService();
}
