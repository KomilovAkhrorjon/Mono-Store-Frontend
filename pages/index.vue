<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import MainSlider from "~/components/home/MainSlider.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";

const http = useHttpService();
const data = ref<any>(null);
const dataLoading = ref<boolean>(false);
let authState = useState('authState');
const route = useRoute();

onMounted(() => {
  dataLoad()
  authState.value = !!localStorage.getItem('token');

  console.log(route.params);
})

async function dataLoad() {
  dataLoading.value = true
  const result:any = await http.get(Endpoint.HOME_PRODUCTS)
  data.value = result.sort((a:any, b:any) => a['giftCategory'].orderNo - b['giftCategory'].orderNo)
  dataLoading.value = false
}

useHead({
  title: 'Monostore - Eelektronika do‘koni',
  meta: [
    { name: 'description', content: 'Eng yaxshi mahsulotlarni bizning do‘kondan xarid qiling.' },
    { name: 'keywords', content: 'online shop, e-commerce, buy, sale, electronics, electronic' },
    { property: 'og:title', content: 'Monostore.uz' },
    { property: 'og:description', content: 'Eng yaxshi mahsulotlarni bizning do‘kondan xarid qiling.' },
    { property: 'og:image', content: '/shop-banner.jpg' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<template>
  <flex-col class="gap-6">
    <flex-row class="w-full">
      <main-slider class="w-full"/>
    </flex-row>
    <template v-if="!dataLoading">
      <home-promo-products v-for="d in data" :data="d"/>
    </template>
  </flex-col>
</template>

<style scoped>

</style>
