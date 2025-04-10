<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import Grid from "~/components/common/Grid.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";
import {useCartService} from "~/util/CartService";

const http = useHttpService();
const util = useUtils();
const dataLoading = ref<boolean>(false);
const cart = useState<any>('cartData');
const name = ref('');
const router = useRouter();
const cartService = useCartService();

onMounted(() => {
  loadCart();
});

async function loadCart() {
  dataLoading.value = false;
  await cartService.getCartCount();
  dataLoading.value = true;
}

function calculateTotal() {
  let total = 0;
  cart.value?.forEach((product: any) => {
    total += product.sku.price.discountPrice ? product.sku.price.discountPrice : product.sku.price.price;
  });
  return total;
}

async function checkoutCart() {
  await cartService.checkoutCart();
  await router.push('/orders');
}
</script>

<template>
  <flex-row class="text-mg-900 text-lg font-semibold my-4 pl-4">
    {{ $t('checkout.checkout_page')}}
  </flex-row>
  <grid class="grid-cols-3 max-md:grid-cols-1 gap-4">
    <lazy-common-mono-card class="text-sm">
      <flex-row class="justify-between py-2 pb-4">
        <flex-row class="text-gray-500">
          {{ $t('cart.total') }}:
        </flex-row>
        <flex-row class="font-semibold text-mg-900">
          {{ util.getPriceWithCurrency(calculateTotal(), "UZS") }}
        </flex-row>
      </flex-row>
      <flex-row class="text-mg-900 mt-4 w-full justify-center">
        <primary-btn @click="checkoutCart()"
                     class="px-8">
          {{ $t('action.checkout') }}
        </primary-btn>
      </flex-row>
    </lazy-common-mono-card>
  </grid>
</template>

<style>
.promo-input input {
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.promo-input input:focus {
  outline: 3px lightseagreen;
}
</style>
