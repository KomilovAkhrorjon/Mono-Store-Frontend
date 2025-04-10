<script setup lang="ts">

import CategoryProducts from "~/components/product/CategoryProducts.vue";

let route = useRoute();

let category = route.params.category.toString().split('--');
const category_id = parseInt(category[category.length - 1]);

</script>
<template>
  <category-products :category="category_id"/>
</template>

<style scoped>

</style>
