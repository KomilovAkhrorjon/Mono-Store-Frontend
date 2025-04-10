<script setup lang="ts">

defineProps({
  to: {
    type: String,
    required: true
  }
});

</script>

<template>
  <router-link :to="to"
               class="min-w-32 px-4 transition-all duration-300 text-mg-900 hover:bg-gray-200 hover:text-mg-800 rounded-lg whitespace-nowrap py-2 text-sm w-full">
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
