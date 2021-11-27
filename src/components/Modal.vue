<template>
  <Dialog as="div" :open="isOpen">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="min-h-screen px-4 text-center">
        <DialogOverlay class="fixed inset-0 bg-gray-900 opacity-70" @click="close"/>

        <div
          class="
            inline-block
            w-full
            max-w-md
            p-6
            my-8
            overflow-hidden
            text-left
            align-middle
            transition-all
            transform
            bg-white
            shadow-xl
            rounded-2xl
          "
        >
          <DialogTitle class="text-center text-3xl font-bold mb-4">
            Naslov
          </DialogTitle>
          <DialogDescription>
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                class="
                  flex
                  justify-between
                  w-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-left text-purple-900
                  bg-purple-100
                  rounded-lg
                  focus:outline-none
                  focus-visible:ring
                  focus-visible:ring-purple-500
                  focus-visible:ring-opacity-75
                "
              >
                <span>Rabiš namen za današnjo molitev?</span>
                <ChevronUpIcon
                  :class="open ? 'transform rotate-180' : ''"
                  class="w-5 h-5 text-purple-500"
                />
              </DisclosureButton>

              <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-800">
                <slot></slot>
              </DisclosurePanel>
            </Disclosure>
          </DialogDescription>

          <div class="flex flex-col mt-8">
            <label>
              <input
                v-model="check1"
                type="checkbox"
                class="rounded text-purple-500 mr-2"
              />
              <span>Opravil današnji izziv</span>
            </label>

            <label>
              <input
                v-model="check2"
                type="checkbox"
                class="rounded text-purple-500 mr-2"
              />
              <span>Skupna molitev</span>
            </label>
          </div>

          <div class="flex justify-end pt-2">
            <button
              class="
                px-4
                bg-transparent
                p-3
                rounded-lg
                text-indigo-500
                hover:bg-gray-100 hover:text-indigo-400
              "
              @click="close"
            >
              Zapri
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

let check1 = ref(false)
let check2 = ref(false)

interface Props {
  isOpen: boolean
  check: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (event: 'close', done: boolean): void
}>()

function close() {
  emit('close', check1.value && check2.value)
}
</script>
