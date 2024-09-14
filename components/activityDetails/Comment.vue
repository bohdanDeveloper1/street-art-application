<script setup lang="ts">
import StarsGeneratorComponent from "~/components/activityDetails/StarsGeneratorComponent.vue";

const props = defineProps<{
  authorName: string,
  ratingInStars: number,
  message: string
}>();
</script>

<template>
  <div class="comment-container">
    <div class="comment-author-name roboto-medium">
      {{ authorName }}
    </div>
    <div class="comment-rating">
      <stars-generator-component :rating-in-stars="props.ratingInStars" :star-size="1.4"></stars-generator-component>
    </div>
    <div class="comment-message">
      {{message}}
    </div>
  </div>
</template>

<style scoped>
.comment-container{
  padding: 12px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 20px;
}

.comment-author-name{
  margin-bottom: 4px;
}

.comment-rating{
  margin-left: -4px;
  justify-content: start;
  margin-bottom: 20px;
}
</style>