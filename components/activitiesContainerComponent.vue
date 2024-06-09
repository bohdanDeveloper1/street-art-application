<template>
  <div class="_container">
    <h2 class="other-activities-title" v-if="props.cityName !== '' && activitiesData.length > 0">Other activities in {{props.cityName}}</h2>
    <div class="cards-container" v-if="activitiesData.length > 0">
      <activity-component
          v-for="activity in activitiesData"
          :key="activity.id"
          :activityId="activity.id"
          :mainPhotoRef="activity.mainPhotoRef"
          :name="activity.name"
          :cityAdmin="activity.cityAdmin"
          :cityName="activity.cityName"
          :streetName="activity.streetName"
          :houseNumber="activity.houseNumber"
          :category="activity.category"
          :dateTimestamp="activity.dateTimestamp"
      />
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
import { collection, query, where, getDocs } from "firebase/firestore";

interface activityData{
  id: string,
  mainPhotoRef: string,
  name: string,
  cityAdmin: string,
  cityName: string,
  streetName:string,
  houseNumber:  string,
  category: string,
  dateTimestamp: number,
}

const props = defineProps<{
  cityName?: string
  activityId?: string
}>();

// Firestore
const { $firestore } = useNuxtApp();
const timestampNow = ref<number>();
const activitiesData = reactive<activityData[]>([]);

function getTimestampNow(){
  const currentDate = new Date();
  timestampNow.value = currentDate.getTime();
}

// get activities from Firestore
async function getActivities(): Promise<void>{
  let q;
  let querySnapshot;
  const citiesRef = collection($firestore, "activities");
  // якщо користувач обрав місто, то фільтрую активності:
  if(props.cityName !== '' && props.activityId !== ''){
    q = query(citiesRef, where("cityName", "==", props.cityName), where("dateTimestamp", ">", timestampNow.value));

    const data = await getDocs(q);
    querySnapshot = data.docs.filter(doc => doc.id !== props.activityId);
  }else { // інакше показую всі активності
    q = query(citiesRef, where("dateTimestamp", ">=", timestampNow.value));

    querySnapshot = await getDocs(q);
  }
  querySnapshot.forEach((doc: any) => {
    const activity = {
      // Фото, назви активності, назва міста, назва вулиці і номер будинку, категорії,  дати, часу.
      id: doc.id,
      mainPhotoRef: doc.data().mainPhotoRef,
      name: doc.data().name,
      cityAdmin: doc.data().cityAdmin,
      cityName: doc.data().cityName,
      streetName: doc.data().streetName,
      houseNumber:  doc.data().houseNumber,
      category: doc.data().category,
      dateTimestamp: doc.data().dateTimestamp,
    };
    activitiesData.push(activity);
  });
}
onBeforeMount(async () => {
  getTimestampNow();
  await getActivities();
})
</script>

<style scoped>
.other-activities-title{
  margin-top: 5px;
  margin-bottom: -12px;
  display: flex;
  justify-content: center;
}

.cards-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  justify-content: space-evenly;
}
</style>