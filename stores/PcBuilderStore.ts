import {defineStore} from "pinia";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";
import CPU from "assets/icons/CPUIcon.svg";
import MotherboardIcon from "assets/icons/motherboard.svg";
import MemoryIcon from "assets/icons/Memory.svg";
import GPU from "assets/icons/GPU.svg";
import Case from "assets/icons/Case.svg";
import PowerSupply from "assets/icons/PowerSupply.svg";
import Storage from "assets/icons/Storage.svg";
import Cooler from "assets/icons/Cooler.svg";
import Accessories from "assets/icons/Accessories.svg";
import {useUtils} from "~/util/Utils";


export const useBuilderStore = defineStore("builderStore", () => {

  const http = useHttpService();
  const utils = useUtils()
  let creatingBuild = ref(false);
  let currentBuild = reactive<any>({
    title: null,
    isPublic: false,
  });
  let myBuilds = ref<any>([]);
  let dataLoading = ref(false);
  let currentCategory = ref<any>(1);
  let filters = ref<any>({specificationIds: []});
  const mustBeFilter = [1, 2, 3];
  const specificationCategories: any = {
    "CPU": {
      categories: [2],
      specificationIds: [1]
    },
    "Motherboard": {
      categories: [1, 3],
      specificationIds: [1, 8]
    },
    "Memory": {
      categories: [3],
      specificationIds: [8]
    },
  }
  let components = ref<any>([
    {id: 1, name: 'CPU', iconUrl: CPU, categoryId: 1, acceptedSpecifications: []},
    {
      id: 2,
      name: 'Motherboard',
      iconUrl: MotherboardIcon,
      categoryId: 2,
      acceptedSpecifications: []
    },
    {id: 3, name: 'Memory', iconUrl: MemoryIcon, categoryId: 3, acceptedSpecifications: []},
    {id: 4, name: 'GPU', iconUrl: GPU, categoryId: 4, acceptedSpecifications: []},
    {id: 5, name: 'Case', iconUrl: Case, categoryId: 5, acceptedSpecifications: []},
    {id: 6, name: 'Power Supply', iconUrl: PowerSupply, categoryId: 6, acceptedSpecifications: []},
    {id: 7, name: 'Storage', iconUrl: Storage, categoryId: 7, acceptedSpecifications: []},
    {id: 8, name: 'CPU Cooler', iconUrl: Cooler, categoryId: 8, acceptedSpecifications: []},
    {id: 9, name: 'Accessories', iconUrl: Accessories, categoryId: 9, acceptedSpecifications: []}
  ])
  let componentsMock = [
    {id: 1, name: 'CPU', iconUrl: CPU, categoryId: 1, acceptedSpecifications: []},
    {
      id: 2,
      name: 'Motherboard',
      iconUrl: MotherboardIcon,
      categoryId: 2,
      acceptedSpecifications: []
    },
    {id: 3, name: 'Memory', iconUrl: MemoryIcon, categoryId: 3, acceptedSpecifications: []},
    {id: 4, name: 'GPU', iconUrl: GPU, categoryId: 4, acceptedSpecifications: []},
    {id: 5, name: 'Case', iconUrl: Case, categoryId: 5, acceptedSpecifications: []},
    {id: 6, name: 'Power Supply', iconUrl: PowerSupply, categoryId: 6, acceptedSpecifications: []},
    {id: 7, name: 'Storage', iconUrl: Storage, categoryId: 7, acceptedSpecifications: []},
    {id: 8, name: 'CPU Cooler', iconUrl: Cooler, categoryId: 8, acceptedSpecifications: []},
    {id: 9, name: 'Accessories', iconUrl: Accessories, categoryId: 9, acceptedSpecifications: []}
  ]

  async function saveBuild() {

    creatingBuild.value = true;
    const res: any = await http.post(Endpoint.BUILD_LIST, currentBuild)
    .catch((error: any) => {
      alert(error.message);
      creatingBuild.value = false;
    });

    creatingBuild.value = false;
    return res
  }

  function getFirstImage(medias: any) {
    return http.getFileUrl(utils.sortImages(medias).SMALL[0]?.url)
  }

  function setCurrentCategory(category: any) {
    const baseComponent = components.value.find((component: any) => component.categoryId === category);
    filters.value.specificationIds = baseComponent.acceptedSpecifications;
    currentCategory.value = category;
  }

  async function restoreBuild(id: any, currentCategoryId: any = 1) {

    dataLoading.value = true

    currentBuild.value = await http.get(`${Endpoint.BUILD_LIST}/${id}`)

    for (const item of currentBuild.value.buildListItems) {
      const baseCategoryId = getBaseCategoryId(item.category);
      const firstImage = getFirstImage(item.media);
      const component = components.value.find((component: any) => component.categoryId === baseCategoryId);
      component.iconUrl = firstImage

      if (mustBeFilter.includes(baseCategoryId)) {
        let specificationCategoriesFor = specificationCategories[component.name];
        console.log(component.name)
        for (const i of specificationCategoriesFor.categories) {

          let componentForIndex = components.value.findIndex((component: any) => component.categoryId === i);

          let specificationIds = []
          for (const specification of item.sku.specifications) {
            if (specificationCategoriesFor.specificationIds.includes(specification.categoryId)) {
              specificationIds.push(specification.id)
            }
          }
          components.value[componentForIndex].acceptedSpecifications = specificationIds;
        }
      }
    }

    setCurrentCategory(currentCategoryId)

    dataLoading.value = false;
  }

  async function addComponent(id: any, buildId: any = null, quantity: any = 1) {

    let currentCategoryId = currentCategory.value;

    const currentIndex = components.value.findIndex((component: any) => component.categoryId === currentCategory.value);

    if (!isAdded(id)) {
      await http.put(`${Endpoint.BUILD_LIST}/${buildId}`, {
        skuId: id,
        quantity: quantity
      })
      if (!(currentIndex > components.value.length - 2)) {
        currentCategoryId = components.value[currentIndex + 1].categoryId;
      }
    } else {
      const baseComponent = componentsMock.find((component: any) => component.categoryId === currentCategory.value);
      const component = components.value.find((component: any) => component.categoryId === currentCategory.value);
      component.iconUrl = baseComponent?.iconUrl

      if (mustBeFilter.includes(component.categoryId)) {
        let specificationCategoriesFor = specificationCategories[component.name];
        for (const i of specificationCategoriesFor.categories) {
          let componentForIndex = components.value.findIndex((component: any) => component.categoryId === i);
          components.value[componentForIndex].acceptedSpecifications = []
        }
      }

      await http.delete(`${Endpoint.BUILD_LIST}/${buildId}`, {
        skuId: id,
        quantity: quantity
      })

      if (currentIndex > 0) {
        currentCategoryId = components.value[currentIndex - 1].categoryId;
      }

    }

    await restoreBuild(currentBuild.value.id, currentCategoryId)

  }

  const isAdded = (id: any) => {
    return currentBuild.value?.buildListItems?.findIndex((component: any) => component.sku.id === id) !== -1;
  }

  const getBaseCategoryId = (category: any) => {
    if (!category.parent) {
      return category.id;
    }
    return getBaseCategoryId(category.parent);
  }

  async function getMyBuilds() {
    dataLoading.value = true;
    const res: any = await http.get(Endpoint.BUILD_LIST)
    .catch((error: any) => {
      alert(error.message);
      dataLoading.value = false;
    });

    myBuilds.value = res.content;
    dataLoading.value = false;
  }

  const formatNumber = (value: any) => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return value;
  }

  async function checkoutBuild(id: number){
    return await http.post(`${Endpoint.CHECKOUT_BUILD}/${id}`, {})
  }

  return {
    restoreBuild,
    saveBuild,
    setCurrentCategory,
    addComponent,
    isAdded,
    getMyBuilds,
    getFirstImage,
    formatNumber,
    checkoutBuild,
    myBuilds,
    creatingBuild,
    currentBuild,
    currentCategory,
    components,
    filters,
    dataLoading
  }
});
