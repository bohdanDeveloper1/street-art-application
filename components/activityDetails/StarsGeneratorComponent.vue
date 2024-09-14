<script setup lang="ts">
const props = defineProps<{
  ratingInStars: number
  starSize: number
}>();
</script>

<template>
  <div>
    <svg v-for="i in props.ratingInStars" xmlns="http://www.w3.org/2000/svg" :width="props.starSize + 'em'" :height="props.starSize + 'em'" viewBox="0 0 24 24">
      <path fill="orange" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
    <svg v-for="i in 5 - props.ratingInStars" xmlns="http://www.w3.org/2000/svg" :width="props.starSize + 'em'" :height="props.starSize + 'em'" viewBox="0 0 24 24">
      <path fill="gray" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
  </div>
</template>

<style scoped>

</style>