<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import {ref} from "vue";
import {useHttpService} from "~/util/HttpService";

const props = defineProps({
  images: {
    type: Object,
    required: true
  }
})
const http = useHttpService();
const emit = defineEmits(['setIndex'])
const photoView = ref(false)
const splide = ref(null);
const currentIndex = ref(0);
let disableMainRelative = useState('disableMainRelative')

function setActiveIndex(index: number): void {
  if (splide.value && splide.value.splide) {
    splide.value.splide.go(index);
  }
}

function openPhoto(index: number) {
  if (photoView.value) {
    setActiveIndex(index)
    photoView.value = false
    disableMainRelative.value = false
    document.body.style.overflow = "auto"
  } else {
    currentIndex.value = index
    photoView.value = true
    document.body.style.overflow = "hidden"
    disableMainRelative.value = true
  }
}

function splideAction(event: any) {
  currentIndex.value = event.index
  emit('setIndex', event.index)
}

defineExpose({
  setActiveIndex
});
</script>

<template>
  <flex-col v-if="photoView"
            class="z-90 top-0 h-[100vh] left-0 w-full fixed bg-black bg-opacity-90">
    <Splide
        class="justify-center w-full flex content-center h-full"
        :options="{ rewind: true, perPage: 1, type: 'loop', gap: 8, start: currentIndex}">
      <SplideSlide v-for="(image, index) in images.ORIGINAL"
                   class="flex flex-col items-center content-center rounded-xl justify-center"
                   @click="openPhoto(index)">
        <nuxt-img :src="http.fileServerUrl + image.url"
                  loading="lazy"
             alt="Sample 1"
             class="rounded-xl max-h-[90%] max-sm:h-auto"/>
      </SplideSlide>
    </Splide>
  </flex-col>
  <flex-col class="col-span-10">
    <Splide
        ref="splide"
        @splide:moved="splideAction"
        class="justify-center w-full content-center h-fit"
        :options="{ rewind: true, perPage: 1, gap: 8,}">
      <SplideSlide v-for="(image, index) in images.LARGE"
                   class="flex flex-col items-center w-full content-center rounded-xl justify-center"
                   @click="openPhoto(index)">
        <nuxt-img :src="http.fileServerUrl + image.url"
                  loading="lazy"
             alt="Sample 1"
             class="rounded-xl max-h-[37rem]"/>
      </SplideSlide>
    </Splide>
  </flex-col>
</template>

<style scoped>

</style>
