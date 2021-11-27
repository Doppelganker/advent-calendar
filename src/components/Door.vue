<template>
  <div
    class="border-black border-2 text-center font-bold text-2xl"
    :class="month ? 'bg-purple-400' : 'bg-purple-800'"
  >
    {{ number }}
    <div class="flex justify-center">
      <Candle
        :state="
          completed && (month ? (number + 3) / 7 > 0 : (number - 27) / 7 > 0)
        "
      />
      <Candle
        :state="
          completed && (month ? (number + 3) / 7 > 1 : (number - 27) / 7 > 1)
        "
      />
      <Candle
        :state="
          completed && (month ? (number + 3) / 7 > 2 : (number - 27) / 7 > 2)
        "
      />
      <Candle
        :state="
          completed && (month ? (number + 3) / 7 > 3 : (number - 27) / 7 > 3)
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Candle from './Candle.vue'

interface Props {
  number: number
  completed: boolean
}

const props = defineProps<Props>()

const month = props.number < 26
</script>
