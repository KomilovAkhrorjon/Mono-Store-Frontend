<script setup lang="ts">

import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import FlexRow from "~/components/common/FlexRow.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import PromoHeader from "~/components/home/util/PromoHeader.vue";
import {useUtils} from "~/util/Utils";

let props = defineProps({
  category: {
    type: Object,
    required: true
  }
})
const http = useHttpService()
const dataLoaded = ref<boolean>(false)
const products = ref<any>(null)
const util = useUtils()

onMounted(() => {
  loadData()
})

async function loadData() {
  dataLoaded.value = false
  const prams = {
    categoryId: props.category.id,
    size: 10,
    page: 0,
    sort: 'createdAt,ASC'
  }

  const response = await http.getWithParams(Endpoint.PRODUCT, prams)
  products.value = response?.content
  dataLoaded.value = true
}

</script>

<template>
  <mono-card class="w-full gap-4">
    <promo-header :text="category['title']" :to="util.generateCategoryLink(category)"/>
    <flex-row class="w-full justify-center">
      <Splide
          class="flex flex-auto overflow-hidden"
          :options="{ rewind: true, gap: 8,
        breakpoints: {
          99999: {
            perPage: 5,
          },
          1440: {
            perPage: 5
          },
          1160: {
            perPage: 4,
          },
          990: {
            perPage: 3,
          },
         720: {
            perPage: 2,
          },
        },}">
        <SplideSlide v-for="product in products" class="flex flex-auto h-auto pb-7">
          <product-card :product="product" class="drop-shadow-sm"/>
        </SplideSlide>
      </Splide>
    </flex-row>
  </mono-card>
</template>

<style scoped>

</style>
