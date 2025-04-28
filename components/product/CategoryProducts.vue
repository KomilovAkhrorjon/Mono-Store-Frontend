<script setup lang="ts">

import MonoDialog from "~/components/common/MonoDialog.vue";
import ProductFilters from "~/components/product/ProductFilters.vue";
import IconBtn from "~/components/common/IconBtn.vue";
import CustomSelect from "~/components/common/CustomSelect.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import ProductsGrid from "~/components/product/ProductsGrid.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import MonoLink from "~/components/common/MonoLink.vue";
import {useUtils} from "~/util/Utils";
import Pageble from "~/components/common/Pageble.vue";

let props = defineProps({
  category: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    default: 0
  },
  isList: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    default: () => ({})
  }
});

const filterMenu = ref(false);
const http = useHttpService();
const route = useRoute();
const dataLoading = ref(false);
const products = ref<Array<any>>([]);
const currentCategory = ref<any>({});
const util = useUtils();
const categoryInstance = ref<Array<any>>({});
const pageResult = ref<any>({totalPages: 0, number: 0});
const page = ref<number>(route.query.page ? parseInt(route.query.page.toString()) - 1 : 0);
const pageable = ref<any>({page: page.value});

onMounted(async () => {
  await getProducts()
  await nextTick();
});

async function getProducts() {

  dataLoading.value = true;

  pageable.value.page = route.query.page ? parseInt(route.query.page.toString()) - 1 : 0;

  let params = <any>{
    page: 0,
    ...pageable.value,
    ...props.filters,
  }

  if (props.category) {
    params['categoryId'] = props.category;
  }

  const response = await http.getWithParams(Endpoint.PRODUCT, params);
  products.value = response?.content;
  pageResult.value.number = response?.number;
  pageResult.value.totalPages = response?.totalPages;

  const category = await http.get(`${Endpoint.CATEGORY}/${props.category}`);
  currentCategory.value = category;
  categoryInstance.value = util.getCategoryInheritance(category);

  dataLoading.value = false;
}

onBeforeUnmount(() => {
  dataLoading.value = false;
})

watch(route, async () => {
  await getProducts();
})
watch(() => props.category, async () => {
  await getProducts();
})
</script>

<template>
  <flex-row class="text-gray-400 text-md transition-all delay-300 pl-4"
            v-show="!dataLoading">
    <mono-link to="/">
      {{ $t('home.home') }}
    </mono-link>
    <template v-for="category in categoryInstance"
              :key="category">
      &nbsp;/&nbsp;
      <mono-link :to="util.generateCategoryLink(category)">
        {{ category.title }}
      </mono-link>
    </template>
  </flex-row>
  <flex-row class="gap-2 py-2 transition-all delay-300"
            v-show="!dataLoading">
    <mono-card class="gap-2 transition-all delay-300 max-md:hidden h-fit sticky top-14">
      <product-filters :category="currentCategory"
                       :category-instance="categoryInstance"/>
    </mono-card>
    <flex-col class="gap-4 w-full">
      <flex-row class="text-mg-900 text-xl items-center justify-between">
        <flex-row class="items-center pl-4">
          {{ currentCategory.title }}
        </flex-row>
        <flex-row class="items-center max-md:hidden hidden">
          <custom-select/>
        </flex-row>
        <flex-row class="md:hidden">
          <button @click="filterMenu = !filterMenu" class="px-4 rounded-lg bg-white">
            <font-awesome :icon="['fas', 'arrow-down-wide-short']"/>
            {{ $t('product.filters') }}
          </button>
        </flex-row>
      </flex-row>
      <flex-row class="w-full">
        <products-grid v-show="!dataLoading"
                       :is-list="props.isList"
                       :products="products"/>
      </flex-row>
      <pageble :current-page="pageResult.number + 1"
               :talal-pages="pageResult.totalPages"/>
    </flex-col>
  </flex-row>
  <mono-dialog v-model:isOpen="filterMenu"
               @confirm="filterMenu = false"
               clear-mode
               title="Product filters">
    <mono-card
        class="relative gap-2 transition-all delay-300 min-w-96 max-h-screen overflow-y-scroll py-14 ">
      <flex-row class="fixed top-4 bg-white justify-between min-w-80 text-mg-900 text-xl">
        {{ $t('product.filters') }}
      </flex-row>
      <icon-btn :icon="['fas', 'xmark']"
                class="text-mg-900 absolute top-3 right-4"
                @click="filterMenu = false"/>
      <product-filters with-sort
                       :category="currentCategory"
                       :category-instance="categoryInstance"/>
      <flex-row class="fixed bottom-2 gap-4 min-w-80 justify-between">
        <primary-btn class="px-8  w-full">
          <font-awesome :icon="['fas', 'arrow-down-wide-short']"/>
          {{ $t('product.filters') }}
        </primary-btn>
        <primary-btn clear-bg
                     @click="filterMenu = false"
                     class="px-8 w-full bg-violet-700 text-white ">
          {{ $t('action.close')}}
        </primary-btn>
      </flex-row>
    </mono-card>
  </mono-dialog>
</template>

<style scoped>

</style>
