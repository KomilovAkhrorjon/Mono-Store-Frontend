<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import Grid from "~/components/common/Grid.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import IncreseDecreseBtn from "~/components/common/IncreseDecreseBtn.vue";
import SkuInfo from "~/components/common/SkuInfo.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import {useUtils} from "~/util/Utils";
import {useCartService} from "~/util/CartService";

const http = useHttpService()
const cart = useState<any>('cartData')
const authState = useState<any>('authState')
const dataLoaded = ref<boolean>(false)
const util = useUtils()
const cartService = useCartService();
const router = useRouter()

onMounted(() => {
  loadCart()
  if (localStorage.getItem('token') == null) {
    router.push('/login')
  }
})

async function loadCart() {
  dataLoaded.value = false
  await cartService.getCartCount();
  dataLoaded.value = true
}

async function updateSku(quantity: any, sku: any) {
  await cartService.addToCart(sku.id, quantity)
}

function getFirstImage(product: any) {
  return http.getFileUrl(util.sortImages(product.media).MEDIUM[0]?.url)
}

async function deleteFromCart(id: number) {
  const params = {
    id: id
  }
  await http.deleteWithParams(Endpoint.CART, params)
  await loadCart()
}

function deleteAllFromCart() {
  cart.value?.forEach(async (product: any) => {
    await deleteFromCart(product.id)
  })
}

function calculateTotal() {
  let total = 0
  cart.value.forEach((product: any) => {
    total += product.sku.price.discountPrice ? product.sku.price.discountPrice : product.sku.price.price
  })
  return total
}
</script>

<template>
  <grid class="grid-cols-3 gap-4 max-sm:grid-cols-1"
        v-if="dataLoaded">
    <flex-col class="col-span-2 w-full p-4 gap-4 max-sm:col-span-1">
      <flex-row class="text-lg gap-2 justify-between w-full items-center">
        <flex-row class="gap-2">
          <div class="text-mg-900 font-semibold">
            {{ $t('cart.shopping_cart') }}
          </div>
          <div class="text-gray-500">
            ({{ cart.length }} {{ $t('order.items') }})
          </div>
        </flex-row>
        <flex-row>
          <button
              @click="deleteAllFromCart()"
              class="flex flex-row gap-2 items-center text-sm transition-all text-gray-700 hover:text-mr-600">
            <font-awesome :icon="['far', 'trash-can']"/>
            {{ $t('action.remove_all') }}
          </button>
        </flex-row>
      </flex-row>
      <flex-row class="w-full"
                v-for="product in cart"
                :key="product">
        <mono-card class="w-full">
          <flex-row class="w-full justify-between items-center">
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
              <flex-row>
                <flex-row class="text-mg-900 font-medium text-lg">
                  {{ util.getPriceWithCurrency(product.sku.price.discountPrice ? product.sku.price.discountPrice : product.sku.price.price, 'UZS') }}
                </flex-row>
                <flex-row class="text-xs text-mg-800 line-through"
                          v-if="product.sku.price.discountPrice">
                  {{ util.getPriceWithCurrency(product.sku.price.price, 'UZS') }}
                </flex-row>
              </flex-row>
              <flex-row>
                <increse-decrese-btn @updates="($cnt) => updateSku($cnt, product.sku)"
                                     :count="product.sku.quantity"/>
              </flex-row>
              <flex-row class="items-center">
                <button
                    @click="deleteFromCart(product.id)"
                    class="flex flex-row gap-2 items-center text-sm transition-all text-gray-700 hover:text-mr-600">
                  <font-awesome :icon="['far', 'trash-can']"/>
                  {{ $t('action.remove') }}
                </button>
              </flex-row>
            </flex-col>
          </flex-row>
        </mono-card>
      </flex-row>
    </flex-col>
    <mono-card class="h-fit sticky top-14 gap-1 max-sm:col-span-1">
      <flex-row class="text-lg font-semibold text-mg-900">
        {{ $t('cart.summary')}}
      </flex-row>
      <flex-row class="gap-2 border-b justify-between pb-4">
        <flex-row class="text-mg-900">
          {{ $t('cart.total') }}
        </flex-row>
        <flex-row class="text-mg-900">
          {{ util.getPriceWithCurrency(calculateTotal(), 'UZS') }}
        </flex-row>
      </flex-row>
      <flex-row class="w-full mt-4">
        <primary-btn href="/cart/checkout" class="w-full">
          {{ $t('cart.checkout') }}
        </primary-btn>
      </flex-row>
    </mono-card>
  </grid>
</template>

<style scoped>

</style>
