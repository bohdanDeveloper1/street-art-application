<script setup lang="ts">
import StarsGeneratorComponent from "~/components/activityDetails/StarsGeneratorComponent.vue";

const props = defineProps<{
  oneStarRating: number,
  twoStarRating: number,
  threeStarRating: number,
  fourStarRating: number,
  fiveStarRating: number,
  numberOfComments: number,
  averageRating: number,
}>();

const fiveStarRatingInPercent = computed(() => {
  return (props.fiveStarRating / props.numberOfComments) * 100;
})
const fourStarRatingInPercent = computed(() => {
  return (props.fourStarRating / props.numberOfComments) * 100;
})
const threeStarRatingInPercent = computed(() => {
  return (props.threeStarRating / props.numberOfComments) * 100;
})
const twoStarRatingInPercent = computed(() => {
  return (props.twoStarRating / props.numberOfComments) * 100;
})
const oneStarRatingInPercent = computed(() => {
  return (props.oneStarRating / props.numberOfComments) * 100;
})
</script>

<template>
<div class="comments-rating-container">
    <div class="average-rating-container">
      <div class="roboto-medium">
        Average rating
      </div>
      <div style="display: flex; align-items: center">
        <div class="average-rating roboto-medium">
          {{props.averageRating}}
        </div>
        <div style="margin-top: 8px;">
          /5
        </div>
      </div>
      <div style="font-size: 0.8em">
        number of comments: {{props.numberOfComments}}
      </div>
    </div>
    <div class="vertical-line"></div>
    <div class="rating-stars-container">
      <div>
        <div class="stars-container">
          <stars-generator-component :rating-in-stars="5" :star-size="1.4"></stars-generator-component>
        </div>
        <v-progress-linear
            color="amber-darken-4"
            bg-color="grey-darken-2"
            v-model="fiveStarRatingInPercent"
        ></v-progress-linear>
        <div class="comments-star-number">
          {{props.fiveStarRating}}
        </div>
      </div>
      <div>
        <div class="stars-container">
          <stars-generator-component :rating-in-stars="4" :star-size="1.4"></stars-generator-component>
        </div>
        <v-progress-linear
            color="amber-darken-4"
            bg-color="grey-darken-2"
            v-model="fourStarRatingInPercent"
        ></v-progress-linear>
        <div class="comments-star-number">
          {{props.fourStarRating}}
        </div>
      </div>
      <div>
        <div class="stars-container">
          <stars-generator-component :rating-in-stars="3" :star-size="1.4"></stars-generator-component>
        </div>
        <v-progress-linear
            color="amber-darken-4"
            bg-color="grey-darken-2"
            v-model="threeStarRatingInPercent"
        ></v-progress-linear>
        <div class="comments-star-number">
          {{props.threeStarRating}}
        </div>
      </div>
      <div>
        <div class="stars-container">
          <stars-generator-component :rating-in-stars="2" :star-size="1.4"></stars-generator-component>
        </div>
        <v-progress-linear
            color="amber-darken-4"
            bg-color="grey-darken-2"
            v-model="twoStarRatingInPercent"
        ></v-progress-linear>
        <div class="comments-star-number">
          {{props.twoStarRating}}
        </div>
      </div>
      <div>
        <div class="stars-container">
          <stars-generator-component :rating-in-stars="1" :star-size="1.4"></stars-generator-component>
        </div>
        <v-progress-linear
            color="amber-darken-4"
            bg-color="grey-darken-2"
            v-model="oneStarRatingInPercent"
        ></v-progress-linear>
        <div class="comments-star-number">
          {{props.oneStarRating}}
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
.comments-rating-container{
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.average-rating-container{
  margin-top: 12px;
}

.average-rating{
  font-size: 2em;
  margin: 8px 0;
}

.vertical-line{
  margin: 0 16px;
  border-left: 1px solid lightgrey;
}

.rating-stars-container{
  width: 400px;
}

.rating-stars-container > div{
  display: flex;
  align-items: center;
}

.comments-star-number{
  margin-left: 12px;
  color: lightgrey;
  font-size: 0.8em;
}

.stars-container{
  width: 180px;
  margin-right: 12px;
}
</style>