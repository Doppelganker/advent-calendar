<template>
  <div class="flex flex-col h-full">
    <h1 class="text-3xl text-center mb-12">Adventni Kolendar</h1>
    <div class="flex-auto grid sm:grid-cols-5 grid-cols-3 gap-4">
        <Door v-for="(door, i) in doors" v-bind:key="i" :number="door.num" :completed="door.check" @click="openModal(door.num)" />
    </div>
  </div>
  <Modal v-model:show="modalOpen" @done="done()">
      {{test}}
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Door from '@/components/Door.vue'
import Modal from '@/components/Modal.vue'
import domaceNaloge from '@/data/domaceNaloge'
import { TDoor } from '@/typings'

export default defineComponent({
  components: {
    Door, Modal
  },
  data () {
    return {
      doors: [] as Array<TDoor>,
      lastOpen: 0,
      modalOpen: false,
      test: ''
    }
  },
  mounted () {
    if (localStorage.doors) {
      this.doors = JSON.parse(localStorage.doors)
    } else {
      const a = Array.from({ length: 25 }, (v, k) => k + 1).map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1])
      for (let i = 0; i < a.length; i++) {
        this.doors[i] = { num: a[i], check: false }
      }
      localStorage.doors = JSON.stringify(this.doors)
    }
  },
  methods: {
    openModal (num: number) {
      // const date = new Date()
      // if (date.getMonth() === 11 && date.getDate() >= num) {
      this.lastOpen = num
      this.test = domaceNaloge[num - 1]
      this.modalOpen = !this.modalOpen
      // }
    },
    done () {
      const a = this.doors.find(door => door.num === this.lastOpen)
      if (a !== undefined) {
        a.check = true
        localStorage.doors = JSON.stringify(this.doors)
      }
    }
  }
})
</script>
