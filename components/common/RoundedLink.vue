<script setup lang="ts">

defineProps({
  href: {
    type: String,
    required: true
  },
});
</script>

<template>
  <router-link
      class="rounded-full transition-all hover:bg-mg-300 hover:bg-opacity-30 duration-200 text-mg-900  px-5 py-2"
      :to="href">
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
