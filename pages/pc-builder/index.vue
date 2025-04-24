<template>
  <div class="flex min-h-screen font-mono text-[#03312E] bg-gray-50">
    <!-- LEFT PANEL -->
    <div class="w-1/2 p-12 ">
      <!-- Header -->
      <div class="flex justify-center items-center space-x-7 text-teal-600">
        <common-flex-row></common-flex-row>
        <img :src="Desktop.iconUrl" alt="CPU icon" class="w-90 h-90" />
        <h1 class="text-4xl font-mono"> PC BUILDER</h1>
      </div>

      <!-- Subtitle -->
      <h2 class="text-lg font-mono font-semibold text-center mt-10 mb-2">SELECT YOUR CUSTOM PC COMPONENTS</h2>

      <!-- Components Grid -->
      <div class="grid grid-cols-3 gap-6">
        <div
            v-for="comp in components"
            :key="comp.name"
            @click="onSelectCategory(comp)"
            class="flex flex-col items-center bg-white rounded-l shadow p-6 cursor-pointer hover:shadow-lg transition"
        >
          <img :src="comp.iconUrl" alt="" class="w-12 h-12" />
          <span class="mt-3 text-sm font-mono font-medium ">{{ comp.name }}</span>
        </div>
      </div>

    </div>

    <!-- RIGHT PANEL -->
    <div class="w-1/2 bg-[#C0E8D9] p-12 space-y-8">
      <!-- Your Build Lists -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-mono font-semibold">YOUR BUILD LISTS</h2>
          <button
              class="text-xs font-mono font-medium uppercase px-4 py-2 border border-emerald-950 rounded-lg hover:bg-teal-700 transition"
          >
            Add New List
          </button>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div
              v-for="list in buildLists"
              :key="list.title"
              class="bg-white rounded-l shadow p-4 flex flex-col justify-between"
          >
            <div class="flex items-center justify-center h-16 border-2 border-dashed rounded-lg">
              <template v-if="list.isNew">
                <PlusIcon class="w-6 h-6 text-gray-400" />
              </template>
              <template v-else>
                <div class="flex space-x-2 items-center">
                  <img :src="list.image" alt="" class="w-10 h-10 object-cover rounded" />
                  <EllipsisHorizontalIcon class="w-6 h-6 text-gray-400" />
                </div>
              </template>
            </div>
            <div class="mt-4">
              <h3 class="font-medium">{{ list.title }}</h3>
              <p class="text-xs text-gray-500">{{ list.items }} item<span v-if="list.items>1">s</span></p>
            </div>
            <p class="mt-2 font-semibold">${{ list.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <!-- Popular Builds -->
      <div>
        <h2 class="text-xl font-semibold mb-6">POPULAR BUILDS</h2>
        <div class="space-y-4">
          <div
              v-for="(build, i) in popularBuilds"
              :key="i"
              class="bg-white rounded-l shadow p-4 flex items-center justify-between"
          >
            <!-- LEFT: Images + labels, with dividers only here -->
            <div class="flex divide-x divide-gray-200">
              <div
                  v-for="(img, idx) in build.images"
                  :key="idx"
                  class="px-4 first:pl-0 last:pr-0 flex flex-col items-center"
              >
                <img
                    :src="img"
                    alt=""
                    class="w-10 h-10 object-cover rounded"
                />
                <span class="mt-2 text-xs text-center">
            {{ build.components[idx] }}
          </span>
              </div>
            </div>

            <!-- RIGHT: Price above button, stacked in one column -->
            <div class="flex flex-col items-center space-y-2">
              <p class="font-semibold">${{ build.price.toFixed(2) }}</p>
              <button
                  class="text-xs uppercase font-medium px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function selectComponent(comp) {
  router.push(`/pc-builder/${comp.name}`)
}

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

const Desktop = {name: 'Desktop', iconUrl: DesktopIcon}

// your build lists
const buildLists = [
  { title: 'My New List', items: 0, price: 0, isNew: true },
  {
    title: 'My First Build',
    items: 4,
    price: 245.07,
    isNew: false,
    image: 'https://via.placeholder.com/40' // replace with real image
  }
]

// popular builds data
const popularBuilds = [
  {
    images: [
      'https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg',
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40'
    ],
    components: ['Intel Core Ultra 9 285K', 'RTX 4070', '32GB DDR5', 'AMD B650'],
    price: 1305.15
  },

  // ... repeat or generate 4 entries
]
</script>
