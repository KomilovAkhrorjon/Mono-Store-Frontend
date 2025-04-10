<script setup lang="ts">

import ColoredLinkBtn from "~/components/common/ColoredLinkBtn.vue";
import FlexRow from "~/components/common/FlexRow.vue";

defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <flex-row class="justify-between items-center px-8">
    <div class="text-xl font-medium text-mg-900">
      {{ text }}
    </div>
    <colored-link-btn :to="to" class="text-lg">
      {{ $t('action.view_all') }}
      <lazy-font-awesome :icon="['fas', 'chevron-right']"/>
    </colored-link-btn>
  </flex-row>
</template>

<style scoped>

</style>
