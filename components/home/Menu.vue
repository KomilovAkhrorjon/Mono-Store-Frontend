<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";

let menuState = useState("menuState");
let categories = useState('categoryState');
const http = useHttpService()
let activeCategory = ref<any>({});
const util = useUtils();

onMounted(() => {
  menuState.value = false;
});

watch(() => menuState.value, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});


function selectCategory(category: any) {
  activeCategory.value = category;
}

const getCategoryLink = (category: any) => {
  return util.generateCategoryLink(category);
}

function closeMenu() {
  menuState.value = false
  activeCategory.value = {}
}

</script>

<template>
  <flex-row class="fixed menu-transition justify-end right-0 h-full z-3"
            :class="[menuState ? 'w-full menu-bg':'w-0']">
    <flex-col :class="menuState ? 'max-w-2xl p-4 w-full':'w-0 p-0'"
              class="menu-transition bg-white overflow-x-hidden gap-4 relative">
      <flex-row class="h-[calc(100%-3.5rem)] relative">
        <flex-col class="w-full overflow-y-scroll px-4 gap-2">
          <flex-row class="text-mg-900 text-3xl font-semibold my-2">
            {{ $t('menu.all_categories') }}
          </flex-row>
          <flex-row v-for="category in categories"
                    :key="category">
            <primary-btn text-left
                         clear-bg
                         @click="selectCategory(category)"
                         class="w-full text-mg-900 font-semibold bg-gray-100 active:bg-gray-200 px-4">
              <flex-row class="gap-2">
                <nuxt-img :src="http.getFileUrl(category.icon)"
                          loading="lazy"
                     class="h-6 w-6"
                     :alt="category.title"/>
                {{ category.title }}
              </flex-row>
            </primary-btn>
          </flex-row>
        </flex-col>
        <transition name="fade-slide">
          <flex-col v-if="activeCategory?.title"
                    class="w-full absolute h-full overflow-y-scroll bg-white px-4 gap-4">
            <flex-row class="border-b-2 w-full">
              <primary-btn clear-bg
                           text-left
                           :href="getCategoryLink(activeCategory)"
                           @click="closeMenu()"
                           class="text-mg-900 text-3xl bg-gray-100 active:bg-gray-300 font-semibold my-2 px-4 w-full">
                <flex-row class="gap-2 items-center">
                  <nuxt-img :src="http.getFileUrl(activeCategory.icon)"
                       class="h-6 w-6"
                            loading="lazy"
                       :alt="activeCategory.title"/>
                  {{ activeCategory.title }}
                </flex-row>
              </primary-btn>
            </flex-row>
            <flex-col v-for="category in activeCategory.children"
                      class="gap-2 pb-4 border-b-2"
                      :key="category">
              <primary-btn text-left
                           clear-bg
                           :href="getCategoryLink(category)"
                           @click="closeMenu()"
                           class="w-full text-mg-900 text-xl font-semibold bg-gray-100 active:bg-gray-200 px-4">
                <flex-row class="gap-2 justify-between">
                  {{ category.title }}
                  <font-awesome :icon="['fas', 'chevron-down']"/>
                </flex-row>
              </primary-btn>
              <flex-row v-for="child in category.children"
                        class=""
                        :key="child">
                <primary-btn text-left
                             clear-bg
                             :href="getCategoryLink(child)"
                             @click="closeMenu()"
                             class="w-full text-mg-900 bg-gray-100 active:bg-gray-200 px-4">
                  <flex-row class="gap-2">
                    {{ child.title }}
                  </flex-row>
                </primary-btn>
              </flex-row>
            </flex-col>
          </flex-col>
        </transition>
      </flex-row>
      <flex-row class="absolute bottom-4 left-4 right-4 gap-4">
        <primary-btn clear-bg class="w-full bg-gray-200 hover:bg-gray-300"
                     @click="menuState = false">
          <font-awesome :icon="['fas', 'xmark']"/>
          <span class="ml-2">{{ $t('action.close') }}</span>
        </primary-btn>
        <primary-btn
            v-if="activeCategory.title"
            @click="activeCategory = {}"
            clear-bg class="w-full bg-gray-200 hover:bg-gray-300">
          <font-awesome :icon="['fas', 'chevron-left']"/>
          <span class="ml-2">{{ $t('action.back') }}</span>
        </primary-btn>
      </flex-row>
    </flex-col>
  </flex-row>
</template>

<style scoped>
.fade-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-leave-active {
  transition: opacity 0.3s linear, transform 0.3s linear;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
