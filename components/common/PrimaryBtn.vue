<script setup lang="ts">
defineProps({
  clearBg: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: "",
    required: false,
  },
  textLeft: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <router-link v-if="href != ''" :to="href"
     :class="clearBg ? '':'bg-mg-700 text-mg-50 hover:bg-mg-800'"
     class="text-center transition-all duration-300 rounded-lg p-2">
    <slot></slot>
  </router-link>
  <button v-else
     :class="[clearBg ? '':'bg-mg-700 text-mg-50 hover:bg-mg-800', textLeft ? 'text-left':'text-center']"
     class="transition-all duration-300 rounded-lg p-2">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
