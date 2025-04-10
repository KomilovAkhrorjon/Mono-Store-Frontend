<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import MdBtn from "~/components/common/MdBtn.vue";
import MonoAccordion from "~/components/common/MonoAccordion.vue";
import CustomSelect from "~/components/common/CustomSelect.vue";
import {useUtils} from "~/util/Utils";
const openedFilter = ref(0);
const util = useUtils();


defineProps({
  withSort: {
    type: Boolean,
    default: false
  },
  category: {
    type: Object,
    default: {}
  },
  categoryInstance: {
    type: Array<Object>,
    default: [],
    required: true
  }
})

</script>

<template>
  <custom-select v-if="withSort"/>
  <md-btn class="gap-1"
          v-for="ctInstance in categoryInstance"
          :to="util.generateCategoryLink(ctInstance)"
          :key="ctInstance.id">
    <font-awesome :icon="['fas','chevron-left']"/>
    {{ ctInstance.title }}
  </md-btn>
  <flex-col class="pl-6">
    <md-btn v-for="ct in category.children"
            :to="util.generateCategoryLink(ct)"
            :key="ct.id">
      {{ ct.title }}
    </md-btn>
  </flex-col>
  <template v-for="i in 0">
    <mono-accordion :text="'Filter - ' + i"
                    @update:open="openedFilter = (i == openedFilter) ? 0 : i"
                    :open="openedFilter == i">
      <template #content>
        Yooo nima gaap {{ i }}
      </template>
    </mono-accordion>
  </template>
</template>

<style scoped>

</style>
