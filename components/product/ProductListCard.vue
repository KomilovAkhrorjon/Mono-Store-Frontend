<script setup lang="ts">
import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";
import SkuInfo from "~/components/common/SkuInfo.vue";
import {useBuilderStore} from "~/stores/PcBuilderStore";

const http = useHttpService()
const utils = useUtils()
const router = useRouter()
const route = useRoute();

let props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const builderStore = useBuilderStore();

function getRating(rating: number) {
  if (rating == null) return 0
  return rating.toFixed(1)
}

function getProductUrl(product: any): string {
  const formattedName = utils.linkNameFormatter(product.title)
  return `/product/${formattedName}--${product.id}`
}

function getFirstImage() {
  return http.getFileUrl(utils.sortImages(props.product.medias).SMALL[0]?.url)
}

function addTo(id: number) {
  const buildId = parseInt(route.params.id.toString())
  // if (!builderStore.isAdded(id))
  builderStore.addComponent(id, buildId)
}

onMounted(() => {
})
</script>

<template>
  <flex-row
      class="w-full items-start justify-between p-3 bg-white rounded-lg relative hover:shadow-xl transition-all duration-300 h-full gap-4">
    <flex-row class="gap-4 cursor-pointer w-full" @click="router.push(getProductUrl(product))">
      <flex-row class="bg-gray-100 justify-center relative items-center rounded-lg">
        <nuxt-img :src="getFirstImage()"
                  class="shadow-sm rounded-md max-w-24"
                  loading="lazy"
                  :title="product.title"
                  :alt="product.title"/>
      </flex-row>
      <flex-row class="text-mg-900 font-medium">
        <flex-col class="gap-2">
          <flex-row class="text-mg-900 font-semibold">
            {{ product.title }}
          </flex-row>
          <div class="flex flex-wrap text-sm">
            <template v-for="specification in product.specifications"
                      :key="specification">
              <sku-info :specification="specification"/>
            </template>
          </div>
        </flex-col>
      </flex-row>
    </flex-row>
    <flex-row class="gap-3 h-full text-nowrap">
      <flex-col class="gap-2">
        <flex-row class="text-xs text-mg-800 justify-end">
          <nuxt-img :src="http.getFileUrl(product.brand.logo)"
                    class="h-8"
                    densities="x1 x2"
                    loading="lazy"
                    :alt="product.brand.title"/>
        </flex-row>
        <flex-row class="gap-1 items-center text-xs text-gray-500 justify-end">
          <font-awesome :icon="['fas', 'star']" class="mb-0.5 text-yellow-400"/>
          {{ getRating(product.rating) }}
        </flex-row>
        <flex-row class="justify-end text-end">
          <flex-row class="text-mg-900 font-medium">
            {{
              product.discountPrice < product.actualPrice && product.discountPrice > 0 ?
                  utils.getPriceWithCurrency(product.discountPrice, product.currency) : utils.getPriceWithCurrency(product.actualPrice, product.currency)
            }}
          </flex-row>
          <flex-row class="text-xs text-mg-800 line-through" v-if="product.discountPrice > 0">
            {{
              product.discountPrice > product.actualPrice ?
                  utils.getPriceWithCurrency(product.discountPrice, product.currency) : utils.getPriceWithCurrency(product.actualPrice, product.currency)
            }}
          </flex-row>
        </flex-row>
      </flex-col>
      <flex-col class="justify-center h-full">
        <primary-btn class=""
                     @click="addTo(product.currentSkuId)">
          {{ !builderStore.isAdded(product.currentSkuId) ? $t("action.add") : $t('action.remove') }}
        </primary-btn>
      </flex-col>
    </flex-row>
  </flex-row>
</template>

<style scoped>

</style>
