<template>
  <aside
      :class="[
          'fixed top-0 right-0 h-full bg-[#C0E8D9] text-[#03312E] shadow-lg flex flex-col transition-width duration-300 ease-in-out z-50',
          open ? 'w-80' : 'w-16'
        ]"
  >
    <!-- Toggle Arrow -->
    <button
        @click="open = !open"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 p-2 bg-white border rounded-full shadow focus:outline-none"
    >
      <component
          :is="open ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon"
          class="w-6 h-6 text-gray-600"
      />
    </button>

    <!-- Collapsed: show one icon per component -->
    <template v-if="!open">
      <div
          v-for="item in build"
          :key="item.category"
          class="p-3 flex justify-center cursor-pointer hover:bg-gray-200"
          @click="currentCategory = item.category"
      >
        <img
            :src="item.product ? item.product.image : categoryIcons[item.category]"
            class="w-6 h-6 rounded"
            alt=""
        />
      </div>
    </template>

    <!-- Expanded Header -->
    <div v-if="open" class="p-4 border-b border-gray-300 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <ChevronDoubleLeftIcon
            @click="open = false"
            class="w-6 h-6 text-gray-600 cursor-pointer rounded-full bg-[#C0E8D9] p-1"
        />
        <h3 class="text-xl font-semibold truncate">Your Build</h3>
      </div>
      <button @click="open = true" class="px-3 py-1 bg-white text-blue-900 rounded text-xs">
        Add New List
      </button>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="open && !build.length" class="text-gray-600">
        No parts added.
      </div>
      <ul v-else class="space-y-3">
        <li
            v-for="item in build"
            :key="item.category"
            class="flex items-center justify-between bg-white p-3 rounded-lg shadow"
        >
          <div class="flex items-center space-x-2">
            <img :src="item.product.image" class="w-10 h-10 rounded" />
            <span class="text-sm">{{ item.category }}</span>
          </div>
          <p class="font-semibold">${{ item.product.price.toFixed(2) }}</p>
        </li>
      </ul>
    </div>

    <!-- Footer Summary -->
    <div v-if="open" class="p-4 border-t border-gray-300">
      <p class="font-semibold">Total: ${{ totalPrice.toFixed(2) }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBuildStore } from '~/stores/build'
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

const buildStore = useBuildStore()
const open = ref(true)

function toggle() {
  open.value = !open.value
}

function createList() {
  buildStore.createList()
}

function selectList(id: number) {
  buildStore.activeListId = id
}

const activeList = computed(() =>
    buildStore.lists.find(l => l.id === buildStore.activeListId)
)

const activeListName = computed(() => activeList.value?.name || 'No List')
const selectedCount = computed(() => activeList.value?.items.length || 0)
const totalCost = computed(() =>
    activeList.value
        ? activeList.value.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
        : 0
)

// Fallback icon for empty lists
const defaultIcon = '/icons/default-category.svg'
const categoryIcons = {
  CPU: '/icons/cpu.svg',
  Motherboard: '/icons/mobo.svg',
  Memory: '/icons/memory.svg',
  GPU: '/icons/gpu.svg',
  Case: '/icons/case.svg',

}
</script>
