<script setup lang="ts">

defineProps({
  to: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  buttonMode: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <button v-if="buttonMode && !disabled"
          @click="$emit('tap')"
          :class="active ? 'border border-mg-700' : ''"
          class="px-2.5 py-1 bg-white rounded-lg active:shadow-lg shadow-mg-900 text-mg-900 transition-all">
    <slot></slot>
  </button>
  <router-link :to="to"
               v-if="!disabled && !buttonMode"
               :class="active ? 'border border-mg-700' : ''"
               class="px-2.5 py-1 bg-white rounded-lg active:shadow-lg shadow-mg-900 text-mg-900 transition-all">
    <slot></slot>
  </router-link>
  <button v-if="disabled"
          class="px-2.5 py-1 bg-white rounded-lg text-gray-500 transition-all">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
