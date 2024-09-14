<!-- todo:
  переробити перевірку логування користувача
  зробити логіку для збереження активностей до улюблених
 -->
<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL  } from "firebase/storage";
import { getAuth } from "firebase/auth";
import FirebaseAuthComponent from "~/components/auth/FirebaseAuthComponent.vue";
import { useAddCommentStore } from "~/stores/addComment";
import { storeToRefs } from 'pinia'
import CommentRating from "~/components/activityDetails/CommentRating.vue";

interface IActivityData {
  activityId: string,
  additionalPhotosRefs: string[],
  artistUid: string,
  category: string,
  cityAdmin: string,
  cityName: string,
  coordinatesLat: number,
  coordinatesLng: number,
  activityDates: {start: number, end: number}[],
  description: string,
  houseNumber: string,
  mainPhotoRef: string,
  name: string,
  streetName: string,
}
interface artistDataInterface{
  name: string,
}
interface IActivityComment{
  authorName: string,
  ratingInStars: number,
  message: string,
  date: number
}
interface IDateList{
  start: string,
  end: string,
}

const { $firestore } = useNuxtApp();
const storage = getStorage();
const route = useRoute();
const addCommentStore = useAddCommentStore();
const { showFirebaseAuthComponent, showAddCommentComponent } = storeToRefs(addCommentStore);
const userUid = ref<string>('');

const activityData = reactive<IActivityData>({
    activityId: '',
    additionalPhotosRefs: [],
    artistUid: '',
    category: '',
    cityAdmin: '',
    cityName: '',
    coordinatesLat: 0,
    coordinatesLng: 0,
    activityDates: [],
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
const activityComments = reactive<IActivityComment[]>([]);
const dateNow = new Date();

// rating variables
const showRatingLoader = ref(false);
const showActivityComments = ref(false);
const oneStarRating = ref(0);
const twoStarRating = ref(0);
const threeStarRating = ref(0);
const fourStarRating = ref(0);
const fiveStarRating = ref(0);
const ratingSum = ref(0);
const averageRating = ref(0);

// filteredDatesStartEnd дати початку та кінця активності, які > new Date().
const filteredDatesStartEnd = computed(() => {
  const datesStartEnd = reactive<IDateList[]>([]);

  for(let i = 0; i < activityData.activityDates.length; i++){
    if(activityData.activityDates[i].end > dateNow.getTime()){
      const dateStart = new Date(activityData.activityDates[i].start);
      const dateEnd = new Date(activityData.activityDates[i].end);

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
})

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
    activityData.activityDates = docSnap.data().activityDates;
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

async function getActivityComments(){
  showRatingLoader.value = true;

  // оновлення значень для рейтингу
  activityComments.length = 0;
  oneStarRating.value = 0;
  twoStarRating.value = 0;
  threeStarRating.value = 0;
  fourStarRating.value = 0;
  fiveStarRating.value = 0;
  ratingSum.value = 0;
  averageRating.value = 0;

  const q = query(collection($firestore, "comments"), where("activityUid", "==", `${activityData.activityId}`));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const activityComment: IActivityComment = {
      authorName: doc.data().authorName,
      ratingInStars: doc.data().ratingInStars,
      message: doc.data().message,
      date: doc.data().date
    }

    if(activityComment.ratingInStars === 1) oneStarRating.value++;
    if(activityComment.ratingInStars === 2) twoStarRating.value++;
    if(activityComment.ratingInStars === 3) threeStarRating.value++;
    if(activityComment.ratingInStars === 4) fourStarRating.value++;
    if(activityComment.ratingInStars === 5) fiveStarRating.value++;
    ratingSum.value += activityComment.ratingInStars;

    activityComments.push(activityComment)
  });

  averageRating.value = ratingSum.value / activityComments.length;
  showRatingLoader.value = false;
}

async function addActivityComment(){
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null && user.emailVerified) {
    addCommentStore.showAddCommentComponent = true;
    userUid.value = user.uid;
  }else{
    addCommentStore.logInDuringAddingComment = true;
    addCommentStore.showFirebaseAuthComponent = true;
  }
}

// no scroll watchers
watch(showFirebaseAuthComponent, (newValue) =>{
  if(newValue === true){
    document.documentElement.classList.add('no-scroll');
  }else{
    document.documentElement.classList.remove('no-scroll');
  }
})

onBeforeMount(async () => {
  await getActivityData();
  await getActivityPhotos();
  await getActivityComments();
});
</script>

<template>
  <div>
    <div v-if="showFirebaseAuthComponent" class="auth-component-container">
      <div class="auth-component">
        <firebase-auth-component></firebase-auth-component>
      </div>
    </div>
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
          <div class="card-dates-item">
            <img src="/images/calendarIcon.svg" alt="Time:">
            <div class="activity-dates">
              <div class="roboto-bold" style="margin: 8px 0;">
                {{filteredDatesStartEnd[0].start}}
              </div>
              <div class="start-end-dates-container">
                <div class="start-end-dates-info" style="margin-bottom: 6px;">Also at:</div>
                <div v-for="item in filteredDatesStartEnd">
                  <div>
                    <div style="margin-bottom: 4px;"><span class="roboto-bold">Start:</span> {{item.start}}</div>
                    <div><span class="roboto-bold">End:</span> {{item.end}}</div>
                  </div>
                  <hr style="margin-top: 4px">
                </div>
              </div>
            </div>
          </div>
          <div class="card-item">
            <img src="/images/locationIcon.svg" alt="Location:">
            <div class="activity-address roboto-bold">{{activityData.cityName}}, {{activityData.streetName}} {{activityData.houseNumber}}</div>
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
      <!--    <div class="activities-container-component-container">-->
      <!--      <activities-container-component :cityName="activityData.cityName" :activity-id="activityData.activityId"></activities-container-component>-->
      <!--    </div>-->
      <div class="comments-container">
        <!--  Show loader   -->
        <div v-if="showRatingLoader === true" class="show-rating-loader">
          <loader-component width="40px" height="40px"></loader-component>
        </div>
        <!--  Show statistics  -->
        <div v-if="activityComments.length > 0 && showRatingLoader === false">
          <h4>Activity comments:</h4>
          <comment-rating
              :oneStarRating="oneStarRating"
              :twoStarRating="twoStarRating"
              :threeStarRating="threeStarRating"
              :fourStarRating="fourStarRating"
              :fiveStarRating="fiveStarRating"
              :numberOfComments="activityComments.length"
              :averageRating="averageRating"
          ></comment-rating>
          <button v-if="showAddCommentComponent === false" class="add-comment-btn" @click="addActivityComment">
            Add comment
          </button>
        </div>
        <!--  Show no comments -->
        <div v-if="activityComments.length === 0">
          <h4> No comments yet</h4>
          <button v-if="showAddCommentComponent === false" class="add-comment-btn" @click="addActivityComment">
            Add comment
          </button>
        </div>
        <!--  Show add comment  -->
        <div v-if="showAddCommentComponent === true" class="add-comment-container">
          <activity-details-add-comment
              :user-uid="userUid"
              :activity-uid="activityData.activityId"
              :artist-uid="activityData.artistUid"
              @get-comments="getActivityComments"
          ></activity-details-add-comment>
        </div>
        <!--  Show see comments btn  -->
        <div v-if="activityComments.length > 0 && showRatingLoader === false">
          <button  class="see-comments-btn" @click="showActivityComments = !showActivityComments">
            See comments
          </button>
        </div>
        <!--   Comments  components   -->
        <div v-if="showActivityComments"  v-for="(item, index) in activityComments" :key="index">
          <activity-details-comment
              :author-name="item.authorName"
              :rating-in-stars="item.ratingInStars"
              :message="item.message"
          ></activity-details-comment>
        </div>
      </div>
    </div>
    <div v-else>
     <page-loader-component></page-loader-component>
    </div>
    <div v-if="showFirebaseAuthComponent" class="overlay" @click="addCommentStore.showFirebaseAuthComponent = false"></div>
  </div>
</template>

<style scoped>
.comments-container{
  background-color: white;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 60px;
}

.auth-component-container{
  display: flex;
  justify-content: center;
}

.auth-component{
  position: fixed;
  z-index: 1001;
}

.content{
  max-width: 1080px;
  margin: 26px auto 0;
}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  z-index: 1000;
  top: 0;
  left: 0;
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
  border-radius: 12px;
  border: 1px solid darkgrey;
  padding: 16px;
}

.card-item{
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.card-dates-item{
  display: flex;
  margin-bottom: 8px;
  align-items: start;
}

.card-item > img, .card-dates-item > img{
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

/* loader ----------------------------------------------------------------------------*/
.show-rating-loader{
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

/* comments  ---------------------------------------------------------------------------*/
.add-comment-btn{
  width: 100%;
  margin-top: 8px;
  padding: 16px 0;
  border-radius: 5px;
  border: 1px solid lightgrey;
}

.see-comments-btn{
  width: 100%;
  margin-bottom: 24px;
  padding: 16px 0;
  border-radius: 5px;
  border: 1px solid lightgrey;
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