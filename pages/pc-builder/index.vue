<script setup>
import DesktopIcon from '@/assets/icons/Desktop.svg';
import {EllipsisHorizontalIcon, PlusIcon} from '@heroicons/vue/24/outline';
import FlexRow from "~/components/common/FlexRow.vue";
import Grid from "~/components/common/Grid.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import MonoDialog from "~/components/common/MonoDialog.vue";
import BuildListActionCard from "~/components/pc-builder/BuildListActionCard.vue";
import {useBuilderStore} from "~/stores/PcBuilderStore.js";

const actionState = ref(false)
const builderStore = useBuilderStore();
const locale = useI18n().locale.value;

function pushToBuild(id) {
  return `/${locale}/pc-builder/${id}`
}

const Desktop = {name: 'Desktop', iconUrl: DesktopIcon}

onMounted(async () => {
  await builderStore.getMyBuilds()
})

</script>
<template>
  <grid class="grid-cols-2 h-full gap-8 px-4">
    <flex-col>
      <flex-row class="justify-center items-center space-x-7 text-teal-600 w-full">
        <img :src="Desktop.iconUrl" alt="CPU icon" class="w-90 h-90"/>
        <h1 class="text-4xl font-mono"> PC BUILDER</h1>
      </flex-row>

      <!-- Subtitle -->
      <h2 class="text-lg font-mono font-semibold text-center mt-10 mb-2">SELECT YOUR CUSTOM PC
        COMPONENTS</h2>

      <!-- Components Grid -->
      <div class="grid grid-cols-3 gap-6">
        <div
            v-for="comp in builderStore.components"
            :key="comp.name"
            @click="actionState = true"
            class="flex flex-col items-center bg-white rounded-l shadow p-6 cursor-pointer hover:shadow-lg transition"
        >
          <img :src="comp.iconUrl" alt="" class="w-12 h-12"/>
          <span class="mt-3 text-sm font-mono font-medium ">{{ comp.name }}</span>
        </div>
      </div>
    </flex-col>

    <!-- RIGHT PANEL -->
    <flex-col class="bg-[#C0E8D9] p-12 space-y-8 !min-h-[calc(100vh-10rem)]">
      <!-- Your Build Lists -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-mono font-semibold">YOUR BUILD LISTS</h2>
          <primary-btn buttonMode to="" @click="actionState = true">
            Add New List
          </primary-btn>
        </div>
        <div class="grid grid-cols-2 gap-6" v-if="!builderStore.dataLoading">
          <router-link
              v-for="build in builderStore.myBuilds"
              :key="build.title"
              :to="pushToBuild(build.id)"
              class="bg-white rounded-l shadow p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center h-16 border-2 border-dashed rounded-lg">
              <template v-if="build.isNew">
                <PlusIcon class="w-6 h-6 text-gray-400"/>
              </template>
              <template v-else>
                <div class="flex space-x-2 items-center">
                  <img :src="builderStore.getFirstImage(build.buildListItems[0].media)"
                       v-if="build.buildListItems.length"
                       alt="" class="w-10 h-10 object-cover rounded"/>
                  <EllipsisHorizontalIcon class="w-6 h-6 text-gray-400"/>
                </div>
              </template>
            </div>
            <div class="mt-4">
              <h3 class="font-medium">{{ build.title }}</h3>
              <p class="text-xs text-gray-500">{{ build.buildListItems.length }} item</p>
            </div>
            <p class="mt-2 font-semibold">{{ build.total }} UZS</p>
          </router-link>
        </div>
      </div>

    </flex-col>
  </grid>

  <mono-dialog v-model:isOpen="actionState"
               clear-mode
               @confirm="() => actionState = false">
    <build-list-action-card/>
  </mono-dialog>
</template>
