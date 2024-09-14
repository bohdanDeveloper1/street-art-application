<script setup lang="ts">
import { getStorage, ref as storageRef, getDownloadURL  } from "firebase/storage";

interface IDateList{
  start: string,
  end: string,
}
const props = defineProps<{
  activityId: String,
  mainPhotoRef: String,
  name: String,
  cityAdmin: String,
  cityName: String,
  streetName: String,
  houseNumber:  String,
  category: String,
  activityDates: {start: number, end: number}[],
}>();
const router = useRouter();

const dateNow = new Date();
const isFavorite = ref(false);
const activityMainPhoto = ref();
const isAdditionalInfoHovered = ref<boolean>(false);
// filteredDatesStartEnd дати початку та кінця активності, які > new Date().
const filteredDatesStartEnd = computed(() => {
  const datesStartEnd = reactive<IDateList[]>([]);

  for(let i = 0; i < props.activityDates.length; i++){
    if(props.activityDates[i].end > dateNow.getTime()){
      const dateStart = new Date(props.activityDates[i].start);
      const dateEnd = new Date(props.activityDates[i].end);

      let minutes: string = '';
      if(dateStart.getMinutes() < 10){
        minutes = `0${dateStart.getMinutes()}`
      }else{
        minutes = dateStart.getMinutes().toString()
      }
      const timeStart = dateStart.toDateString() + ', ' + dateStart.getHours() + ':' + minutes;

      if(dateEnd.getMinutes() < 10){
        minutes = `0${dateEnd.getMinutes()}`
      }else{
        minutes = dateEnd.getMinutes().toString()
      }
      const timeEnd = dateEnd.toDateString() + ', ' + dateEnd.getHours() + ':' + minutes;

      datesStartEnd.push({start: timeStart, end: timeEnd});
    }
  }
  return datesStartEnd;
});

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

onBeforeMount(async () => {
  const storage = getStorage();
  activityMainPhoto.value = await getDownloadURL(storageRef(storage, props.mainPhotoRef));
});
</script>

<template>
  <div class="card-container">
    <div class="card" v-if="activityMainPhoto">
      <img :src="activityMainPhoto" class="card-img" :alt="mainPhotoRef">
      <div class="card-body activity">
        <div class="activity-category roboto-regular">{{props.category}}</div>
        <h4 class="activity-title">{{props.name}}</h4>
        <div class="activity-time">
          <div class="activity-date">{{filteredDatesStartEnd[0].start}}</div>
          <div class="info-svg-container"
               @mouseover="isAdditionalInfoHovered = true"
               @mouseout="isAdditionalInfoHovered = false"
               @click="isAdditionalInfoHovered = !isAdditionalInfoHovered"
          >
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="1.4em"
                 height="1.4em"
                 viewBox="0 0 24 24"
            >
              <path fill="black" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
            </svg>
            <div class="start-end-dates-container"
                 v-if="isAdditionalInfoHovered"
            >
              <div class="start-end-dates-info">Also at:</div>
              <div v-for="item in filteredDatesStartEnd">
                <div>
                  <span>{{item.start}}</span>
                  <span style="margin-left: 8px;">-</span>
                  <span style="margin-left: 8px;">{{item.end}}</span>
                </div>
                <hr style="margin-top: 8px">
              </div>
            </div>
          </div>
        </div>
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
          height="380"
          type="image, article"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<style scoped>
.card-container{
  padding: 0 12px;
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

.info-svg-container{
  position: relative;
}

.info-svg-container > svg{
  margin-top: -4px;
  margin-left: 8px;
  cursor: pointer;
}

.activity-time{
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 8px;
}

.start-end-dates-container{
  position: absolute;
  padding: 16px 12px 8px 12px;
  top:20px;
  left: -100px;
  width: 400px;
  background-color: white;
  border-radius: 10px;
  z-index: 100;

  -webkit-box-shadow: 1px 5px 16px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 5px 16px 0px rgba(66, 68, 90, 1);
  box-shadow: 1px 5px 16px 0px rgba(66, 68, 90, 1);
}

.start-end-dates-info{
  margin-bottom: 16px;
  font-weight: bold;
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