<template>
  <Dialog as="div" :open="isOpen">
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="min-h-screen px-4 text-center">
        <DialogOverlay class="fixed inset-0" />

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
          <DialogTitle class="text-center text-3xl font-bold">
            Naslov
          </DialogTitle>
          <DialogDescription>
            Razni opisi <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            laboriosam hic ipsa quam esse asperiores ipsum similique nulla
            incidunt veritatis magni, itaque voluptate ad enim nihil.
            Perferendis voluptatum aut quia!
          </DialogDescription>

          <div class="flex flex-col">
            <slot></slot>

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
  DialogDescription
} from '@headlessui/vue'
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
