import { defineNuxtPlugin } from '#app';
import { CartService } from '~/util/CartService';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      cartService: new CartService(),
    },
  };
});
