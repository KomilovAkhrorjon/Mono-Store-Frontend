<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";

defineProps({
  bg: {
    type: String,
    default: 'bg-white'
  }
})

</script>

<template>
  <flex-col class="p-4 rounded-xl" :class="bg">
    <slot></slot>
  </flex-col>
</template>

<style scoped>

</style>
