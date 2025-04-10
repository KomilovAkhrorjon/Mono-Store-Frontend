<template>
  <div class="rounded-lg shadow-sm border text-sm">
    <button @click="$emit('update:open')"
            class="w-full flex justify-between items-center py-1 px-4 text-mg-900">
      <span>
        {{ text }}
      </span>
      <font-awesome :icon="['fas', 'chevron-up']"
                    class="transition-all duration-300"
                    :class="open ? '':'-rotate-180'"/>
    </button>
    <div :style="{'max-height': open ? '100px':'0'}"
         class="overflow-hidden transition-all duration-300 ease-in-out px-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>

defineProps({
  open: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>

</style>
