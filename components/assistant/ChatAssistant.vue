<template>
  <div>
    <!-- 1) Floating icon trigger -->
    <button
        v-if="!open"
        @click="open = true"
        class="fixed bottom-12 right-6 z-50 p-2 focus:outline-none"
        aria-label="Open AI Assistant"
    >
      <img src="@/assets/icons/chatbot.png" alt="Chatbot" class="h-12 w-12"/>
    </button>



    <!-- 2) Backdrop + slide‑in panel -->
    <transition name="fade">
      <div
          v-if="open"
          class="fixed inset-0 z-60 flex bg-black bg-opacity-30"
          @click.self="open = false"
      >
        <transition name="slide">
          <div class="ml-auto w-80 bg-white h-full flex flex-col">
            <!-- header -->
            <header class="flex items-center justify-between px-4 py-3 bg-[#03312E] text-white">
              <h2 class="font-mono font-bold text-lg">
                Your AI Shopping Co‑Pilot
                <span class="ml-2 px-2 py-0.5 text-xs bg-[#0F9D58] rounded">BETA</span>
              </h2>
              <button @click="open = false" class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </header>

            <!-- chat history -->
            <main class="flex-1 overflow-auto p-4 space-y-3">
              <div
                  v-for="(m,i) in messages"
                  :key="i"
                  class="flex"
                  :class="m.role==='user' ? 'justify-end' : 'justify-start'"
              >
                <div
                    class="max-w-xs px-4 py-2 rounded-lg font-mono text-sm"
                    :class="m.role==='user'
                            ? 'bg-[#0F9D58] text-white'
                            : 'bg-gray-100 text-gray-800'"
                >
                  {{ m.content }}
                </div>
              </div>
            </main>

            <!-- input area -->
            <footer class="flex items-center px-4 py-3 border-t border-gray-200">
              <input
                  v-model="draft"
                  @keyup.enter="sendMessage"
                  type="text"
                  placeholder="Feel free to search…"
                  class="flex-1 border rounded-full px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              />
              <button
                  @click="sendMessage"
                  :disabled="!draft.trim()"
                  class="ml-2 bg-gradient-to-r from-[#03312E] to-[#0F9D58] text-white px-4 py-2 rounded-full disabled:opacity-50 focus:outline-none font-mono text-sm"
              >
                Send
              </button>
            </footer>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ChatBot from '@/assets/icons/chatbot.png'

const open = ref(false)
const draft = ref('')
const messages = ref([
  {
    role: 'assistant',
    content: `Hello and welcome! I'm your shopping co‑pilot, here to simplify
              your experience. How can I assist you today?`
  }
])

async function sendMessage() {
  const text = draft.value.trim()
  if (!text) return

  // 1) show the user's message
  messages.value.push({ role: 'user', content: text })
  draft.value = ''

  // 2) call your API endpoint
  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    })
    const { answer } = await res.json()
    messages.value.push({ role: 'assistant', content: answer })
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, something went wrong.'
    })
    console.error(e)
  }

  // 3) scroll down
  await nextTick()
  const box = document.querySelector('main')
  box.scrollTop = box.scrollHeight
}
</script>

<style>
/* backdrop fade */
.fade-enter-active,
.fade-leave-active { transition: opacity .2s }
.fade-enter-from,
.fade-leave-to { opacity: 0 }

/* slide panel */
.slide-enter-active,
.slide-leave-active { transition: transform .2s }
.slide-enter-from,
.slide-leave-to    { transform: translateX(100%) }
.slide-enter-to,
.slide-leave-from  { transform: translateX(0%) }
</style>
