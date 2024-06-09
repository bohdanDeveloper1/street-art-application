<template>
  <div>
    <activities-container-component :cityName="''"></activities-container-component>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Activities',
  meta: [
    { name: 'Street art', content: 'activities' }
  ],
});
</script>