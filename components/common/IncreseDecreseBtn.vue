<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";

let props = defineProps({
  count: {
    type: String,
    required: true
  }
});
const cnt = ref(props.count);
const emit = defineEmits(['updates']);

function filterCount() {
  cnt.value = cnt.value.replace(/[^0-9]/g, '');
  emitChange()
}

function increment() {
  cnt.value = (parseInt(cnt.value) + 1).toString();
  emitChange()
}

function decrement() {
  if (parseInt(cnt.value) > 1) {
    cnt.value = (parseInt(cnt.value) - 1).toString();
    emitChange()
  }
}

function emitChange() {
  emit('updates', cnt.value);
}
</script>

<template>
  <flex-row class="h-full">
    <button @click="decrement"
            class="border-t border-b border-l rounded-l-md px-2 hover:bg-mg-700 hover:text-white transition-all duration-300">
      -
    </button>
    <input v-model="cnt"
           @input="filterCount"
           class="w-8 border text-sm text-center" type="text">
    <button @click="increment"
            class="border-r border-t border-b px-2 rounded-r-md hover:bg-mg-700 hover:text-white transition-all duration-300">
      +
    </button>
  </flex-row>
</template>

<style scoped>
.h-full input:focus {
  outline: none;
}

.h-full input:focus-visible {
  outline: none;
}

.h-full input {
  text-align: center;
}
</style>
