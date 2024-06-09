<!-- todo: uncomment   save activity btn -->
<!-- make functions to save activity -->

<template>
<div class="_container">
  <div class="content" v-if="activityPhotos.length > 0">
    <div class="activity-title">
      <h2 class="activity-title-header">{{activityData.name}}</h2>
      <div class="activity-title-category roboto-regular">
        {{activityData.category}}
      </div>
    </div>
    <div class="carousel-card-block">
      <div class="carousel-container">
        <v-carousel class="my-carousel">
          <v-carousel-item v-for="photo in activityPhotos" :key="photo"
                           :src="photo"
                           :alt="photo"
                           cover
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="info-card">
        <div class="card-item">
          <img src="/images/calendarIcon.svg" alt="Time:">
          <div class="activity-date roboto-bold">{{formattedDate}}</div>
        </div>
        <div class="card-item">
          <img src="/images/locationIcon.svg" alt="Location:">
          <div class="activity-address roboto-regular">{{activityData.cityName}}, {{activityData.streetName}} {{activityData.houseNumber}}</div>
        </div>
        <div class="artist-card-container">
            <img src="/images/artist_test_photo.jpg" alt="artist_test_photo">
            <div class="see-artist-info-btn_container">
              <button class="see-artist-info-btn roboto-medium">
                See artist
              </button>
            </div>
        </div>
<!--        <div class="add-to-favourite-btn-container">-->
<!--          <v-btn-->
<!--              class="add-to-favourite-btn"-->
<!--          >-->
<!--            save activity-->
<!--          </v-btn>-->
<!--        </div>-->
      </div>
    </div>
    <div class="activity-description">
      <h4>
        Activity description:
      </h4>
      <div class="roboto-regular">
        {{activityData.description}}
      </div>
    </div>
    <div class="expansion-panels-container">
      <v-expansion-panels>
        <v-expansion-panel
            title="About artist"
            text="There is not information about artist yet"
        >
        </v-expansion-panel>
        <v-expansion-panel
            title="Comments"
            text="There is not comments yet"
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="map-container">
      <LMap class="map" :zoom="16" :center="[activityData.coordinatesLat, activityData.coordinatesLng]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LMarker :lat-lng="[activityData.coordinatesLat, activityData.coordinatesLng]" />
      </LMap>
    </div>
    <div class="activities-container-component-container">
      <activities-container-component :cityName="activityData.cityName" :activity-id="activityData.activityId"></activities-container-component>
    </div>
  </div>
  <div class="spinner center" v-else>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
  </div>
</div>
</template>

<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL  } from "firebase/storage";
import ActivitiesContainerComponent from "~/components/activitiesContainerComponent.vue";

interface ActivityDataInterface {
  activityId: string,
  additionalPhotosRefs: string[],
  artistUid: string,
  category: string,
  cityAdmin: string,
  cityName: string,
  coordinatesLat: number,
  coordinatesLng: number,
  dateTimestamp: number,
  description: string,
  houseNumber: string,
  mainPhotoRef: string,
  name: string,
  streetName: string,
}
interface artistDataInterface{
  name: string,
}

const { $firestore } = useNuxtApp();
const storage = getStorage();
const route = useRoute();
const activityData = reactive<ActivityDataInterface>({
    activityId: '',
    additionalPhotosRefs: [],
    artistUid: '',
    category: '',
    cityAdmin: '',
    cityName: '',
    coordinatesLat: 0,
    coordinatesLng: 0,
    dateTimestamp: 0,
    description: '',
    houseNumber: '',
    mainPhotoRef: '',
    name: '',
    streetName: '',
});
const artistData = reactive<artistDataInterface>({
  name: '',
});
const activityPhotos = reactive<string[]>([]);


// get chosen activity from Firestore
async function getActivityData(){
  const docRef = doc($firestore, "activities", `${route.params.id}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    activityData.activityId = docSnap.id;
    activityData.additionalPhotosRefs = docSnap.data().additionalPhotosRefs;
    activityData.artistUid = docSnap.data().artistUid;
    activityData.category = docSnap.data().category;
    activityData.cityAdmin = docSnap.data().cityAdmin;
    activityData.cityName = docSnap.data().cityName;
    activityData.coordinatesLat = docSnap.data().coordinatesLat;
    activityData.coordinatesLng = docSnap.data().coordinatesLng;
    activityData.dateTimestamp = docSnap.data().dateTimestamp;
    activityData.description = docSnap.data().description;
    activityData.houseNumber = docSnap.data().houseNumber;
    activityData.mainPhotoRef = docSnap.data().mainPhotoRef;
    activityData.name = docSnap.data().name;
    activityData.streetName = docSnap.data().streetName;

    // get artist data from DB
    await getArtistData();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function getArtistData(){
  const docRef = doc($firestore, "users", `${activityData.artistUid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    artistData.name = docSnap.data().name;
  } else {
    console.log("No such document!");
  }
}

async function getActivityPhotos(){
  // get main photo
  if(activityData.mainPhotoRef){
    let mainPhoto: string = await getDownloadURL(storageRef(storage, activityData.mainPhotoRef));
    activityPhotos.push(mainPhoto);
  }

  // get additional photo
  if(activityData.additionalPhotosRefs.length > 0){
    for(let i = 0; i < activityData.additionalPhotosRefs.length; i++){
      let additionalPhoto: string = await getDownloadURL(storageRef(storage,  activityData.additionalPhotosRefs[i]));
      activityPhotos.push(additionalPhoto);
    }
  }
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
const formattedDate = computed(() => formatDate(activityData.dateTimestamp));

onBeforeMount(async () => {
  await getActivityData();
  await getActivityPhotos();
})

//width: 850px;
</script>

<style scoped>
.content{
  max-width: 1080px;
  margin: 26px auto 0;
}

/* activity title  -------------------------------------------------------*/
.activity-title-header{
  margin-bottom: 0;
}

.activity-title-category{
  display: inline-block;
  padding: 4px 5px;
  border: 1px solid darkgrey;
  border-radius: 5px;
  background-color: darkgrey;
  margin-top: 0;
  margin-bottom: 14px;
}

/* carousel-card-block ---------------------------------------------*/
.carousel-card-block{
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

/* carousel styles ------------------------------------------------ */
.carousel-container{
  width: 700px;
  height: 500px;
}

.my-carousel{
  border-radius: 25px;
}

/* card styles  -----------------------------------------------------*/
.info-card{
  width: 350px;
  max-height: 500px;
  border-radius: 12px;
  border: 1px solid darkgrey;
  padding: 15px 25px 15px 25px;
}

.card-item{
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.card-item > img{
  margin-right: 8px;
}

.add-to-favourite-btn-container{
  margin-top: 12px;
}

.add-to-favourite-btn{
  width: 100%;
  background: #000;
  color: white;
}

.artist-card-container{
  width: 100%;
  height: 130px;
  display: flex;
}

.artist-card-container > img{
  width: 50%;
  height: 100%;
  border-radius: 15px 0 0 15px;
}

.see-artist-info-btn_container{
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: end;
  border-radius: 0 15px 15px 0;
  background-color: lightgrey;
}

.see-artist-info-btn{
  color: black;
  font-size: large;
  margin-bottom: 20px;
}

/* activity description  -------------------------------------------------------*/
.activity-description{
  width: 700px;
  padding: 15px 5px 15px 5px;
  margin-bottom: 8px;
}

/* expansion panels container  -------------------------------------------------------*/
.expansion-panels-container{
  width: 700px;
  margin-bottom: 16px;
}

.map-container{
  width: 700px;
  height: 350px;
  margin-bottom: 32px;
}

.map{
  height: 100%;
  width: 100%;
}

.activities-container-component-container {
  max-width: 1080px;
  margin-bottom: 30px;
}

/* make RWD ----------------------------------------------------------------------------*/
@media (max-width: 1110px) {
  .content{
    max-width: 730px;
    padding: 0 15px;
  }

  .carousel-card-block{
    flex-direction: column;
  }

  .info-card{
    border: 0;
    padding: 25px 0 15px 5px;
  }

  .add-to-favourite-btn{
    height: 60px;
  }
}

@media (max-width: 760px) {
  .content{
    max-width: 530px;
  }

  .carousel-container{
    width: 500px;
    height: 450px;
    margin-bottom: 50px;
  }

  .activity-description{
    width: 500px;
  }

  .expansion-panels-container{
    width: 500px;
  }

  .map-container{
    width: 500px;
    height: 400px;
    margin-bottom: 32px;
  }
}

@media (max-width: 560px) {
  ._container{
    padding: 0 5px 0 5px;
  }

  .content{
    max-width: 320px;
    padding: 0 0 0 0;
  }

  .carousel-container{
    width: 310px;
    height: 460px;
  }

  .info-card{
    width: 310px;
    padding: 15px 0 15px 0;
  }

  .activity-description{
    width: 310px;
  }

  .expansion-panels-container{
    width: 310px;
  }

  .map-container{
    width: 310px;
    height: 400px;
    margin-bottom: 32px;
  }
}
</style>