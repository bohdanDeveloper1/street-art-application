<template>
  <div class="_container">
    <div v-if="!ifActivityWasAdded">
      <div class="form-container">
        <!-- Error alert -->
        <div v-if="mapErrorMessage !== '' ">
          <v-alert
              :title="mapErrorMessageTitle"
              :text="mapErrorMessage"
              type="error"
          ></v-alert>
        </div>
        <form>
          <h2 class="form-header">Create an activity</h2>

          <div class="flex-container">
            <div class="left-group-container">
              <!--activityName-->
              <div class="form-item-container">
                <v-text-field
                    v-model="activityName.value.value"
                    :counter="50"
                    :error-messages="activityName.errorMessage.value"
                    label="Activity name"
                    variant="solo"
                    density="compact"
                ></v-text-field>
              </div>

              <!--  activityDateTime   -->
              <div class="form-datepicker-container">
                <VueDatePicker
                    v-model="activityDateTime.value.value"
                    class="vue-datepicker"
                >
                </VueDatePicker>
                <p class="my-error-message" v-if="activityDateTime.errorMessage.value">{{activityDateTime.errorMessage.value}}</p>
              </div>

              <!-- Categories selector  -->
              <div class="form-item-container">
                <v-autocomplete
                    label="Category"
                    v-model="activityCategory.value.value"
                    :items="artCategories"
                    :error-messages="activityCategory.errorMessage.value"
                    variant="solo"
                    density="compact"
                ></v-autocomplete>
              </div>

              <!--   Cities selector-->
              <div class="form-item-container">
                <v-autocomplete
                    label="City"
                    v-model="activityCity.value.value"
                    @change="showCityOnMap"
                    :items="citiesDataArray"
                    :error-messages="activityCity.errorMessage.value"
                    variant="solo"
                    density="compact"
                ></v-autocomplete>
              </div>

              <!--   Street input -->
              <div class="form-item-container">
                <v-text-field
                    v-model="activityStreet.value.value"
                    @change="showCityAndStreetOnMap"
                    :counter="50"
                    :error-messages="activityStreet.errorMessage.value"
                    label="Street"
                    variant="solo"
                    density="compact"
                ></v-text-field>
              </div>

              <!--   HouseNumber input -->
              <div class="form-item-container">
                <v-text-field
                    v-model="activityHouseNumber.value.value"
                    @change="showCityAndStreetAndHouseOnMap"
                    label="House number (optional)"
                    variant="solo"
                    :counter="5"
                    density="compact"
                ></v-text-field>
              </div>
            </div>

            <!-- Map component -->
            <div class="leafletMapContainer">
               <LMap class="leafletMap" style="height: 100%; width: 100%" :zoom="mapZoom" :center="[mapCenterLat, mapCenterLng]">
                 <LTileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                     layer-type="base"
                     name="OpenStreetMap"
                 />
                 <LMarker v-if="showMarker" :lat-lng="[markerLat, markerLng]" draggable @dragend="updateMarkerLatLng" />
               </LMap>
            </div>
          </div>

          <!-- activityDescription -->
          <div class="form-item-container">
            <v-textarea
                label="Describe your activity"
                v-model="activityDescription.value.value"
                :error-messages="activityDescription.errorMessage.value"
                variant="solo"
                :counter="1500"
            >
            </v-textarea>
          </div>

          <!-- activityMainPhoto -->
          <div class="form-item-container">
            <v-file-input
                label="Main photo to describe activity"
                @input="setMainActivityImage"
                v-model="activityMainPhoto.value.value"
                :error-messages="activityMainPhoto.errorMessage.value"
                accept="image/*"
                variant="solo"
                chips
                density="compact"
                show-size
            ></v-file-input>
          </div>

          <!-- activityAdditionalPhotos -->
          <div class="form-item-container">
            <v-file-input
                label="Additional photos (max 5, optional)"
                @input="setAdditionalActivityImage"
                v-model="activityAdditionalPhotos.value.value"
                :error-messages="activityAdditionalPhotos.errorMessage.value"
                accept="image/*"
                variant="solo"
                chips
                multiple
                counter
                density="compact"
            ></v-file-input>
          </div>

          <!-- submitBTN -->
          <v-btn
              class="me-4 submit-button"
              @click="submit"
          >
            create an activity
          </v-btn>
        </form>
      </div>
    </div>
    <div v-else class="activity-added-container">
      <div class="activity-added-img">
        <img class="form-added-success-img" src="/images/success_icon.png" alt="success">
      </div>
      <h2>Success!</h2>
      <h5>Activity was added</h5>
      <v-btn
          class="link-button"
      >
        <NuxtLink to="/admin/myActivities" class="link-item">go to my activities</NuxtLink>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {useField, useForm} from 'vee-validate'
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

// firebase
const { $firestore } = useNuxtApp();
const storage = getStorage();
const userUidCookie = useCookie('userUidCookie');
const userUid = userUidCookie.value;

// activity was added
const ifActivityWasAdded = ref(false);

// map configuration
const mapZoom = ref(6);
const mapCenterLat = ref(52.215933);
const mapCenterLng = ref(19.134422);
const showMarker = ref(false);
const markerLat = ref();
const markerLng = ref();
const mapErrorMessage = ref('');
const mapErrorMessageTitle = ref('');

// activity categories
const artCategoriesList = await getArtCategoriesList();
const artCategories = computed(() => {
  return artCategoriesList.map(item => item.name);
})

// activity cities
const citiesDataJSON = await getCitiesData();

// citiesDataArray to autocomplete
const citiesDataArray = computed(() =>{
  return citiesDataJSON.map(city => city.name + ', ' + city.admin_name);
});

// activity photos
const activityMainPhotoFile = ref();
const activityAdditionalPhotoesFiles = ref([]);

// validation rules
const { handleSubmit } = useForm({
  validationSchema: {
    name (value) {
      if (value?.length >= 3 && value?.length <= 50) return true

      return 'Name needs to be at least 3 characters.'
    },
    dateTime (value) {
      if (value) return true

      return 'Select date and time please'
    },
    category (value) {
      if (value) return true

      return 'Select a category please'
    },
    city (value) {
      if (value) return true

      return 'Select a city please'
    },
    // street and number
    description (value) {
      if (value?.length > 2 && value?.length < 1500) return true

      return 'Description must be more than 2 and less than 1500 characters'
    },
    mainPhoto (value) {
      if (value) return true

      return 'Select a photo please'
    },
    additionalPhotos (value) {
      if (!value || value?.length <= 5) return true

      return 'Max number of photos is 5'
    },
    street (value){
      if(value?.length >= 3 && value?.length <= 50) return true;

      return 'Please enter valid street'
    },
    houseNumber (value) {
      if(value?.length < 6) return true;

      return 'Max house number length is 5'
    }
  },
})
const activityName = useField('name');
const activityDateTime = useField('dateTime');
const activityCategory = useField('category');
const activityCity = useField('city');
const activityDescription = useField('description');
const activityMainPhoto = useField('mainPhoto');
const activityAdditionalPhotos = useField('additionalPhotos');
const activityStreet = useField('street');
const activityHouseNumber = useField('houseNumber');

const submit = handleSubmit(async (values) =>{
  await addActivity();
});

async function addActivity() {
  const activityDateTimestamp = activityDateTime.value.value.getTime();
  const activityCityData = await getActivityCityData();
  // send photos to Storage
  const mainPhotoRef = await addMainActivityPhoto(activityDateTimestamp);
  const arrayOfAdditionalPhotosRefs = await addAdditionalActivityPhotos(activityDateTimestamp);
  // send data to Firebase
  await addDoc(collection($firestore, "activities"), {
    artistUid: userUid,
    name: activityName.value.value.trim(),
    dateTimestamp: activityDateTimestamp,
    category: activityCategory.value.value,
    // city coordinates
    cityName: activityCityData.name,
    cityAdmin: activityCityData.admin_name,
    coordinatesLat: markerLat.value,
    coordinatesLng: markerLng.value,
    // street and house info
    streetName: activityStreet.value.value.trim(),
    houseNumber: activityHouseNumber.value.value !== undefined && activityHouseNumber.value.value !== '' ? activityHouseNumber.value.value : null,
    description: activityDescription.value.value.trim(),
    mainPhotoRef: mainPhotoRef,
    additionalPhotosRefs: arrayOfAdditionalPhotosRefs,
  });

  ifActivityWasAdded.value = true;
}

async function addMainActivityPhoto(activityDateTimestamp){
  // Create a reference to 'images/activityPhoto ...'
  const url =  'images/' + 'activityPhoto' + activityName.value.value.trim() + activityDateTimestamp.toString();
  const activityPhotoRef = storageRef(storage, url);
  await uploadBytes(activityPhotoRef, activityMainPhotoFile.value);

  return url;
}

async function addAdditionalActivityPhotos(activityDateTimestamp){
  let urlsArray = [];

  if(activityAdditionalPhotoesFiles.value.length > 0){
    for(let i = 0; i < activityAdditionalPhotoesFiles.value.length; i++) {
      const url = 'images/' + 'additionalPhoto' + i.toString() + activityName.value.value.trim() + activityDateTimestamp.toString();
      urlsArray.push(url);
      const activityPhotoRef = storageRef(storage, url);
      await uploadBytes(activityPhotoRef, activityAdditionalPhotoesFiles.value[i]);
    }
  }
  return urlsArray;
}

async function getCitiesData(){
  // отримую дані від сервера
  const { data } = await useFetch('/api/citiesList');
  // повертаю - тільки потрібний масив данних: citiesListData
  return data.value.sortedCitiesListData;
}

async function getArtCategoriesList(){
  // отримую дані від сервера
  const { data } = await useFetch('/api/artCategoriesList');
  // повертаю - тільки потрібний масив данних:
  return data.value.artCategoriesList;
}

function getActivityCityData(){
  const cityData = activityCity.value.value;
  const parts = cityData.split(", ");

  const cityName = parts[0];
  const cityAdminName = parts[1];

  return  citiesDataJSON.find(city => {
    return city.name === cityName && city.admin_name === cityAdminName
  });
}

function setMainActivityImage(event){
  activityMainPhotoFile.value = event.target.files[0];
}

function setAdditionalActivityImage(event){
  if(event.target.files.length > 0 && event.target.files.length <= 5){
    activityAdditionalPhotoesFiles.value = event.target.files;
  }
}

function scrollToTop() {
  document.documentElement.scrollTop = 0; // For modern browsers
  document.body.scrollTop = 0; // For older browsers
}

async function showCityOnMap(){
  try {
    const cityData = activityCity.value.value;
    // Розділення рядка за допомогою коми та пробілу
    const [city, district] = cityData.split(", ");
    // запит до API для отримання координат міста
    const response  = await fetch(`https://geocode.maps.co/search?q=${city}+${district}+Poland&api_key=659450539ff1f762862410sea796255`);
    const data = await response.json();

    // Якщо результати є, беремо перший результат
    if (data.length > 0) {
      const activityCoordinates = data[0];

      mapCenterLat.value = Number(activityCoordinates.lat);
      mapCenterLng.value = Number(activityCoordinates.lon);
      mapZoom.value = 12;
      activityStreet.value.value = '';
      activityHouseNumber.value.value = '';
    }
  } catch (error) {
    // Обробка помилок, наприклад, у випадку невдалих запитів до API
    console.log('Error during fetching data for mapCenter from geocode.maps API:', error);
  }
}

async function showCityAndStreetOnMap(){
  if(activityCity.value.value !== undefined && activityCity.value.value !== ''){
    try {
      const cityData = activityCity.value.value;
      const [city, district] = cityData.split(", ");
      // запит до API для отримання координат міста та вулиці
      const response  = await fetch(`https://geocode.maps.co/search?q=${activityStreet.value.value.trim()}+${city}+${district}+Poland&api_key=659450539ff1f762862410sea796255`);
      const data = await response.json();

      // Якщо результати є, беремо перший результат
      if (data.length > 0) {
        const activityCoordinates = data[0];

        mapCenterLat.value = Number(activityCoordinates.lat);
        mapCenterLng.value = Number(activityCoordinates.lon);
        markerLat.value = mapCenterLat.value;
        markerLng.value = mapCenterLng.value;
        showMarker.value = true;
        mapZoom.value = 17;

        activityHouseNumber.value.value = '';
        mapErrorMessageTitle.value = '';
        mapErrorMessage.value = '';
      }else{ // якщо не знайдено координати
        mapErrorMessageTitle.value = `No such street in ${activityCity.value.value}`;
        mapErrorMessage.value = `Please enter valid street name.`;
        scrollToTop();
      }
    } catch (error) {
      // Обробка помилок, наприклад, у випадку невдалих запитів до API
      console.log('Error during fetching data for mapCenter from geocode.maps API:', error);
      mapErrorMessageTitle.value = `No such street in ${activityCity.value.value}`;
      mapErrorMessage.value = `Please enter valid street name.`;
      scrollToTop();
    }
  }else{ // якщо не обрано місто
    activityCity.value.value = '';
    activityStreet.value.value = '';
    mapErrorMessageTitle.value = `Unselected city`;
    mapErrorMessage.value = 'Select city, then input street name';
    scrollToTop();
  }
}

async function showCityAndStreetAndHouseOnMap(){
  if(activityCity.value.value !== undefined && activityCity.value.value !== '' && activityStreet.value.value !== undefined && activityStreet.value.value !== ''){
    try {
      const cityData = activityCity.value.value;
      const [city, district] = cityData.split(", ");
      // запит до API для отримання координат міста та вулиці
      const response  = await fetch(`https://geocode.maps.co/search?street=${activityStreet.value.value.trim()}+${activityHouseNumber.value.value.trim()}&city=${city}&country=Poland&api_key=659450539ff1f762862410sea796255`);
      const data = await response.json();

      // Якщо результати є, беремо перший результат
      if (data.length > 0) {
        const activityCoordinates = data[0];

        mapCenterLat.value = Number(activityCoordinates.lat);
        mapCenterLng.value = Number(activityCoordinates.lon);
        markerLat.value = mapCenterLat.value;
        markerLng.value = mapCenterLng.value
        showMarker.value = true;
        mapZoom.value = 17;

        mapErrorMessageTitle.value = '';
        mapErrorMessage.value = '';
      }else{
        mapErrorMessageTitle.value = `No such house number in ${activityCity.value.value}, ${activityStreet.value.value}`;
        mapErrorMessage.value = 'Please enter valid house number';
        scrollToTop();
      }
    } catch (error) {
      // Обробка помилок, наприклад, у випадку невдалих запитів до API
      console.log('Error during fetching data for mapCenter from geocode.maps API:', error);
      mapErrorMessageTitle.value = `No such house number in ${activityCity.value.value}, ${activityStreet.value.value}`;
      mapErrorMessage.value = 'Please enter valid house number';
      scrollToTop();
    }
  }else{
    activityCity.value.value = '';
    activityStreet.value.value = '';
    activityHouseNumber.value.value = '';
    mapErrorMessageTitle.value = 'Unselected city or street';
    mapErrorMessage.value = 'Please select city and street, then enter valid house number';
    scrollToTop();
  }
}

async function updateDataAfterMarkerDragged(lat, lon){
  try {
    const response  = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=659450539ff1f762862410sea796255`);
    const data = await response.json();
    activityStreet.value.value = data.address.road;
    activityHouseNumber.value.value = data.address.house_number ? data.address.house_number : "";
  } catch (error) {
    console.log('Error during dragging the marker:', error);
  }
}

const updateMarkerLatLng = async (event) => {
  const updatedMarkerCoordinates = event.target.getLatLng();
  markerLat.value = updatedMarkerCoordinates.lat;
  markerLng.value = updatedMarkerCoordinates.lng;
  await updateDataAfterMarkerDragged(updatedMarkerCoordinates.lat, updatedMarkerCoordinates.lng);
};
</script>

<style scoped>
/* form-container ------------------------------------------------------*/
.form-container{
  margin: 24px auto 40px auto;
  min-height: 100vh;
  width: 400px;
  padding: 0 15px;
}

.form-item-container{
  margin-bottom: 8px;
}

.leafletMapContainer{
  height: 400px;
  margin-bottom: 24px;
}

.form-datepicker-container{
  margin-bottom: 22px;
}

.form-header{
  margin-bottom: 20px;
}

/* make RWD  -----------------------------------------------------------------*/
@media (max-width: 430px) {
  ._container{
    padding: 0 10px 0 10px;
  }

  .form-container{
    margin-top: 16px;
    width: 300px;
    padding: 0 0;
  }
}

@media (min-width: 1000px) {
  .form-container{
    width: 900px;
    background-color: white;
    border-radius: 15px;
    padding: 15px 15px 15px 15px;


    /* shadow */
   -webkit-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
   -moz-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
   box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
  }

  .flex-container{
    display: flex;
    justify-content: space-between;
  }

  .left-group-container{
    width: 300px;
  }

  .leafletMapContainer{
    height: 380px;
    width: 550px;
  }
}

/* activity-added-container --------------------------------------------------*/
.activity-added-container{
  margin: 60px auto 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 350px;
  border-radius: 15px;

  /* shadow */
  -webkit-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
}

.activity-added-img{
  margin-bottom: 20px;
}

.form-added-success-img{
  width: 150px;
  height: 150px;
}

/* make RWD  --------------------------------------------------------------------*/
@media (max-width: 515px) {
  .activity-added-container{
    width: 320px;
  }
}
@media (max-width: 355px) {
  .activity-added-container{
    width: 290px;
  }
}

.my-error-message{
  padding-top: 4px;
  padding-left: 14px;
  line-height: 12px;
  transition-duration: 150ms;
  color: rgb(176, 0, 32);
  font-weight: 400;
  font-size: 12px;
}

.submit-button{
  background: #000;
  color: white;
}

.link-button{
  margin-top: 25px;
  background: #000;
}

.link-item{
  display: flex;
  justify-content: center;
  color: white;
}

.valid input,
.valid select,
.valid textarea,
.valid select{
  border: 1px solid green;
}

.error input,
.error select,
.error textarea,
.error select{
  border: 1px solid red;
}
</style>