<template>
  <div class=" bg-blue-300 border-black border-2 text-center font-bold text-lg">
    {{number}}
    <Heart :state="completed" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Heart from './Heart.vue'

export default defineComponent({
  name: 'Door',
  props: {
    number: Number,
    completed: Boolean
  },
  components: {
    Heart
  }
})
</script>
