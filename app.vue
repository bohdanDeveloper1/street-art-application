<template>
  <NuxtLayout>
      <div class="wrapper">
        <HeaderComponent></HeaderComponent>
        <NuxtPage />
      </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Street art',
  ogTitle: 'Street art',
  description: 'This is my amazing street art application.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>