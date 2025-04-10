<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import SmBtn from "~/components/common/SmBtn.vue";

let props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  talalPages: {
    type: Number,
    default: 0
  },
  baseUrl: {
    type: String,
    default: ''
  },
  buttonMode: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['setPage'])
const notLastPage = computed(() => props.currentPage <= props.talalPages - 2 && props.talalPages > 3);
const notFirstPage = computed(() => props.currentPage != 1 && props.talalPages > 3 && props.currentPage != 2);

function getDisplayButtons() {
  if (props.talalPages <= 3) {
    return Array.from({length: props.talalPages}, (_, i) => i + 1);
  }
  if (props.currentPage != 1 && props.currentPage != props.talalPages) {
    return [props.currentPage - 1, props.currentPage, props.currentPage + 1];
  }
  if (props.currentPage == 1) {
    return [props.currentPage, props.currentPage + 1, props.currentPage + 2];
  }
  if (props.currentPage == props.talalPages) {
    return [props.currentPage - 2, props.currentPage - 1, props.currentPage];
  }
}

function getLink(page: number) {
  return `${props.baseUrl}?page=${page}`;
}

function setPage(page: number) {
  emit('setPage', page)
}

</script>

<template>
  <flex-row class="justify-center gap-2">
    <sm-btn :to="getLink(currentPage - 1)"
            :button-mode="buttonMode"
            @tap="currentPage != 1 ? setPage( currentPage - 1): null"
            :disabled="currentPage == 1">
      <font-awesome :icon="['fas', 'chevron-left']"/>
      {{ $t('action.back') }}
    </sm-btn>
    <template v-if="notFirstPage">
      <sm-btn :active="1 == currentPage"
              :button-mode="buttonMode"
              @tap="currentPage != 1 ? setPage(1): null"
              :to="getLink(1)">
        1
      </sm-btn>
      ...
    </template>
    <template v-for="i in getDisplayButtons()">
      <sm-btn :to="getLink(i)"
              :button-mode="buttonMode"
              :active="i == currentPage"
              @tap="currentPage != i ? setPage(i): null">
        {{ i }}
      </sm-btn>
    </template>
    <template v-if="notLastPage">
      ...
      <sm-btn :active="props.talalPages == currentPage"
              @tap="currentPage != props.talalPages ? setPage(props.talalPages): null"
              :button-mode="buttonMode"
              :to="getLink(props.talalPages)">
        {{ talalPages }}
      </sm-btn>
    </template>
    <sm-btn :disabled="currentPage == props.talalPages || props.talalPages == 0"
            :button-mode="buttonMode"
            @tap="currentPage != props.talalPages || props.talalPages != 0
             ? setPage(currentPage + 1): null"
            :to="getLink(currentPage + 1)">
      {{ $t('action.next') }}
      <font-awesome :icon="['fas', 'chevron-right']"/>
    </sm-btn>
  </flex-row>
</template>

<style scoped>

</style>
