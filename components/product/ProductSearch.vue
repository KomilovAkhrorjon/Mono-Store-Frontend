<script setup lang="ts">

import IconBtn from "~/components/common/IconBtn.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import SearchMenu from "~/components/common/SearchMenu.vue";
import MonoDialog from "~/components/common/MonoDialog.vue";
defineProps({
  outsideDialog: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:openDialog'])
const dialogState = ref(false)

function openDialog() {
  dialogState.value = true
  emits('update:openDialog', dialogState.value)
}
</script>

<template>
  <flex-row class="search-block w-full">
    <input type="text"
           @click="openDialog"
           :placeholder="$t('product.search_for_products')"
           class="border border-gray-300 p-2 w-full rounded-full pr-10">
    <icon-btn :icon="['fas', 'magnifying-glass']"
              clear-bg
              @click="openDialog"
              class="-ml-10 my-0.5 border bg-mg-700 text-white hover:bg-mg-500 transition-all duration-300"/>
  </flex-row>
  <mono-dialog v-model:isOpen="dialogState"
               v-if="!outsideDialog"
               :title="$t('product.search_for_products')"
               @confirm="() => dialogState = false"
               >
    <search-menu/>
  </mono-dialog>
</template>

<style scoped>
.search-block input {
  outline: none;
}

.search-block input:focus {
  outline: none;
}

</style>
