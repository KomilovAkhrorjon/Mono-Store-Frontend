<script setup lang="ts">

defineProps({
  to: {
    type: String,
    required: true
  }
});

</script>

<template>
  <div>
    <router-link :to="to"
       class="rounded-full transition-all bg-mg-200 duration-200 hover:bg-mg-300 text-mg-900  px-5 py-2">
      <slot></slot>
    </router-link>
  </div>
</template>

<style scoped>

</style>
