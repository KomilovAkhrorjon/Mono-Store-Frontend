<script setup lang="ts">

const selectedValue = ref("");
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
</script>
<template>
  <div class="w-full max-w-lg mx-auto">
    <div class="flex flex-row relative">
      <select
          id="select"
          v-model="selectedValue"
          class="block appearance-none transition-all delay-100 w-full pl-3 pr-6 py-1.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-1 focus:ring-indigo-500 active:border-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
      >
        <option disabled value="">{{ $t('action.select_option') }}</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value">
          {{ selectedValue === option.value ? `${option.label}` : option.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-500">
        <font-awesome class="text-xs  " :icon="['fas', 'chevron-down']"/>
      </div>
    </div>
  </div>
</template>
