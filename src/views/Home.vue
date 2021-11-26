<template>
  <div class="flex flex-col h-full p-2">
    <h1 class="text-3xl text-center mb-12">Adventni Kolendar</h1>
    <div class="flex-auto grid sm:grid-cols-5 grid-cols-3 gap-4">
      <Door
        v-for="(door, i) in doorsNovember"
        :key="i"
        :month="false"
        :number="door.value.num"
        :completed="door.value.check"
        @click="openModal(door.value.num)"
      />
    </div>
    <div class="flex-auto grid sm:grid-cols-5 grid-cols-3 gap-4">
      <Door
        v-for="(door, i) in doorsDecember"
        :key="i"
        :month="true"
        :number="door.value.num"
        :completed="door.value.check"
        @click="openModal(door.value.num)"
      />
    </div>
  </div>
  <Modal v-model:isOpen="modalOpen" @close="close"> {{ test }} </Modal>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import Door from '../components/Door.vue'
import Modal from '../components/Modal.vue'

let lastOpen = ref(0)
let modalOpen = ref(false)
let test = ref('')

let doorsNovember: Array<Ref<{ num: number; check: boolean }>> = []
let doorsDecember: Array<Ref<{ num: number; check: boolean }>> = []
let a = Array.from({ length: 3 }, (v, k) => k + 28)
for (let i = 0; i < a.length; i++) {
  doorsNovember[i] = ref({ num: a[i], check: false })
}
a = Array.from({ length: 25 }, (v, k) => k + 1)
for (let i = 0; i < a.length; i++) {
  doorsDecember[i] = ref({ num: a[i], check: false })
}

function openModal(num: number) {
  let selectedDate: Date
  if (num > 26) {
    selectedDate = new Date(2021, 9, num)
  } else {
    selectedDate = new Date(2021, 10, num)
  }
  const date = new Date()

  if (selectedDate < date) {
    lastOpen.value = num
    test.value = num + ''
    modalOpen.value = !modalOpen.value
  }
}
function close(done: boolean) {
  modalOpen.value = !modalOpen.value
  let doorNumber = lastOpen.value
  if (doorNumber > 26) {
    doorsNovember[doorNumber - 28].value.check = done
  } else {
    doorsDecember[doorNumber - 1].value.check = done
  }
}
</script>
