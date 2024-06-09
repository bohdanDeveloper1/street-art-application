<template>
  <div class="card-container">
    <div class="card" v-if="activityMainPhoto !== null">
      <img :src="activityMainPhoto" class="card-img" :alt="mainPhotoRef">
      <div class="card-body activity">
        <div class="activity-category">{{props.category}}</div>
        <h4 class="activity-title">{{props.name}}</h4>
        <p class="activity-date">{{formattedDate}}</p>
        <p class="activity-address">{{props.cityName}}, {{props.streetName}} {{props.houseNumber}}</p>
        <v-btn
            class="see-details_btn"
        >
          see details
        </v-btn>
      </div>
    </div>
    <div v-else>
      <v-skeleton-loader
          class="mx-auto border"
          width="250"
          height="300"
          type="image, article"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as storageRef, getDownloadURL  } from "firebase/storage";

const props = defineProps<{
  mainPhotoRef: String,
  name: String,
  cityAdmin: String,
  cityName: String,
  streetName: String,
  houseNumber:  String,
  category: String,
  dateTimestamp: Number,
}>();
const isFavorite = ref(false);
const activityMainPhoto = ref(null);

async function addCardToFavorite(){
  // todo перевірити чи користувач залогований.
  // якщо залогований то
  isFavorite.value = true;
}

async function removeCardFromFavorite(){
  // todo перевірити чи користувач залогований.
  // якщо залогований то
  isFavorite.value = false;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return date.toLocaleDateString('en-US', options);
};

// Обчислювана властивість, яка містить отформатовану дату
const formattedDate = computed(() => formatDate(props.dateTimestamp));

onBeforeMount(async () => {
  const storage = getStorage();
  activityMainPhoto.value = await getDownloadURL(storageRef(storage, props.mainPhotoRef));
});
</script>

<style scoped>
.card-container{
  padding-left: 12px;
  padding-right: 12px;
}

.card{
  width: 250px;
  border-radius: 12px;
  border: 2px solid darkgrey;
  padding-bottom: 2px;
  margin-bottom: 35px;
}

.card-img{
  width: 100%;
  height: 180px;
  margin-bottom: 8px;
  border-radius: 10px 10px 0 0;
}

.see-details_btn{
  background: #000;
  color: white;
}

.activity-category{
  display: inline-block;
  padding: 4px 5px;
  border: 1px solid darkgrey;
  border-radius: 5px;
  background-color: darkgrey;
}

.activity-date{
  margin-top: 50px;
}

.activity-address{
  color: darkgrey;
}
</style>