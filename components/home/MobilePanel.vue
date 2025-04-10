<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import MonoDialog from "~/components/common/MonoDialog.vue";
import SearchMenu from "~/components/common/SearchMenu.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";

let menuState = useState("menuState");
const searchMenu = ref(false)
const route = useRoute();
const isHidden = ref(false); // State to track if the navbar is hidden
const lastScrollY = ref(0); // To store the last scroll position
const scrollThreshold = 400;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > scrollThreshold;

  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <flex-row class="w-screen px-6 fixed bottom-2 z-2 max-sm:block hidden"
            :class="['transition-transform duration-300',
            isHidden ? 'translate-y-full' : 'translate-y-0']">
    <flex-row class="panel-bg px-4 w-full rounded-xl border justify-between">
      <router-link to="/"
                   :class="route.path === '/' ? 'text-mg-700':''"
                   class="text-gray-400 text-3xl p-2 hover:text-mg-700 w-full transition-all text-center duration-300">
        <font-awesome :icon="['fas', 'house']"/>
      </router-link>
      <button
          @click="searchMenu = !searchMenu"
          :class="searchMenu ? 'text-mg-700':''"
          class="text-gray-400 text-3xl p-2 hover:text-mg-700 w-full text-center transition-all duration-300">
        <font-awesome :icon="['fas', 'magnifying-glass']"/>
      </button>
      <router-link to="/cart"
                   :class="route.path === '/cart' ? 'text-mg-700':''"
                   class="text-gray-400 text-3xl p-2 hover:text-mg-700 w-full text-center transition-all duration-300">
        <font-awesome :icon="['fas', 'cart-shopping']"/>
      </router-link>
      <button
          class="text-gray-400 text-3xl p-2 hover:text-mg-700 w-full text-center transition-all duration-300"
          @click="menuState = true">
        <font-awesome :icon="['fas', 'bars']"/>
      </button>
    </flex-row>
  </flex-row>

  <mono-dialog v-model:isOpen="searchMenu"
               clear-mode
               @confirm="searchMenu = false">
    <search-menu @closeDialog="searchMenu = false"/>
  </mono-dialog>
</template>

<style scoped>
.panel-bg {
  background-color: rgba(255, 255, 255, 0.76);
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
