<template>
  <div
    class="border-black border-2 text-center font-bold text-lg"
    :class="month ? 'bg-blue-300' : 'bg-yellow-700'"
  >
    {{ number }}
    <div class="flex">
      <Heart
        :state="
          completed && (month ? (number + 3) / 7 > 0 : (number - 27) / 7 > 0)
        "
      />
      <Heart
        :state="
          completed && (month ? (number + 3) / 7 > 1 : (number - 27) / 7 > 1)
        "
      />
      <Heart
        :state="
          completed && (month ? (number + 3) / 7 > 2 : (number - 27) / 7 > 2)
        "
      />
      <Heart
        :state="
          completed && (month ? (number + 3) / 7 > 3 : (number - 27) / 7 > 3)
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Heart from './Heart.vue'

interface Props {
  number: number
  completed: boolean
  month: boolean
}

defineProps<Props>()
</script>
