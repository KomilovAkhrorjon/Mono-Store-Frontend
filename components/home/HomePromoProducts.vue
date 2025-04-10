<script setup lang="ts">

import PromoHeader from "~/components/home/util/PromoHeader.vue";

defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <promo-header :text="data['giftCategory'].title"
                :to="data['giftCategory'].link"/>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-sm:grid-cols-2 gap-2">
    <product-card v-for="product in data['products']"
                  :product="product"/>
  </div>
</template>

<style scoped>

</style>
