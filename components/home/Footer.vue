<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import FlexCol from "~/components/common/FlexCol.vue";
</script>

<template>
  <footer class="bg-white text-mg-900 text-center py-5 justify-center">
    <flex-row class="w-full justify-center gap-4">
      <flex-row class="gap-4 max-sm:flex-col">
        <a href="tel://+998904040080"
           class="hover:text-mg-700 transition-all duration-300">
          <font-awesome :icon="['fas', 'phone']"/> +998 90 404 00 80
        </a>
        <a href="https://www.instagram.com/monostoreuz"
           class="hover:text-mg-700 transition-all duration-300"
           target="_blank">
          <font-awesome :icon="['fab', 'instagram']"/> Instagram
        </a>
        <a href="https://t.me/monostoreuz"
           class="hover:text-mg-700 transition-all duration-300"
           target="_blank">
          <font-awesome :icon="['fab', 'telegram']"/> Telegram
        </a>
        <flex-col>
          &copy; 2024 monostore.uz
        </flex-col>
      </flex-row>
    </flex-row>
  </footer>
</template>

<style scoped>

</style>
