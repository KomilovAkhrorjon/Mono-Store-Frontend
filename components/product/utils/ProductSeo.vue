<script setup lang="ts">

import {useHttpService} from "~/util/HttpService";
import {useUtils} from "~/util/Utils";

const props = defineProps<{
  product: any,
  selectedSku: any,
}>()

const http = useHttpService();
const util = useUtils();
const product = ref(props.product)

function getSortedImages() {
  return util.sortImages(props.product['media'])
}

function getSku() {
  return props.selectedSku
}

function getProductUrl() {
  const formattedName = util.linkNameFormatter(props.product.title)
  return `/product/${formattedName}--${props.product.id}`
}

useHead({
  title: `${props.product?.title} - Monostore.uz (${props.product?.id})`,
  meta: [
    { name: 'description', content: product.value.description },
    { property: 'og:title', content: product.value.name },
    { property: 'og:description', content: product.value.description.shortDescription },
    { property: 'og:image', content: http.fileServerUrl + getSortedImages()?.SMALL[0].url },
    { property: 'og:type', content: 'product' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": props.product?.title,
        "image": http.fileServerUrl + getSortedImages()?.SMALL[0].url,
        "description": props.product?.description.shortDescription,
        "brand": {
          "@type": "Brand",
          "name": props.product?.brand.title
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "UZS",
          "price": util.getPriceWithCurrency(getSku().discount ? getSku().discount : getSku().price, "UZS"),
          "availability": "https://schema.org/InStock",
          "url": `https://monostore.uz${getProductUrl()}`
        }
      })
    }
  ]
})
</script>

<template>
</template>

<style scoped>

</style>
