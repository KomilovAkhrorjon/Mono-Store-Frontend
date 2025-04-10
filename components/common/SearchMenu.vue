<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import IconBtn from "~/components/common/IconBtn.vue";

const searchText = ref('1');
const searchInput = ref(null);

function getCount() {
  if (searchText.value === '') return 0;
  return parseInt(searchText.value);
}

onMounted(() => {
  searchInput.value?.focus();
});

</script>

<template>
  <flex-col
      class="mt-11 gap-2 w-full bg-gray-100 p-4 rounded-xl transition-all duration-300 md:min-w-[30vw]">
    <flex-row class="w-full justify-between h-full items-center">
      <flex-row class="text-mg-900 text-xl font-semibold">
        {{ $t('product.search') }}
      </flex-row>
      <flex-row>
        <icon-btn :icon="['fas', 'xmark']" class="px-0.5" @click="$emit('closeDialog')"/>
      </flex-row>
    </flex-row>
    <flex-row class="search-block">
      <input type="text"
             ref="searchInput"
             v-model="searchText"
             placeholder="Search for products"
             class="border border-gray-300 p-2 w-full rounded-full pr-10">
      <icon-btn :icon="['fas', 'magnifying-glass']"
                clear-bg
                class="-ml-10 my-0.5 border bg-mg-700 text-white hover:bg-mg-500 transition-all duration-300"/>
    </flex-row>
    <flex-col class="max-h-[60vh] gap-2 overflow-y-scroll w-full -mr-1">
      <flex-row class="w-full" v-for="() in getCount()">
        <router-link to="/products/Searched-Prod--2123"
                     @click="$emit('closeDialog')"
                     class="flex flex-row content-center items-center
                    w-full rounded-lg p-1 gap-2 bg-white hover:bg-mg-100 pr-2
                    transition-all duration-300 hover:drop-shadow-md justify-between">
          <flex-row class="text-mg-900 items-center gap-2 rounded-lg">
            <nuxt-img src="https://images.uzum.uz/ck1descvutvccfo27mn0/original.jpg"
                      loading="lazy"
                 class="max-h-12 rounded-md"/>
            Result dasda
          </flex-row>
          <div class="text-mg-800 font-semibold text-sm">
            $100
          </div>
        </router-link>
      </flex-row>
    </flex-col>
  </flex-col>
</template>

<style scoped>
.search-block input {
  outline: none;
}

.search-block input:focus {
  outline: none;
}
</style>
