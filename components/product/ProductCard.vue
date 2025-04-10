<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import IconBtn from "~/components/common/IconBtn.vue";
import ProductBadge from "~/components/product/utils/ProductBadge.vue";
import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";

const http = useHttpService()
const utils = useUtils()

let props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

function getRating(rating: number) {
  if (rating == null) return 0
  return rating.toFixed(1)
}

function getProductUrl(product: any) {
  const formattedName = utils.linkNameFormatter(product.title)
  return `/product/${formattedName}--${product.id}`
}

function getFirstImage() {
  return http.getFileUrl(utils.sortImages(props.product.medias).MEDIUM[0]?.url)
}

onMounted(() => {
})
</script>

<template>
  <div class="flex w-full items-center justify-center h-full">
    <div class="flex relative h-full">
      <icon-btn :icon="['far', 'heart']"
                class="absolute z-[1] top-4 right-4 text-mg-800 text-lg hover:bg-gray-100 transition-all duration-300"/>
      <router-link :to="getProductUrl(product)"
                   class="p-2 bg-white rounded-lg relative hover:shadow-xl transition-all duration-300 h-full">
        <flex-col class="gap-2 h-full justify-between">
          <flex-row class="bg-gray-100 justify-center relative items-center rounded-lg">
            <nuxt-img :src="getFirstImage()"
                      densities="x1 x2"
                 class="max-h-72 w-min rounded-lg"
                 loading="lazy"
                 :alt="product.title"/>
            <flex-row class="absolute left-2 bottom-2 gap-2 hidden">
              <product-badge class="bg-mg-200 text-mg-800">
                {{ $t("product.new")}}
              </product-badge>
              <product-badge class="bg-red-200 text-red-700">
                {{ $t("product.new")}}
              </product-badge>
            </flex-row>
          </flex-row>
          <flex-row class="text-mg-900 font-medium">
            {{ product.title }}
          </flex-row>
          <flex-row class="text-xs text-mg-800">
            <nuxt-img :src="http.getFileUrl(product.brand.logo)"
                 class="h-8"
                      densities="x1 x2"
                 loading="lazy"
                 :alt="product.brand.title"/>
          </flex-row>
          <flex-row class="gap-1 items-center text-xs text-gray-500">
            <font-awesome :icon="['fas', 'star']" class="mb-0.5 text-yellow-400"/>
            {{ getRating(product.rating) }}
          </flex-row>
          <flex-row>
            <flex-row class="text-mg-900 font-medium">
              {{ product.discountPrice < product.actualPrice && product.discountPrice > 0 ?
                utils.getPriceWithCurrency(product.discountPrice, product.currency) : utils.getPriceWithCurrency(product.actualPrice, product.currency) }}
            </flex-row>
            <flex-row class="text-xs text-mg-800 line-through" v-if="product.discountPrice > 0">
              {{ product.discountPrice > product.actualPrice ?
                utils.getPriceWithCurrency(product.discountPrice, product.currency) : utils.getPriceWithCurrency(product.actualPrice, product.currency) }}
            </flex-row>
          </flex-row>
          <primary-btn class="w-full">
            {{ $t("product.add_to_cart") }}
          </primary-btn>
        </flex-col>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
