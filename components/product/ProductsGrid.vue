<script setup lang="ts">
import Grid from "~/components/common/Grid.vue";
import ProductListCard from "~/components/product/ProductListCard.vue";
import FlexCol from "~/components/common/FlexCol.vue";

defineProps({
  products: {
    type: Array<any>,
    required: true
  },
  isList: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <template v-if="!isList">
    <grid
        class="max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-4 gap-2 w-full justify-center">
      <product-card v-for="product in products"
                    :product="product"/>
    </grid>
  </template>
  <template v-else>
    <flex-col class="gap-6 w-full">
      <product-list-card v-for="product in products"
                         :product="product"/>
    </flex-col>
  </template>
</template>

<style scoped>

</style>
