<script setup lang="ts">

import FlexRow from "~/components/common/FlexRow.vue";
import Login from "~/components/auth/Login.vue";
import MonoCard from "~/components/common/MonoCard.vue";
</script>

<template>
  <flex-row class="w-full justify-center h-full items-center content-center">
    <mono-card>
      <Login redirect="/"/>
    </mono-card>
  </flex-row>
</template>

<style scoped>

</style>
