<script setup lang="ts">
let isActive = ref(false)
const ourMenu = ref(null)
let menuPosition = ref("right")
let menuTop = ref(false)
let menuBtn = ref(null)
let menuContent = ref(null)
const router = useRouter()


// Methods
function activate(){

  isActive.value = !isActive.value

  if ((window.innerWidth / 2) > ourMenu.value.offsetLeft){
    menuPosition.value = "left"
  }
}

function setContentPosition(){
  const h = window.innerHeight
  const o = parseInt(ourMenu.value.getBoundingClientRect().top)
  const c = menuContent.value.clientHeight

  menuTop.value = (h - o - 42) < c;
}

function activateListener(){
  if (isActive.value){
    document.addEventListener('click', function fnc(e){
      if (ourMenu.value !== null){
        if (!ourMenu.value.contains(e.target)){
          isActive.value = false
          document.removeEventListener('click', function emp(){})
        }
      }
    })
  }else {
    document.removeEventListener('click', function emp(){})
  }
}

watch(isActive, () => {
  setTimeout(() => {
    setContentPosition()
    activateListener()
  }  , 0);
})

</script>

<template>
  <div class="dropdown"
       ref="ourMenu"
       @keydown.esc="isActive = false">
    <div @click="activate"
         ref="menuBtn"
         class="z-0">
      <slot name="btn"></slot>
    </div>
    <div class="dropdown-content z-[9999999] p-4 flex flex-row"
         :class="[isActive ? 'block-display':'',
         menuPosition === 'left' ? 'left-0':'right-0',
         menuTop ? 'bottom-50px': '']"
         ref="menuContent">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
