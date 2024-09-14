<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { useAddCommentStore } from "~/stores/addComment";
import { collection, addDoc } from "firebase/firestore";


const { $firestore } = useNuxtApp();
const addCommentStore = useAddCommentStore();
const props = defineProps<{
  userUid: string,
  activityUid: string,
  artistUid: string
}>();
const emit = defineEmits(['getComments']);
const authorName = ref<string>('Bogdan');
const activityRating = ref<number>(0);
const isLoading = ref<boolean>(false);
const isCommentAdded = ref(false);

const { handleSubmit, errors } = useForm({
  validationSchema: {
    rating(){
      if(activityRating.value > 0) return true;

      return 'Select activity rating.'
    },
    commentMessage(value: string) {
      if (value?.length > 0 && value?.length <= 900) return true;
      else if(value?.length > 900) return 'Comment must be least than 900 characters.'
      else return 'Write a comment.'
    },
  },
})
const rating = useField('rating');
const commentMessage = useField('commentMessage');

const onSubmit = handleSubmit(async (values) => {
  await addActivityComment(values);
})

async function addActivityComment(values: any){
  const dateNow = new Date();
  await addDoc(collection($firestore, "comments"), {
    authorName: authorName.value,
    authorUid: props.userUid,
    artistUid: props.artistUid,
    activityUid: props.activityUid,
    ratingInStars: activityRating.value,
    message: values.commentMessage,
    date: dateNow.getDate()
  });

  emit('getComments');
  isCommentAdded.value = true;
}

function setRating(newRating: number) {
  activityRating.value = newRating;
}

onBeforeMount(async () => {
  // todo: authorName.value =  get authorName from DB;
})
</script>

<template>
  <div>
    <div v-if="!isCommentAdded" class="comment-container">
      <div class="comment-author-name roboto-medium">
        {{ authorName }}
        <button @click="addCommentStore.showAddCommentComponent = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path>
          </svg>
        </button>
      </div>
      <form @submit="onSubmit">
        <div class="comment-rating">
          <svg
              v-for="i in 5"
              :key="i"
              @click="setRating(i)"
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
              :style="{ cursor: 'pointer' }"
          >
            <path
                :fill="i <= activityRating ? 'orange' : 'gray'"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"
            ></path>
          </svg>
          <div v-if="rating.errorMessage.value && activityRating === 0" class="my-error-message">
            Select activity rating
          </div>
        </div>
        <div class="comment-message">
          <v-textarea
              label="Your comment"
              v-model="commentMessage.value.value"
              :counter="900"
          ></v-textarea>
          <div class="my-error-message" style="margin-top: -12px;">{{commentMessage.errorMessage.value}}</div>
        </div>
        <button class="add-comment-btn">
      <span v-if="!isLoading">
        Add comment
      </span>
          <span v-else>
        <loader-component width="20px" height="20px"></loader-component>
      </span>
        </button>
      </form>
    </div>
    <div v-else>
      <div class="alert-success">
        <v-alert
            color="success"
            icon="$success"
            :closable="true"
            title="Your comment was added"
            text="Thank you for your comment"
        ></v-alert>
      </div>
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
  display: flex;
  justify-content: space-between;
}

.comment-rating{
  margin-left: -4px;
  justify-content: start;
  margin-bottom: 20px;
}

.comment-message{
  margin-bottom: 8px;
}

.add-comment-btn{
  height: 48px;
  width: 140px;
  border-radius: 5px;
  border: 1px solid lightgrey;
}

.comment-rating svg {
  cursor: pointer;
}

.my-error-message{
  margin: 4px 0 0 6px;
  line-height: 12px;
  transition-duration: 150ms;
  color: rgb(176, 0, 32);
  font-weight: 400;
  font-size: 14px;
}
</style>