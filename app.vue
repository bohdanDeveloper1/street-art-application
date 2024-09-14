<!--
Todo:
1. activity time start < activity time end
2. в БД зберігати  activity time start, time end:  [{1782399600000, 1782399600000}, {1782399600000, 1782399600000},]
3. add comments to activity (коментар має бути пов'язаний з активністю та з актором).
4. показувати всі доступні дати та час на карточці з активністю.
-->
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