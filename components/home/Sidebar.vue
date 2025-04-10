<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import MonoLink from "~/components/common/MonoLink.vue";

let sidebarState = useState('sidebarState');
let categories = useState('categoryState');
const http = useHttpService();
const currentCategory = ref<any>({});

function mouseLeave() {
  sidebarState.value = false;
  currentCategory.value = {};
}

function secondLevel(category: any) {
  currentCategory.value = category
}

onMounted(async () => {
  categories.value = await http.get(Endpoint.CATEGORY_TREE)
})

const getCategoryLink = (category: any) => {
  const name = category.title.toString().replace(/[ &/?!,()]/g, match => ({
    ' ': '-',
    '/': '-',
    '&': 'and'
  }[match] || ''));
  return `/category/${name}--${category.id}`
}
</script>

<template>
  <flex-row class="fixed custom-transition h-full z-3"
            :class="[sidebarState ? 'w-full menu-bg':'max-w-17']">
    <flex-col @mouseenter="sidebarState = true"
              @mouseleave="mouseLeave()"
              :class="sidebarState ? 'max-w-[38rem]':'max-w-17 max-sm:max-w-[0px] max-sm:hidden'"
              class="custom-transition overflow-x-hidden">
      <flex-row class="justify-start w-full ">
        <flex-col class="pl-1 overflow-y-scroll border-r bg-white h-screen w-full"
                  :class="sidebarState ? 'min-w-[17rem]':'w-full gap-4'">
          <font-awesome
              v-if="!sidebarState"
              :icon="['fas', 'bars']"
              class="mt-4 rounded-full bg-mg-700 py-3.5 px-3.5 text-white text-xl"/>
          <transition name="fade-slide">
            <flex-row v-if="sidebarState"
                      class="text-mg-900 content-center p-2 font-semibold rounded-full items-center text-2xl my-2 pb-2 w-full gap-2"
                      :class="sidebarState ? '':'justify-center bg-transparent p-0 rounded-none'">
              {{ $t('menu.all_categories') }}
            </flex-row>
          </transition>
          <router-link v-for="category in categories"
                       @mouseenter="secondLevel(category)"
                       @click="mouseLeave()"
                       class="text-mg-900 w-full transition-all p-3 rounded-r-xl"
                       :class="[sidebarState ? '':'', currentCategory?.id == category.id ? 'bg-mg-50 border-l-4 border-mg-700':'']"
                       :key="category.name"
                       :to="getCategoryLink(category)">
            <flex-row class="gap-2 items-center"
                      :class="sidebarState ? '':'justify-center'">
              <nuxt-img :src="http.getFileUrl(category.icon)"
                        loading="lazy"
                   class="h-6 w-6"
                   :alt="category.title"/>
              <transition name="fade-slide">
                <flex-row v-if="sidebarState"
                          class="justify-between items-center w-full pr-1">
                  {{ category.title }}
                  <font-awesome :icon="['fas', 'chevron-right']"/>
                </flex-row>
              </transition>
            </flex-row>
          </router-link>
        </flex-col>
        <transition name="fade-slide">
          <flex-col v-if="currentCategory?.id && sidebarState"
                    class="border-l max-h-screen rounded-r-lg bg-white min-w-64 pr-2">
            <flex-row v-for="secondLevelCategory in currentCategory.children"
                      :key="secondLevelCategory"
                      class="border-b py-3 w-full">
              <flex-col class="w-full">
                <flex-row class="text-lg text-mg-900 w-full">
                  <mono-link :to="getCategoryLink(secondLevelCategory)"
                             @click="mouseLeave()"
                             class="w-full px-2 py-2 hover:border-l-4 rounded-r-xl border-mg-700 hover:bg-mg-50">
                    {{ secondLevelCategory.title }}
                  </mono-link>
                </flex-row>
                <flex-row v-for="c in secondLevelCategory.children"
                          class="text-gray-500"
                          :key="c">
                  <mono-link :to="getCategoryLink(c)"
                             @click="mouseLeave()"
                             class="w-full py-2 hover:border-l-4 rounded-r-xl border-mg-700 hover:bg-mg-50 px-4">
                    {{ c.title }}
                  </mono-link>
                </flex-row>
              </flex-col>
            </flex-row>
          </flex-col>
        </transition>
      </flex-row>
    </flex-col>
  </flex-row>
</template>

<style scoped>
.fade-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-leave-active {
  transition: opacity 0s linear, transform 0s linear;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-22px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-2px);
}
</style>
