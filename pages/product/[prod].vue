<script setup lang="ts">
import {onMounted, ref} from "vue";
import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import Grid from "~/components/common/Grid.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import IncreseDecreseBtn from "~/components/common/IncreseDecreseBtn.vue";
import ProductPhoto from "~/components/product/ProductPhoto.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import MonoLink from "~/components/common/MonoLink.vue";
import {useUtils} from "~/util/Utils";
import ProductReviews from "~/components/product/ProductReviews.vue";
import CategoryLastproducts from "~/components/product/CategoryLastproducts.vue";
import {useCartService} from "~/util/CartService";

const route = useRoute();
const http = useHttpService();
const util = useUtils();
const productPhotoComponent = ref<any>(null);
const dataLoad = ref(false);
let prod = route.params.prod.toString().split('--');
const productId = parseInt(prod[prod.length - 1]);
const product = ref<any>(await http.get(`${Endpoint.PRODUCT}/${productId}`));
const activeTab = ref('reviews');
let disableMainRelative = useState('disableMainRelative')
let activeIndex = ref(0)
let photoContainer = ref(null)
let selectedOptions = ref<any>([])
let productOptions = ref<any>([])
const cartService = useCartService();
let cart = useState<any>('cartData')

onMounted(async () => {
  await loadData()
});

async function loadData() {

  makeProductOptions()

  dataLoad.value = true
}

function setActiveIndex(index: number) {
  activeIndex.value = index
  productPhotoComponent.value?.setActiveIndex(index);
}

function getSortedImages() {
  return util.sortImages(product.value['media'])
}

function makeProductOptions() {
  const result = util.getProductOptions(product.value['specifications']);
  productOptions.value = result
  selectedOptions.value = result.map((option: any) => {
    return {categoryId: option.id, id: option.specifications[0].id}
  })
}

function isSelected(categoryId: number, id: number) {
  return selectedOptions.value.find((option: any) => option.categoryId === categoryId && option.id === id)
}

function selectOption(categoryId: number, id: number) {
  const index = selectedOptions.value.findIndex((option: any) => option.categoryId === categoryId)
  selectedOptions.value[index].id = id
}

function getSku() {

  if (product.value["skuList"].length === 1) {
    return product.value["skuList"][0]
  }

  const singleOptions = util.getSingleProductOptions(product.value['specifications']);

  const result = product.value["skuList"].filter((sku: any) => {
    const sortedSku = [...sku.specifications.sort((a: any, b: any) => a.id - b.id)]
    const selectedSpecification = selectedOptions.value
    .map((option: any) => option.id)
    .concat(singleOptions.map((option: any) => option.specifications[0].id))
    .sort((a: any, b: any) => a - b)
    return sortedSku.every((value, index) => value === selectedSpecification[index]) && sortedSku.length === selectedSpecification.length
  })

  return result[0]
}

function addToCart(count: string) {
  const sku = getSku()
  cartService.addToCart(sku.id, parseInt(count))
}


function getSkuCount() {

  if (!cart.value) {
    return '1'
  }

  const result = cart.value.filter((item: any) => item.sku.id === getSku().id)

  if (result.length > 0) {
    return result[0].sku.quantity
  }

  return '1'
}

useServerSeoMeta({
  ogTitle: () => `${product.value?.title} - Monostore.uz (${product.value?.id})`,
  title: () => `${product.value?.title} - Monostore.uz (${product.value?.id})`,
  description: () => product.value.description.shortDescription,
  ogDescription: () => product.value.description.shortDescription,
  ogImage: () => http.fileServerUrl + getSortedImages()?.SMALL[0].url,
  ogImageUrl: () => http.fileServerUrl + getSortedImages()?.SMALL[0].url,
  twitterCard: () => 'summary_large_image',
  twitterTitle: () => `${product.value?.title} - Monostore.uz (${product.value?.id})`,
  twitterDescription: () => product.value.description.shortDescription,
  twitterImage: () => http.fileServerUrl + getSortedImages()?.SMALL[0].url
})

</script>

<template>
  <flex-row class="w-full bg-white rounded-xl p-4" v-if="dataLoad">
    <!--    <product-seo :product="product" :selected-sku="getSku()"/>-->
    <flex-col class="gap-4">
      <div class="grid max-md:grid-cols-1 grid-cols-2 gap-6 w-full">
        <flex-col class="gap-4">
          <div class="grid grid-cols-12 gap-2 top-0"
               :class="disableMainRelative ? '':'sticky'">
            <div class="col-span-12">
              <flex-row class="text-gray-400 text-md transition-all delay-300 mt-4 mb-6">
                <mono-link to="/public">
                  {{ $t('home.home') }}
                </mono-link>
                <template v-for="category in util.getCategoryInheritance(product['category'])"
                          :key="category">
                  &nbsp;/&nbsp;
                  <mono-link :to="util.generateCategoryLink(category)">
                    {{ category.title }}
                  </mono-link>
                </template>
              </flex-row>
            </div>
            <flex-col class="p-2 overflow-y-scroll w-auto gap-2 col-span-2 max-h-[37rem]">
              <button v-for="(image, index) in getSortedImages().SMALL"
                      :class="activeIndex === index ? 'border-2 border-mg-700 p-[1px] rounded-lg' : ''"
                      @click="setActiveIndex(index)">
                <nuxt-img :src="http.fileServerUrl + image.url"
                          class="shadow-sm rounded-lg"
                          loading="lazy"
                          :alt="product.title"/>
              </button>
            </flex-col>
            <div class="flex col-span-10" ref="photoContainer">
              <product-photo :images="getSortedImages()"
                             @set-index="setActiveIndex"
                             ref="productPhotoComponent"/>
            </div>
          </div>
        </flex-col>
        <flex-col class="gap-4">
          <flex-row class="text-mg-900 text-3xl font-semibold">
            {{ product.title }}
          </flex-row>
          <product-rating :rating="product['rating']"/>
          <flex-row class="w-full justify-start col-span-12">
            <router-link to="/public"
                         class="hover:drop-shadow-xl rounded-lg transition-all bg-white shadow-violet-900">
              <nuxt-img :src="http.fileServerUrl + product['brand']['logo']"
                        :alt="product['brand']['title']"
                        loading="lazy"
                        class="max-h-12 rounded-lg"/>
            </router-link>
          </flex-row>
          <flex-row class="w-full"
                    v-if="productOptions.length">
            <flex-col class="w-full p-4 bg-teal-50 rounded-xl">
              <flex-row class="text-mg-700 pb-4 font-semibold text-lg">
                {{ $t('product.options') }}
              </flex-row>
              <div v-for="option in productOptions"
                   class="grid grid-cols-2 justify-start w-full items-center border-b last:border-b-0 gap-4">
                <div class="text-mg-900">
                  {{ option.title }}:
                </div>
                <div class="flex p-0.5 gap-2">
                  <button v-for="opt in option.specifications"
                          @click="selectOption(option.id, opt.id)"
                          :class="isSelected(option.id, opt.id) ? 'bg-violet-800 text-white':'bg-white text-violet-800'"
                          class="transition-all duration-200 px-4 py-2 rounded-md text-sm hover:bg-violet-600 hover:text-white">
                    {{ opt.title }}
                  </button>
                </div>
              </div>
            </flex-col>
          </flex-row>
          <flex-row class="gap-2">
          <span class=" text-mg-900">
            SKU:
          </span>
            <span class="text-gray-400">
            {{ getSku().sku }}
          </span>
          </flex-row>
          <flex-row class="text-4xl text-mg-800 font-semibold">
            {{
              util.getPriceWithCurrency(getSku().discount ? getSku().discount : getSku().price, product.currency)
            }}
            <flex-row class="text-sm line-through text-violet-600" v-if="getSku().discount">
              {{ util.getPriceWithCurrency(getSku().price, product.currency) }}
            </flex-row>
          </flex-row>
          <flex-row class="gap-4 w-full border-b pb-4">
            <flex-col class="h-full">
              <increse-decrese-btn :count="getSkuCount()"
                                   @updates="addToCart"/>
            </flex-col>
            <flex-col class="w-full">
              <primary-btn @click="addToCart(getSkuCount())"
                           class="w-full">
                {{ $t('product.add_to_cart') }}
              </primary-btn>
            </flex-col>
            <flex-col class="w-full">
              <primary-btn clear-bg class="w-full bg-violet-600 text-white hover:bg-violet-800">
                {{ $t('product.buy_now') }}
              </primary-btn>
            </flex-col>
          </flex-row>
          <flex-row class="justify-between">
            <flex-row>
              <button
                  class="flex flex-row items-center text-gray-700 text-xl hover:text-mg-700 transition-all gap-2 font-semibold">
                <font-awesome :icon="['far', 'heart']"/>
                {{ $t('product.add_to_wishlist') }}
              </button>
            </flex-row>
            <flex-row class="gap-2 text-xl font-semibold text-gray-700 items-center">
              {{ $t("action.share") }}:
              <a href="javascript:void(0)"
                 class="flex flex-row items-center text-gray-700 hover:text-mg-700 transition-all gap-2 font-semibold">
                <font-awesome :icon="['fab', 'telegram']"/>
              </a>
              <a href="javascript:void(0)"
                 class="flex flex-row items-center text-gray-700 hover:text-mg-700 transition-all gap-2 font-semibold">
                <font-awesome :icon="['fab', 'instagram']"/>
              </a>
              <a href="javascript:void(0)"
                 class="flex flex-row items-center text-gray-700 hover:text-mg-700 transition-all gap-2 font-semibold">
                <font-awesome :icon="['fas', 'link']"/>
              </a>
            </flex-row>
          </flex-row>
          <flex-row class="p-4 bg-gray-50 rounded-xl"
                    v-if="product['attributes'].length">
            <flex-col class="w-full gap-4">
              <ul>
                <li v-for="attribute in product['attributes']"
                    class="text-sm text-mg-900 list-disc ml-4">
                  {{ attribute }}
                </li>
              </ul>
            </flex-col>
          </flex-row>
        </flex-col>
      </div>
    </flex-col>
  </flex-row>
  <flex-row class="w-full mt-4 py-4 relative" v-if="dataLoad">
    <grid class="grid-cols-8 w-full gap-4 max-md:grid-cols-1 relative">
      <mono-card class="w-full col-span-5 max-md:col-span-1 items-center">
        <div v-html="product['description'].description"></div>
      </mono-card>
      <flex-col class="w-full col-span-3 gap-4 max-md:col-span-1">
        <flex-col class="sticky top-14 gap-4">
          <mono-card class="w-full h-fit col-span-3 max-md:col-span-1 gap-3">
            <flex-row class="text-mg-700 font-semibold text-lg">
              {{ $t('product.specifications') }}
            </flex-row>
            <flex-row class="justify-between"
                      v-for="specification in util.sortSpecifications(product['specifications'])">
              <flex-row class="font-light text-gray-900">
                {{ specification.title }}
              </flex-row>
              <flex-row class="text-mg-900 gap-2">
                <a :href="'javascript:void(0)'"
                   class="border-r-2 pr-2 last:border-r-0"
                   v-for="spec in specification.specifications">
                  {{ spec.title }}
                </a>
              </flex-row>
            </flex-row>
          </mono-card>
          <mono-card class="w-full h-fit col-span-3 max-md:col-span-1 gap-3">
            <flex-row class="text-mg-700 font-semibold text-lg">
              {{ $t('product.features') }}
            </flex-row>
            <flex-row class="justify-between" v-for="feature in product['features']">
              <flex-row class="text-mg-900">
                <a :href="'javascript:void(0)'">
                  {{ feature.title }}
                </a>
              </flex-row>
            </flex-row>
          </mono-card>
        </flex-col>
      </flex-col>
    </grid>
  </flex-row>
  <flex-row class="mt-4 p-4 gap-2">
    <flex-col class="">
      <flex-row>
        <button @click="activeTab = 'reviews'"
                :class="activeTab == 'reviews' ? 'text-mg-700':'text-mg-900'"
                class="p-2 hover:text-mg-700 transition-all duration-300">
          {{ $t('product.reviews') }}
        </button>
        <button @click="activeTab = 'qa'"
                :class="activeTab == 'qa' ? 'text-mg-700':'text-mg-900'"
                class="p-2 hover:text-mg-700 transition-all duration-300">
          {{ $t('product.q_and_a') }}
        </button>
      </flex-row>
      <flex-row class="px-2 transition-all duration-300"
                :class="activeTab != 'reviews' ? 'justify-end':''">
        <flex-row class="px-8 py-0.5 bg-mg-700 rounded-full transition-all"
                  :class="activeTab == 'qa' ? 'px-6':''"></flex-row>
      </flex-row>
    </flex-col>
  </flex-row>
  <flex-row v-if="activeTab == 'reviews' && dataLoad">
    <product-reviews :product="product"/>
  </flex-row>
  <flex-row v-if="activeTab == 'qa' && dataLoad">
    <product-questions :product="product"/>
  </flex-row>
  <flex-row class="w-full mt-6" v-if="dataLoad">
    <category-lastproducts :category="product.category"/>
  </flex-row>
</template>

<style scoped>

/* Common scrollbar styles */
::-webkit-scrollbar {
  width: 4px; /* Vertical scrollbar width */
  height: 4px; /* Horizontal scrollbar height */
}

/* Track (background of the scrollbar) */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle (the draggable thumb) */
::-webkit-scrollbar-thumb {
  background: #cfcfcf;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  transition: background 0.3s ease;
}
</style>
<style>
.ql-size-huge {
  font-size: 2.5em;
}
</style>
