<script setup lang="ts">

import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import {useUtils} from "~/util/Utils";

const http = useHttpService()
const slides = ref<any>([])
const dataLoaded = ref<boolean>(false)
const util = useUtils()

onMounted(() => {
  loadData()
})

async function loadData(){
  dataLoaded.value = false
  const params = {
    place: 'HOME'
  }
  slides.value = await http.getWithParams(Endpoint.SLIDER, params)
  dataLoaded.value = true
}
</script>

<template>
  <Splide v-if="dataLoaded"
          :options="{ rewind: true , perPage: 1, type: 'loop', gap: 8, }">
    <SplideSlide v-for="slide in slides"
                 :key="slide">
      <router-link :to="slide.link"
                   class="flex rounded-lg w-full items-center text-center justify-center">
        <nuxt-img :src="http.getFileUrl(util.sortImages(slide.mediaList).LARGE[0]?.url)"
             class="w-full h-full object-cover rounded-lg max-h-[30rem]"
                  loading="lazy"
             :title="slide.title"
             :alt="slide.title"/>
      </router-link>
    </SplideSlide>
  </Splide>
</template>

<style>


</style>
