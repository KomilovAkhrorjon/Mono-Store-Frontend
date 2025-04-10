<script setup lang="ts">

defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

</script>

<template>
  <router-link :to="to">
    {{ text }}
  </router-link>
</template>

<style scoped>

</style>
