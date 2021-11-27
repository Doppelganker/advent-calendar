<template>
  <div class="flex flex-col min-h-full p-2 bg-green-300">
    <h1 class="text-5xl text-center mb-12" @click="saveData">Adventni Kolendar</h1>
    <div class="flex-auto grid grid-cols-15 gap-4">
      <Door
        v-for="(door, i) in doors"
        :key="i"
        :class="i >= 25 ? 'col-span-5' : 'sm:col-span-3 col-span-5'"
        :number="door.num"
        :completed="door.check"
        @click="openModal(door.num)"
      />
    </div>
  </div>
  <Modal v-model:isOpen="modalOpen" :check="false" @close="close"> {{ molitveniNamen[(lastOpen + x)%molitveniNamen.length] }} </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Door from '../components/Door.vue'
import Modal from '../components/Modal.vue'
import molitveniNamen from '../data/molitveniNamen'

let lastOpen = ref(0)
let modalOpen = ref(false)

let doors: Array<{ num: number; check: boolean }> = []
let x = 0
const STORAGE_KEY = "advent-vuejs";
const data = localStorage.getItem(STORAGE_KEY)
let data2 = localStorage.getItem('x')
if(data !== null) {
  doors = JSON.parse(data)
} else {
  let doorsNovember: Array<{ num: number; check: boolean }> = []
  let doorsDecember: Array<{ num: number; check: boolean }> = []
  let a = Array.from({ length: 3 }, (v, k) => k + 28)
  for (let i = 0; i < a.length; i++) {
    doorsNovember[i] = { num: a[i], check: false }
  }
  a = Array.from({ length: 25 }, (v, k) => k + 1)
  for (let i = 0; i < a.length; i++) {
    doorsDecember[i] = { num: a[i], check: false }
  }
  doors = [...doorsNovember, ...doorsDecember]

  shuffle(doors)
}
if(data2 === null){
  x = Math.floor(Math.random() * molitveniNamen.length)
  localStorage.setItem('x', JSON.stringify(x))
} else {
  x = JSON.parse(data2)
}

function openModal(num: number) {
  let selectedDate: Date
  if (num > 26) {
    selectedDate = new Date(2021, 10, num)
  } else {
    selectedDate = new Date(2021, 11, num)
  }
  const date = new Date()

  if (selectedDate < date) {
    lastOpen.value = num
    modalOpen.value = !modalOpen.value
  } else {
    alert(`Hej, hej, hej prste stran, saj še nismo ${selectedDate.getDate()}.${selectedDate.getMonth()+1}`)
  }
}
function close(done: boolean) {
  modalOpen.value = !modalOpen.value
  let lastDoor = doors.find(e => e.num === lastOpen.value)
  if(lastDoor !== undefined) {
    lastDoor.check = done
    saveData()
  }
}

function shuffle(array: Array<object>) {
  let currentIndex = array.length,  randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function saveData() {
  const parsed = JSON.stringify(doors)
  localStorage.setItem(STORAGE_KEY, parsed)
}

</script>
