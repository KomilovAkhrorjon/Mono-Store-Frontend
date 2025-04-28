<script setup lang="ts">

import MonoCard from "~/components/common/MonoCard.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import {useBuilderStore} from "~/stores/PcBuilderStore";

const builderStore = useBuilderStore();
const router = useRouter();
const locale = useI18n().locale.value;

async function saveData(){
  if (builderStore.currentBuild.title.length < 1) {
    alert('Please enter a name for your build');
    return;
  }

  const res = await builderStore.saveBuild();
  await router.push(`/${locale}/pc-builder/${res.id}`);
}

</script>

<template>
  <mono-card class="gap-6">
    <flex-row>
      <h1 class="text-2xl font-bold">
        {{ $t('build.add_new') }}
      </h1>
    </flex-row>
    <flex-row class="border rounded-lg p-1">
      <input type="text"
             v-model="builderStore.currentBuild.title"
             :placeholder="$t('action.name') + '...'"
             class="w-full px-4 py-2 border rounded">
    </flex-row>
    <flex-row class="gap-2 !text-xl items-center">
      <input type="checkbox"
             id="checkbox"
             v-model="builderStore.currentBuild.isPublic"
             class="ml-2">
      <label for="checkbox" class="text-gray-700">
        {{ $t('action.is_public')}}
      </label>
    </flex-row>
    <primary-btn @click="saveData">
      {{ $t('action.save') }}
    </primary-btn>
  </mono-card>
</template>

<style>
input[type="text"] {
  border: none !important;
}

input[type="text"]:focus,
input[type="text"]:active {
  border: none !important;
  outline: none;
}
</style>
<style scoped>

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #4CAF50;
}

input[type="checkbox"]:checked + label {
  color: #4CAF50;
}
</style>
