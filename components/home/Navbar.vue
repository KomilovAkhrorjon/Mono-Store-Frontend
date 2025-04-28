<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import FlexRow from "~/components/common/FlexRow.vue";
import RoundedLink from "~/components/common/RoundedLink.vue";
import RoundedBtn from "~/components/common/RoundedBtn.vue";
import MonoDialog from "~/components/common/MonoDialog.vue";
import Login from "~/components/auth/Login.vue";
import SearchMenu from "~/components/common/SearchMenu.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import IconBtn from "~/components/common/IconBtn.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import {useState} from "#imports";

const isHidden = ref(false); // State to track if the navbar is hidden
const lastScrollY = ref(0); // To store the last scroll position
const scrollThreshold = 400; // Amount of scroll (in pixels) before triggering hide
let sidebarState = useState('sidebarState');
let authState = useState('authState');
let showDialog = ref(false);
const searchMenu = ref(false);
const menu = ref(false);
let cartData = useState<any>('cartData');
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > scrollThreshold;

  lastScrollY.value = currentScrollY;
};

function logout() {
  localStorage.removeItem('token');
  menu.value = false;
  authState.value = false;
}

function getCartCount(){
  if (!cartData.value) return 0;
  return cartData.value.length;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  if (localStorage.getItem('token')) {
    authState.value = true;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div :class="[
        'fixed top-0 justify-start w-full transition-transform duration-300 z-2',
        isHidden ? '-translate-y-full' : 'translate-y-0']"
       class="nav-bg h-12">
    <nav class="flex flex-row justify-center h-full w-full max-[1400px]:pl-14 max-sm:pl-0">
      <flex-row class="max-w-[80rem] px-4 w-full">
        <flex-row class="h-full items-center justify-between w-full gap-4">
          <router-link to="/" class="text-4xl font-semibold text-mg-700 px-4 ">
            <flex-row>
              monostore.uz
            </flex-row>
          </router-link>
          <primary-btn class="whitespace-nowrap max-sm:hidden"
                       @click="sidebarState = !sidebarState">
            <font-awesome :icon="['fas', 'bars']" class="mr-1"/>
            {{ $t('menu.all_categories') }}
          </primary-btn>
          <flex-row class="w-full max-sm:hidden">
            <product-search
                class="w-full"
                outside-dialog
                @update:open-dialog="searchMenu = true"/>
          </flex-row>
          <rounded-btn
              class="max-lg:hidden"
              @click="authState ? logout():showDialog = true">
            <flex-row class="items-center gap-2">
              <font-awesome :icon="['fas', authState ? 'right-to-bracket':'right-from-bracket']"/>
              {{ authState ? $t('auth.logout'):$t('auth.login') }}
            </flex-row>
          </rounded-btn>
          <rounded-link
              class="max-lg:hidden"
              href="/orders">
            <flex-row class="items-center gap-2">
              <font-awesome :icon="['fas', 'clipboard-list']"/>
              {{ $t('order.orders') }}
            </flex-row>
          </rounded-link>
          <rounded-link
              class="max-lg:hidden"
              href="/pc-builder">
            <flex-row class="items-center gap-2 text-nowrap">
              <font-awesome :icon="['fas', 'desktop']"/>
              PC Builder
            </flex-row>
          </rounded-link>
          <rounded-link
              class="max-lg:hidden relative"
              href="/cart">
            <div class="absolute top-1 left-8 bg-violet-700 text-white px-1 text-xs rounded-full"
                 v-if="getCartCount() > 0">
              {{ getCartCount() }}
            </div>
            <flex-row class="justify-center items-center gap-2">
              <font-awesome :icon="['fas', 'cart-shopping']"/>
              {{ $t('cart.cart') }}
            </flex-row>
          </rounded-link>
          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.name }}
          </NuxtLink>
          <icon-btn :icon="['fas', menu ? 'xmark':'bars']"
                    @click="menu = !menu"
                    class="lg:hidden relatives px-0.5"/>
          <mono-card v-if="menu"
                     class="absolute top-14 right-4 min-w-52 border">
            <rounded-link
                @click="menu = false"
                class="relative"
                href="/cart">
              <div class="absolute top-1 left-8 bg-violet-700 text-white px-1 text-xs rounded-full"
                   v-if="getCartCount() > 0">
                {{ getCartCount() }}
              </div>
              <flex-row class="justify-start items-center gap-2">
                <font-awesome :icon="['fas', 'cart-shopping']"/>
                {{ $t('cart.cart') }}
              </flex-row>
            </rounded-link>
            <rounded-link
                @click="menu = false"
                href="/orders">
              <flex-row class="items-center gap-2">
                <font-awesome :icon="['fas', 'clipboard-list']"/>
                {{ $t('order.orders') }}
              </flex-row>
            </rounded-link>
            <rounded-link
                @click="menu = false"
                href="/pc-builder">
              <flex-row class="items-center gap-2">
                <font-awesome :icon="['fas', 'desktop']"/>
                PC Builder
              </flex-row>
            </rounded-link>
            <rounded-btn
                class="text-left"
                @click="authState ? logout():[showDialog = true, menu = false]">
              <flex-row class="items-center gap-2">
                <font-awesome :icon="['fas', authState ? 'right-to-bracket':'right-from-bracket']"/>
                {{ authState ? $t('auth.logout'):$t('auth.login') }}
              </flex-row>
            </rounded-btn>
          </mono-card>
        </flex-row>
      </flex-row>
    </nav>
  </div>
  <mono-dialog v-model:isOpen="searchMenu"
               clear-mode
               @confirm="() => searchMenu = false">
    <search-menu @closeDialog="searchMenu = false"/>
  </mono-dialog>
  <mono-dialog
      v-model:isOpen="showDialog"
      :title="$t('auth.login')">
    <Login @closeMenu="showDialog = false" class="overflow-y-hidden"/>
  </mono-dialog>
</template>

<style scoped>
.nav-bg {
  background-color: rgba(230, 245, 240, 0.76);
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
