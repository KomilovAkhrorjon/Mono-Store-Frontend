<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";

const props = defineProps({
  rating: {
    type: Object,
    required: true,
  },
  noCount: {
    type: Boolean,
    default: false,
  },
})

function calculateRating() {
  const rating = props['rating'] ? props['rating'] : {rating: 0, reviewCount: 1}
  const butun = Math.floor(rating.rating / rating.reviewCount)
  const yarim = rating.rating / rating.reviewCount - butun > 0.4
  const qoldiq = 5 - butun - (yarim ? 1 : 0)
  return {butun: butun, yarim: yarim, qoldiq: qoldiq}
}
</script>

<template>
  <flex-row class="items-center">
    <font-awesome :icon="['fas', 'star']"
                  class="mb-0.5 text-yellow-400"
                  v-for="_ in calculateRating().butun"/>
    <font-awesome :icon="['fas', 'star-half-stroke']"
                  class="mb-0.5 text-yellow-400"
                  v-if="calculateRating().yarim"/>
    <font-awesome :icon="['far', 'star']"
                  class="mb-0.5 text-yellow-400"
                  v-for="_ in calculateRating().qoldiq"/>
    <div class="px-2" v-if="!noCount">
      {{ rating ? `(${rating['reviewCount']})` : '' }}
    </div>
  </flex-row>
</template>

<style scoped>

</style>
