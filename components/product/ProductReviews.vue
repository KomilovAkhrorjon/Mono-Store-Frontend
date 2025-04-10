<script setup lang="ts">

import Grid from "~/components/common/Grid.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import Pageble from "~/components/common/Pageble.vue";

let props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const http = useHttpService();
const reviews = ref<any>([]);
const dataLoaded = ref(false);
const pageable = ref<any>({page: 0, size: 11});
const totalPages = ref(0);

onMounted(async () => {
  await loadData();
});

async function loadData(){
  dataLoaded.value = false;
  const response = await http.getWithParams(Endpoint.PRODUCT_REVIEW, {
    productId: props.product.id,
    ...pageable.value});
  reviews.value = response?.content;
  totalPages.value = response?.totalPages;
  pageable.value.page = response?.number;
  dataLoaded.value = true;
}

async function setPage(page: number) {
  console.log(123)
  pageable.value.page = page - 1
  await loadData();
}
</script>

<template>
  <mono-card class="w-full gap-4 p-4">
    <flex-row class="col-span-2 max-md:col-span-1 text-xl font-medium text-mg-900">
      {{ $t('review.customer_reviews') }}
    </flex-row>
    <grid class="grid-cols-2 max-md:grid-cols-1 gap-6">
      <flex-col class="w-full justify-center">
        <flex-row class="w-full justify-center text-5xl text-mg-900 font-normal">
          {{ product['rating'] != null ? product['rating']['reviewCount'] : 0}}
        </flex-row>
        <product-rating class="justify-center"
                        :rating="product['rating']"/>
        <flex-row>
          {{ $t('review.write_review') }}
        </flex-row>
        <flex-row>
          <textarea class="border w-full rounded-xl min-h-36 p-4"/>
        </flex-row>
        <flex-row class="mt-4 w-full justify-between items-center content-center">
          <flex-row>
            <button>
              <font-awesome :icon="['far', 'star']" class="mb-0.5 text-yellow-400"/>
            </button>
            <button>
              <font-awesome :icon="['far', 'star']" class="mb-0.5 text-yellow-400"/>
            </button>
            <button>
              <font-awesome :icon="['far', 'star']" class="mb-0.5 text-yellow-400"/>
            </button>
            <button>
              <font-awesome :icon="['far', 'star']" class="mb-0.5 text-yellow-400"/>
            </button>
            <button>
              <font-awesome :icon="['far', 'star']" class="mb-0.5 text-yellow-400"/>
            </button>
          </flex-row>
          <button class="bg-mg-700 hover:bg-mg-400 transition-all duration-300 text-white rounded-xl p-2 px-6">
            {{ $t('action.submit') }}
          </button>
        </flex-row>
      </flex-col>
      <template v-if="dataLoaded">
        <flex-col class="h-full bg-gray-50 rounded-xl p-4 gap-4" v-for="review in reviews">
          <flex-row class="w-full justify-between">
            <flex-row class="text-mg-800">
              {{ review.user.firstName }} {{ review.user.lastName }}
            </flex-row>
            <flex-row class="text-gray-500">
              {{ review.createdAt.split('T')[0] }}
            </flex-row>
          </flex-row>
          <product-rating
              no-count
              :rating="{rating: review.rating, reviewCount: 1}"/>
          <flex-row class="text-mg-900">
            {{ review.comment }}
          </flex-row>
        </flex-col>
      </template>
    </grid>
    <pageble :current-page="pageable.page + 1"
             @setPage="setPage"
             button-mode
             :talal-pages="totalPages"/>
  </mono-card>
</template>

<style scoped>

</style>
