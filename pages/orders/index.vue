<script setup lang="ts">

import MonoCard from "~/components/common/MonoCard.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import FlexCol from "~/components/common/FlexCol.vue";
import {useOrderService} from "~/util/OrderService";
import MonoDialog from "~/components/common/MonoDialog.vue";
import OrderProductsView from "~/components/order/OrderProductsView.vue";

const service = useOrderService();
const orders = ref<Array<any>>([]);
const showDialog = ref<boolean>(false);
const selectedOrder = ref<number>(0);

function getStatusColor(status: string): string {

  switch (status) {
    case 'IN_PROGRESS':
      return 'text-lightBlue-600';
    case 'CREATED':
      return 'text-orange-500';
    case 'ON_THE_WAY':
      return 'text-purple-700';
    case 'COMPLETED':
      return 'text-green-500';
    case 'CANCELLED':
      return 'text-red-500';
    default:
      return 'bg-gray-200';
  }

}

function viewOrderProducts(orderId: number) {
  selectedOrder.value = orderId;
  showDialog.value = true;
}

onMounted(async () => {
  await service.loadOrders().then(res => {
    orders.value = res
  })
})
</script>

<template>
  <flex-col class="col-span-2 w-full p-4 gap-4">
    <flex-row class="text-lg gap-2 justify-between w-full items-center">
      <flex-row class="gap-2">
        <div class="text-mg-900 font-semibold">
          {{ $t('order.orders') }}
        </div>
        <div class="text-gray-500">
          ({{ orders.length }} {{ $t('order.items') }})
        </div>
      </flex-row>
    </flex-row>
    <div class="flex flex-wrap w-full gap-4 justify-center">
      <flex-row class="w-fit" v-for="order in orders" :key="order">
        <mono-card
            @click="viewOrderProducts(order.id)"
            class="w-full hover:bg-gray-100 cursor-pointer active:bg-gray-50 transition-all duration-300 select-none">
          <flex-row class="w-full justify-between items-center gap-4">
            <flex-col class="h-full items-center" v-if="false">
              <flex-row class="gap-4">
                <flex-col class="w-auto">
                  <nuxt-img src="https://images.uzum.uz/ck1descvutvccfo27mn0/original.jpg"
                            loading="lazy"
                       class="shadow-sm rounded-md max-w-24" alt="asd"/>
                </flex-col>
                <flex-col class="gap-2">
                  <flex-row class="text-mg-900 font-semibold">
                    Name of prod
                  </flex-row>
                  <div class="text-sm">
                    <template v-for="i in 23" :key="i+'99'">
                      <!--                    <sku-info class="py-1"/>-->
                    </template>
                  </div>
                </flex-col>
              </flex-row>
            </flex-col>
            <flex-col class="gap-2 items-start justify-start">
              <flex-row>
                <flex-row class="text-gray-500 font-medium text-md">
                  # {{ order.id }}
                </flex-row>
              </flex-row>
              <flex-row>
                <flex-row class="text-mg-900 font-medium text-lg">
                  $ {{ order.totalAmount }}
                </flex-row>
                <!--              <flex-row class="text-xs text-mg-800 line-through">-->
                <!--                $ 200-->
                <!--              </flex-row>-->
              </flex-row>
              <flex-row class="text-mg-900">
                {{ order.totalQuantity }} items
              </flex-row>
              <flex-row
                  class="items-center gap-2 text-sm transition-all text-gray-700 whitespace-nowrap">
                {{ $t('status.status')}}: <span class="font-semibold" :class="getStatusColor(order.status)">{{ $t(`status.${order.status}`) }}</span>
              </flex-row>
              <flex-row
                  class="items-center gap-2 text-sm transition-all text-gray-700 whitespace-nowrap -mt-1">
                {{
                  new Date(order.createdAt).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }}
              </flex-row>
            </flex-col>
          </flex-row>
        </mono-card>
      </flex-row>
    </div>
  </flex-col>

  <mono-dialog
      v-model:isOpen="showDialog"
      bg="bg-gray-100"
      :title="`# ${selectedOrder}`">
    <order-products-view :order-id="selectedOrder"/>
  </mono-dialog>
</template>

<style scoped>

</style>
