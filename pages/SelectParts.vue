<template>
  <div class="flex min-h-screen bg-gray-50 font-mono text-[#03312E]">
    <!-- LEFT: Filters Panel -->
    <aside class="w-1/5 bg-white p-4 border-r border-gray-200 space-y-6">
      <h3 class="text-lg font-semibold">Filters</h3>
      <div v-for="(opts, name) in currentFilters" :key="name">
        <button
            @click="activeFilter = activeFilter === name ? null : name"
            class="w-full text-left font-medium hover:text-[#03312E] mb-1"
        >
          {{ name }}
        </button>
        <ul v-if="activeFilter === name" class="pl-4 text-sm text-gray-600 space-y-1">
          <li v-for="opt in opts" :key="opt" class="cursor-pointer hover:text-[#03312E]">
            {{ opt }}
          </li>
        </ul>
      </div>
    </aside>

    <!-- CENTER: Products List -->
    <main
        class="flex-1 p-6 space-y-4 overflow-y-auto transition-margin duration-300"

    >
      <h2 class="text-2xl font-semibold">Select {{ currentCategory }}</h2>
      <ul class="space-y-3">
        <li
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow p-4 flex justify-between items-center"
        >
          <div class="flex items-center space-x-4">
            <img :src="product.image" class="w-16 h-16 object-cover rounded" />
            <div>
              <h3 class="font-medium">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.spec }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <p class="font-semibold">${{ product.price.toFixed(2) }}</p>
            <button
                @click="addToBuild(product)"
                class="text-xs uppercase font-medium px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
            >
              Select
            </button>
          </div>
        </li>
      </ul>
    </main>

    <!-- RIGHT: Build Summary -->
    <!-- Sidebar -->
    <aside
        :class="[
    'fixed top-0 right-0 h-full bg-white text-[#03312E] shadow-lg flex flex-col transition-width duration-300 ease-in-out z-50',
    open ? 'w-[600px]' : 'w-[110px]'
  ]"
    >
      <!-- Toggle Arrow (always visible) -->
      <button
          @click="open = !open"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 p-2 bg-white border rounded-full shadow"
      >
        <component
            :is="open ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon"
            class="w-6 h-6 text-gray-600"
        />
      </button>

      <!-- COLLAPSED: icons only -->
      <template items-center v-if="!open">
        <div

            v-for="comp in components"
            :key="comp.name"
            class="p-3 flex justify-center cursor-pointer hover:bg-gray-200"
            @click="currentCategory = comp.name"
        >
          <img :src="comp.iconUrl" :alt="comp.name" class="w-11 h-11" />
        </div>
      </template>

      <!-- EXPANDED HEADER -->
      <div v-else class="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
        <div class="flex items-center space-x-2">
          <ChevronDoubleLeftIcon
              @click="open = false"
              class="w-6 h-6 text-gray-600 cursor-pointer rounded-full bg-[#C0E8D9] p-1"
          />
          <h3 class="text-xl font-semibold truncate">Your Build</h3>
        </div>
        <button @click="createList" class="px-3 py-1 bg-white text-blue-900 rounded text-xs">
          Add New List
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 overflow-y-auto">
        <!-- EMPTY STATE: list all categories with Select button -->
        <div v-if="open && !build.length" class="p-4 space-y-3">
          <div
              v-for="comp in components"
              :key="comp.name"
              class="flex items-center justify-between bg-white p-3 rounded-lg shadow"
          >
            <div class="flex items-center space-x-2">
              <img :src="comp.iconUrl" :alt="comp.name" class="w-8 h-8" />
              <span class="text-sm font-medium">{{ comp.name }}</span>
            </div>
            <button
                @click="addToBuild({ category: comp.name, product: null, qty: 1 })"
                class="text-xs uppercase font-medium px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
            >
              Select
            </button>
          </div>
        </div>

        <!-- SELECTED ITEMS LIST -->
        <ul v-else-if="open && build.length" class="space-y-4 p-4">
          <li
              v-for="item in build"
              :key="item.category"
              class="bg-white rounded-lg shadow p-4"
          >
            <div class="flex items-center justify-between">
              <!-- Category icon & name -->
              <div class="flex items-center space-x-3">
                <img :src="categoryIcons[item.category]" class="w-8 h-8" />
                <span class="text-sm font-medium text-blue-600">{{ item.category }}</span>
              </div>

              <!-- Product image -->
              <div class="w-16 h-16 flex-shrink-0">
                <img
                    :src="item.product?.image || '/images/placeholder.png'"
                    alt=""
                    class="object-cover w-full h-full rounded"
                />
              </div>

              <!-- Name & specs -->
              <div class="flex-1 px-4">
                <p class="text-sm font-medium">{{ item.product?.name || '—' }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ item.product?.spec || '' }}</p>
              </div>

              <!-- Qty picker & line total -->
              <div class="flex flex-col items-center space-y-1">
                <div class="flex items-center border rounded overflow-hidden">
                  <button
                      @click="decreaseQty(item)"
                      class="px-2 py-1 hover:bg-gray-200"
                  >−</button>
                  <span class="px-3">{{ item.qty }}</span>
                  <button
                      @click="increaseQty(item)"
                      class="px-2 py-1 hover:bg-gray-200"
                  >+</button>
                </div>
                <p class="text-sm font-semibold">
                  ${{ (item.product?.price || 0) * item.qty | toFixed(2) }}
                </p>
              </div>

              <!-- Delete button -->
              <button @click="removeItem(item.category)" class="p-2 hover:text-red-600">
                <TrashIcon class="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- FOOTER TOTAL -->
      <div v-if="open" class="p-4 border-t border-gray-300 bg-white">
        <p class="font-semibold">Total: ${{ totalPrice.toFixed(2) }}</p>
      </div>
    </aside>


  </div>
</template>

<script setup>


import { ref, computed } from 'vue'
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/vue/24/outline'
// sidebar open state
const open = ref(true)

// your build array & totalPrice (from your existing code)
const build = ref([])
const totalPrice = computed(() =>
    build.value.reduce((sum, i) => sum + i.product.price * (i.qty || 1), 0)
)

// 1) Category (replace with route param later)
const category = 'CPU'

// 2) Filters: collapsible facets
const filters = {
  Brand: ['Intel', 'AMD'],
  Cores: ['4-Core', '6-Core', '8-Core'],
  'Clock Speed': ['3.0 GHz', '3.5 GHz', '4.0 GHz'],
}
const activeFilter = ref(null)
function toggleFilter(name) {
  activeFilter.value = activeFilter.value === name ? null : name
}

// 3) Sample product data
const products = ref([
  { id: 1, name: 'Ryzen 5 7600X', spec: '6-Core • 4.7 GHz • AM5', price: 229.99, image: '/images/ryzen5.png' },
  { id: 2, name: 'Intel i5-13600K', spec: '14-Core • 5.1 GHz • LGA 1700', price: 319.99, image: '/images/i5_13600k.png' },
  // …add more as needed
])

// 4) Filtered products (extend logic as desired)
const filteredProducts = computed(() => {
  return products.value
})

import CPU from '@/assets/icons/CPUIcon.svg';
import DesktopIcon from '@/assets/icons/Desktop.svg';
import MotherboardIcon from '@/assets/icons/motherboard.svg';
import MemoryIcon from '@/assets/icons/Memory.svg';
import GPU from '@/assets/icons/GPU.svg';
import Case from '@/assets/icons/Case.svg';
import PowerSupply from '@/assets/icons/PowerSupply.svg';
import Storage from '@/assets/icons/Storage.svg';
import Cooler from '@/assets/icons/Cooler.svg';
import Accessories from '@/assets/icons/Accessories.svg';
import { PlusIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';

const components = [
  { name: 'CPU',          iconUrl: CPU },
  { name: 'Motherboard',  iconUrl: MotherboardIcon },
  { name: 'Memory',       iconUrl: MemoryIcon },
  { name: 'GPU',          iconUrl: GPU },
  { name: 'Case',         iconUrl: Case },
  { name: 'Power Supply', iconUrl: PowerSupply },
  { name: 'Storage',      iconUrl: Storage },
  { name: 'CPU Cooler',   iconUrl: Cooler },
  { name: 'Accessories',  iconUrl: Accessories }
]

import { TrashIcon } from '@heroicons/vue/24/outline'

// Initialize quantity
build.value.forEach(i => (i.qty = i.qty || 1))

function increaseQty(item) {
  item.qty++
}
function decreaseQty(item) {
  if (item.qty > 1) item.qty--
}
// Remove a category from the build
function removeItem(category) {
  build.value = build.value.filter(i => i.category !== category)
}

</script>
