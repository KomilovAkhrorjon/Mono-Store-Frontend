<script setup lang="ts">
import {defineEmits, defineProps} from "vue";
import IconBtn from "~/components/common/IconBtn.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import MonoCard from "~/components/common/MonoCard.vue";

// Props
let props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: "Dialog sarlavhasi",
  },
  clearMode: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: String,
    default: "bg-white",
  },
});
let disableMainRelative = useState('disableMainRelative');
const contentBody = ref(null);
const contentIsTaller = ref(false);
let mainContainer = ref(null);
let eventAdded = false;

function clcEvent(event: any) {
  if (!contentBody.value?.innerHTML.includes(event.target.innerHTML)) {
    closeDialog();
  }
}

const emit = defineEmits(["update:isOpen", "confirm", 'closed']);

const closeDialog = () => emit("update:isOpen", false);

// Watchers
watch(() => props.isOpen, (val) => {
  if (val) {
    disableMainRelative.value = true;
    document.body.style.overflow = "hidden";
  } else {
    disableMainRelative.value = false;
    document.body.style.overflow = "auto";
  }
});

// watch scroll event
watch(mainContainer, () => {
  mainContainer.value?.addEventListener("scroll", () => {
    if (props.isOpen && !eventAdded) {
      contentIsTaller.value = contentBody.value?.clientHeight > window.innerHeight;
      eventAdded = true;
    }
  });
});

// if press esc key close dialog
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDialog();
    }
  });

  eventAdded = false;
  contentIsTaller.value = contentBody.value?.clientHeight > window.innerHeight;
});

onUnmounted(() => {
  window.removeEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDialog();
    }
  });
});
</script>
<template>
  <transition name="fade-slide">
    <div v-if="isOpen"
         @click="clcEvent"
         ref="mainContainer"
         class="flex flex-auto fixed inset-0 justify-center bg-black bg-opacity-50 z-99 w-full h-screen overflow-y-scroll p-4"
         :class="contentIsTaller ? '':'items-center'">
      <div ref="contentBody"
           class="h-fit">
        <mono-card v-if="isOpen && !clearMode"
                   :bg="bg"
                   class="h-fit">
          <flex-row class="justify-between items-center gap-4">
            <h3 class="text-xl font-semibold text-mg-900">{{ title }}</h3>
            <icon-btn :icon="['fas', 'xmark']"
                      class="px-0.5"
                      @click="closeDialog"/>
          </flex-row>
          <slot/>
        </mono-card>
        <template v-else>
          <slot/>
        </template>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-22px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
