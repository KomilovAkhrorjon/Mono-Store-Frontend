<script setup lang="ts">

import FlexCol from "~/components/common/FlexCol.vue";
import FlexRow from "~/components/common/FlexRow.vue";
import PrimaryBtn from "~/components/common/PrimaryBtn.vue";
import Grid from "~/components/common/Grid.vue";
import {useHttpService} from "~/util/HttpService";
import {Endpoint} from "~/util/Endpoint";

let props = defineProps({
  redirect: {
    type: String,
    default: ''
  }
})
const codeSends = ref('phone');
const http = useHttpService();
const phone = ref('+998');
const finalPhone = ref('');
const otp = ref('');
const userInfo = ref({
  firstName: '',
  lastName: ''
});
const router = useRouter();
let authState = useState('authState');
const emit = defineEmits(['closeMenu']);

async function sendCode() {
  const formattedPhone = phone.value.replace(/\D/g, '').replaceAll('998', '');
  const nineDigit = formattedPhone.slice(-9);
  finalPhone.value = `998${nineDigit}`;

  try {
    await http.post(Endpoint.AUTH_PHONE, {phone: finalPhone.value})
    codeSends.value = 'code'
  } catch (e: any) {
    alert(e.response._data.message)
  }

}

async function login() {

  try {
    await http.post(Endpoint.AUTH, {phone: finalPhone.value, smsCode: otp.value})
    .then((res: any) => {
      localStorage.setItem('token', res)
      authState.value = true
    })

    await http.get(Endpoint.AUTH_ME)
    .then((res: any) => {
      if (res.firstName == '' || res.firstName == null) {
        codeSends.value = 'register'
      } else {
        end()
      }
      authState.value = true
    })
  } catch (e: any) {
    alert(e.response._data.message)
  }
}

async function updateUserInfo(){
  await http.put(Endpoint.AUTH, userInfo.value)
  end()
}

function end() {
  emit('closeMenu', '')
  if (props.redirect != '') {
    router.push(props.redirect)
  }
}

</script>
<template>
  <grid class="grid-cols-1 relative">
    <transition-group name="fade-slide">
      <FlexCol v-if="codeSends == 'phone'" class="col-span-1">
        <form>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-mg-900">
              {{ $t('auth.phone')}}
            </label>
            <input type="text"
                   id="phone"
                   v-model="phone"
                   name="phone"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
        </form>
        <flex-row class="w-full">
          <primary-btn @click="sendCode()"
                       class="w-full">
            {{ $t("auth.send_code") }}
          </primary-btn>
        </flex-row>
      </FlexCol>
      <FlexCol v-if="codeSends == 'code'" class="col-span-1">
        <form>
          <div class="mb-4">
            <label for="code" class="block text-sm font-medium text-mg-900">
              {{ $t('auth.code') }}
            </label>
            <input type="text"
                   id="code"
                   v-model="otp"
                   maxlength="4"
                   name="code"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
        </form>
        <flex-row class="w-full">
          <primary-btn @click="login()" class="w-full">
            {{ $t('auth.verify') }}
          </primary-btn>
        </flex-row>
      </FlexCol>
      <FlexCol v-if="codeSends == 'register'" class="col-span-1">
        <form>
          <div class="mb-4">
            <label for="code" class="block text-sm font-medium text-mg-900">
              {{ $t('auth_first_name') }}
            </label>
            <input type="text"
                   id="code"
                    v-model="userInfo.firstName"
                   name="firstname"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <div class="mb-4">
            <label for="code" class="block text-sm font-medium text-mg-900">
              {{ $t('auth.last_name') }}
            </label>
            <input type="text"
                   id="code"
                   v-model="userInfo.lastName"
                   name="lastname"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
        </form>
        <flex-row class="w-full">
          <primary-btn @click="updateUserInfo()" class="w-full">
            {{ $t('auth.register') }}
          </primary-btn>
        </flex-row>
      </FlexCol>
    </transition-group>
  </grid>

</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  position: absolute;
  transform: translatex(5%);
}

.fade-slide-leave-to {
  opacity: 0;
  position: absolute;
  transform: translatex(-5%);
}
</style>
