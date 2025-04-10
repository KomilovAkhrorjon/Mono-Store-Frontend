<script setup lang="ts">
import FlexCol from "~/components/common/FlexCol.vue";
import Navbar from "~/components/home/Navbar.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import Sidebar from "~/components/home/Sidebar.vue";
import Menu from "~/components/home/Menu.vue";
import Footer from "~/components/home/Footer.vue";
import MobilePanel from "~/components/home/MobilePanel.vue";
import {useCartService} from "~/util/CartService";

let disableMainRelative = useState('disableMainRelative');
const cartService = useCartService();

onMounted(() => {
  disableMainRelative.value = false;
  cartService.getCartCount();
});

</script>
<template>
  <NuxtLayout>
    <Sidebar/>
    <Menu/>
    <Navbar/>
    <div class="max-sm:pl-0 w-full max-sm:w-full pt-12 h-full pb-16 max-sm:pb-60 min-h-screen"
         :class="disableMainRelative ? '':'relative'">
      <flex-row class="w-full justify-center pl-14 max-sm:pl-0 h-full">
        <flex-col class="h-full min-[1400px]:max-w-7xl justify-start w-full py-4 px-2"
                  :class="disableMainRelative ? '':'relative'">
          <NuxtPage></NuxtPage>
        </flex-col>
      </flex-row>
      <Footer class="absolute bottom-0 w-full max-sm:pb-20"/>
      <mobile-panel class="w-full"/>
    </div>
  </NuxtLayout>
</template>
<style>
body {
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: #f9fafb;
}

.custom-transition {
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.menu-transition {
  transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.menu-bg {
  background-color: rgba(31, 31, 31, 0.8);
}
</style>

