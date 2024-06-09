<template>
  <div class="_container">
    <div class="title-container">
      <h2 class="title">My activities</h2>
    </div>
    <div class="cards-container">
      <artist-activity-component
          v-for="activity in userActivitiesData"
          :key="activity.id"
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
  </div>
</template>

<script setup lang="ts">
import { collection, query, where, getDocs } from "firebase/firestore";

interface userActivityData{
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

const { $firestore } = useNuxtApp();
const userActivitiesData = reactive<userActivityData[]>([]);

// get artist activities from Firestore
async function getArtistActivities(){
  const userUidCookie = useCookie('userUidCookie');
  const q = query(collection($firestore, "activities"), where("artistUid", "==", userUidCookie.value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      const activity = {
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
    userActivitiesData.push(activity);
  });
}

onBeforeMount(async () => {
  await getArtistActivities();
})
</script>

<style scoped>
.title-container{
  display: flex;
  justify-content: center;
  margin: 20px 0 -10px 0;
}

.cards-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  justify-content: space-evenly;
}
</style>