<script setup lang="ts">
import FlexRow from "~/components/common/FlexRow.vue";

defineProps({
  icon: {
    type: Array,
    required: true
  },
  clearBg: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button class="rounded-full transition-all" :class="clearBg ? '':'bg-white hover:shadow-lg'">
    <flex-row class="p-2.5">
      <font-awesome :icon="icon"/>
    </flex-row>
  </button>
</template>

<style scoped>

</style>
