<script setup lang="ts">

import Grid from "~/components/common/Grid.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import MonoCard from "~/components/common/MonoCard.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import Pageble from "~/components/common/Pageble.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const http = useHttpService()
const { t } = useI18n()
const dataLoaded = ref<boolean>(false)
const questions = ref<any>([])
const pageable = ref<any>({page: 0, sort: 'createdAt,ASC', size: 11})
const totalPages = ref<number>(0)

onMounted(() => {
  dataLoad()
})

async function dataLoad() {

  dataLoaded.value = false

  const response = await http.getWithParams(Endpoint.QUESTIONS,
      {
        productId: props.product.id,
        ...pageable.value
      });

  totalPages.value = response?.totalPages

  questions.value = response?.content

  dataLoaded.value = true
}

async function setPage(page: number) {
  pageable.value.page = page - 1
  await dataLoad()
}

</script>

<template>
  <mono-card class="w-full gap-4">
    <flex-row class="col-span-2 max-md:col-span-1 text-xl font-medium text-mg-900">
      {{ $t('question.question_and_answer') }}
    </flex-row>
    <grid class="grid-cols-2 max-md:grid-cols-1 gap-6">
      <flex-col class="w-full justify-center gap-4">
        <flex-row class="text-mg-900 text-xl">
          {{ $t('question.write_question') }}
        </flex-row>
        <flex-row class="text-mg-900 -mb-4">
          {{ $t('question.topic') }}
        </flex-row>
        <flex-row>
          <input class="border rounded-lg w-full p-2">
        </flex-row>
        <flex-row class="text-mg-900 -mb-4">
          {{ $t('product.description') }}
        </flex-row>
        <flex-row>
          <textarea class="border w-full rounded-xl min-h-36 p-4"/>
        </flex-row>
        <flex-row class="w-full justify-end items-center content-center">
          <button
              class="bg-mg-700 hover:bg-mg-400 transition-all duration-300 text-white rounded-xl p-2 px-6">
            {{ $t('action.submit') }}
          </button>
        </flex-row>
      </flex-col>
      <template v-if="dataLoaded">
        <flex-col class="h-full bg-gray-50 rounded-xl p-4 gap-4"
                  v-for="question in questions">
          <flex-row class="w-full justify-between">
            <flex-row class="text-mg-900">
              {{ question['user'].firstName }} {{ question['user'].lastName }}
            </flex-row>
            <flex-row class="text-gray-500">
              {{ question.createdAt.split('T')[0] }}
            </flex-row>
          </flex-row>
          <flex-row class="text-gray-900">
            {{ question['question'] }}
          </flex-row>
          <template v-if="question['answer']">
            <flex-row class="w-full justify-between border-t pt-4">
              <flex-row class="text-mg-900">
                {{ question['seller'].title}}
              </flex-row>
            </flex-row>
            <product-rating
                no-count
                :rating="{rating: question['answerRate'], reviewCount: 1}"/>
            <flex-row class="text-gray-900">
              {{ question['answer'] }}
            </flex-row>
          </template>
        </flex-col>
      </template>
    </grid>
    <pageble :current-page="pageable.page + 1"
             @setPage="setPage"
             button-mode
             :talal-pages="totalPages"/>
  </mono-card>
</template>

<style scoped>

</style>
