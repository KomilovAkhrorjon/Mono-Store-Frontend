<script setup lang="ts">

import {useOrderService} from "~/util/OrderService";
import FlexCol from "~/components/common/FlexCol.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import SkuInfo from "~/components/common/SkuInfo.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";
import Grid from "~/components/common/Grid.vue";

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
})
const router = useRouter();
const http = useHttpService();
const util = useUtils();
const service = useOrderService();
const orderProducts = ref<Array<any>>([]);

function getFirstImage(product: any) {
  return http.getFileUrl(util.sortImages(product.media).MEDIUM[0]?.url)
}

function viewProduct(product: any) {
  router.push(`/product/${util.linkNameFormatter(product.productName)}--${product.id}`)
}

async function redirectToPayme() {

  const result = await service.loadPayments(props.orderId);
  const text = `m=587f72c72cac0d162c722ae2;ac.order_id=${result.id};a=${result.amount}`;
  const token = btoa(text);
  window.open(`https://checkout.paycom.uz/${token}`, '_blank')
}

onMounted(async () => {
  await service.loadOderProducts(props.orderId).then(res => {
    orderProducts.value = res
  })
})

</script>

<template>
  <template v-if="orderProducts.length">
    <grid class="flex justify-start flex-wrap gap-3 mt-2"
          :class="orderProducts.length > 1 ? 'lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1'">
      <template
          v-for="product in orderProducts"
          :key="product">
        <mono-card @click="viewProduct(product)"
                   class="cursor-pointer select-none hover:shadow-xl transition duration-200">
          <flex-row class="w-full justify-between items-center gap-4">
            <flex-col class="h-full items-center">
              <flex-row class="gap-4">
                <flex-col class="w-auto">
                  <nuxt-img :src="getFirstImage(product)"
                            class="shadow-sm rounded-md max-w-24"
                            loading="lazy"
                            :title="product.productName"
                            :alt="product.productName"/>
                </flex-col>
                <flex-col class="gap-2">
                  <flex-row class="text-mg-900 font-semibold">
                    {{ product.productName }}
                  </flex-row>
                  <div class="text-sm">
                    <template v-for="specification in product.sku.specifications"
                              :key="specification">
                      <sku-info :specification="specification"/>
                    </template>
                  </div>
                </flex-col>
              </flex-row>
            </flex-col>
            <flex-col class="gap-4 items-center">
              <flex-row class="gap-1">
                <flex-row class="text-gray-500 font-medium text-lg" v-if="product.sku.quantity > 1">
                  {{ product.sku.quantity }} X
                </flex-row>
                <flex-row class="text-mg-900 font-medium text-lg">
                  {{
                    util.getPriceWithCurrency(product.sku.price.discountPrice ? product.sku.price.discountPrice : product.sku.price.price, 'UZS')
                  }}
                </flex-row>
                <flex-row class="text-xs text-mg-800 line-through"
                          v-if="product.sku.price.discountPrice">
                  {{ util.getPriceWithCurrency(product.sku.price.price, 'UZS') }}
                </flex-row>
              </flex-row>
            </flex-col>
          </flex-row>
        </mono-card>
      </template>
      <flex-row class="text-2xl justify-center items-center gap-4">
        {{ $t('action.payment_with') }}
        <img src="https://cdn.payme.uz/logo/payme_color.png"
             @click="redirectToPayme"
             class="hover:shadow-xl transition duration-200 cursor-pointer"
             alt="Payme"
             width="300px"/>
      </flex-row>
    </grid>
  </template>
</template>

<style scoped>

</style>
