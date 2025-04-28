<script setup>
import {computed, ref} from 'vue'
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon, TrashIcon,} from '@heroicons/vue/24/outline'
import CategoryProducts from "~/components/product/CategoryProducts.vue";
import {useBuilderStore} from "~/stores/PcBuilderStore.js";
import FlexCol from "~/components/common/FlexCol.vue";
import MonoDialog from "~/components/common/MonoDialog.vue";
import BuildListActionCard from "~/components/pc-builder/BuildListActionCard.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import FlexRow from "~/components/common/FlexRow.vue";

const open = ref(false)
let builderStore = useBuilderStore()
const router = useRouter()
const route = useRoute()
const buildId = route.params.id;
const locale = useI18n().locale.value;
const actionState = ref(false)

async function getProducts() {
  await builderStore.restoreBuild(buildId)
}

async function checkout() {
  await builderStore.checkoutBuild(buildId)
  await router.push(`/${locale}/orders`)
}


onMounted(() => {
  getProducts();
})

</script>
<template>
  <template v-if="!builderStore.dataLoading">
    <category-products
        is-list
        v-model:filters="builderStore.filters"
        v-model:category="builderStore.currentCategory"/>
  </template>
  <div class="flex min-h-screen bg-gray-50 font-mono text-[#03312E]">
    <aside
        :class="[
            'fixed top-0 right-0 h-full bg-white text-[#03312E] shadow-lg flex flex-col transition-width duration-300 ease-in-out z-50',
            open ? 'w-[600px]' : 'w-[110px]']">
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
        <flex-col
            v-for="comp in builderStore.components"
            :key="comp.name"
            class="p-3 cursor-pointer hover:bg-gray-200 items-center justify-center gap-2"
            :class="builderStore.currentCategory === comp.categoryId ? 'bg-gray-200' : ''"
            @click="builderStore.setCurrentCategory(comp.categoryId)">
          <img :src="comp.iconUrl" :alt="comp.name" class="w-11 h-11"/>
          <span class="text-xs font-medium">{{ comp.name }}</span>
        </flex-col>
      </template>

      <div v-else class="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
        <div class="flex items-center space-x-2">
          <ChevronDoubleLeftIcon
              @click="open = false"
              class="w-6 h-6 text-gray-600 cursor-pointer rounded-full bg-[#C0E8D9] p-1"
          />
          <h3 class="text-xl font-semibold truncate">Your Build</h3>
        </div>
        <button @click="actionState = true" class="px-3 py-1 bg-white text-blue-900 rounded text-xs">
          Add New List
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="open" class="p-4 space-y-3">
          <div
              v-for="comp in builderStore.components"
              :key="comp.name"
              :class="builderStore.currentCategory === comp.categoryId ? '!bg-gray-200' : ''"
              class="flex items-center justify-between bg-white p-3 rounded-lg shadow"
          >
            <div class="flex items-center space-x-2">
              <img :src="comp.iconUrl" :alt="comp.name" class="w-8 h-8"/>
              <span class="text-sm font-medium">{{ comp.name }}</span>
            </div>
            <button
                @click="builderStore.setCurrentCategory(comp.categoryId)"
                class="text-xs uppercase font-medium px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
              Select
            </button>
          </div>
        </div>
        <flex-row class="p-3">
          <primary-btn class="w-full"
                       @click="checkout">
            {{ $t('cart.checkout')}}
          </primary-btn>
        </flex-row>
      </div>

      <!-- FOOTER TOTAL -->
      <div v-if="open" class="p-4 border-t border-gray-300 bg-white">
        <p class="font-semibold">Total: {{ builderStore.formatNumber(builderStore.currentBuild?.value?.total) }} UZS</p>
      </div>
    </aside>
  </div>
  <mono-dialog v-model:isOpen="actionState"
               clear-mode
               @confirm="() => actionState = false">
    <build-list-action-card/>
  </mono-dialog>
</template>

