<script setup lang="ts">
import Grid from "~/components/common/Grid.vue";

defineProps({
  products: {
    type: Array<any>,
    required: true
  }
})
</script>

<template>
  <grid class="max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-4 gap-2 w-full justify-center">
    <product-card v-for="product in products"
                  :product="product"/>
  </grid>
</template>

<style scoped>

</style>
