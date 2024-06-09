<template>
     <div class="card-container">
       <div class="card" v-if="activityMainPhoto">
         <img :src="activityMainPhoto" class="card-img" :alt="mainPhotoRef">
         <div class="card-body activity">
           <div class="activity-category roboto-regular">{{props.category}}</div>
           <h4 class="activity-title">{{props.name}}</h4>
           <p class="activity-date roboto-regular">{{formattedDate}}</p>
           <p class="activity-address roboto-regular">{{props.cityName}}, {{props.streetName}} {{props.houseNumber}}</p>
           <!-- see details btn -->
            <div class="activity-buttons">
              <div v-if="isFavorite">
                <button title="remove from Favorites" @click="removeCardFromFavorite">
                  <img src="/images/addedToFavorite.svg" alt="addToFavorite">
                </button>
              </div>
              <div v-else>
                <button title="add to Favorites" @click="addCardToFavorite">
                  <img src="/images/addToFavorite.svg" alt="addToFavorite">
                </button>
              </div>
              <v-btn
                  class="see-details_btn"
                  @click="showActivityDetails"
              >
                see details
              </v-btn>
            </div>
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
import { getStorage, ref as storageRef, getDownloadURL  } from "firebase/storage";

const props = defineProps<{
  activityId: String,
  mainPhotoRef: String,
  name: String,
  cityAdmin: String,
  cityName: String,
  streetName: String,
  houseNumber:  String,
  category: String,
  dateTimestamp: number,
}>();
const router = useRouter();
const isFavorite = ref(false);
const activityMainPhoto = ref();

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

async function showActivityDetails(){
  router.push(`/activityDetails/${props.activityId}`);
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const options: object = {
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
  border-radius: 10px 10px 0 0;
  margin-bottom: -4px;
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
  margin-top: 0;
  margin-bottom: 4px;
}

.activity-date{
  margin-top: 35px;
  margin-bottom: 8px;
}

.activity-address{
  color: darkgrey;
  margin-bottom: 18px;
}

.activity-buttons{
  display: flex;
  justify-content: space-between;
}
</style>
<!--// async function addSneakerToCart(){-->
<!--//   // todo: add onAuthStateChanged-->
<!--//   // todo по кліку перевіряти чи користувач авторизований (якщо ні перенаправлення на сторінку авторизації і авторизація)-->
<!--//   // далі, прив'язати посилання на товар до документу користувача (додати товар до кошика)-->
<!--// }-->