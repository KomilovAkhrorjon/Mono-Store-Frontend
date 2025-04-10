<script setup lang="ts">

defineProps({
  to: {
    type: String,
    required: true
  }
})

</script>

<template>
  <router-link :to="to"
               class="hover:text-mg-800 transition-all">
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>
