<script setup lang="ts">
defineProps({
  specification: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <span class="text-gray-500">
    {{ specification.categoryTitle }}:
  </span>
  <span class="text-mg-800 mr-2">
     {{ specification.title }}
  </span>
</template>

<style scoped>

</style>
