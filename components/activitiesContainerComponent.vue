<script setup lang="ts">
import { collection, query, where, getDocs } from "firebase/firestore";

interface IActivityData{
  id: string,
  mainPhotoRef: string,
  name: string,
  cityAdmin: string,
  cityName: string,
  streetName:string,
  houseNumber:  string,
  category: string,
  activityDates: {start: number, end: number}[],
  activityEnd: number
}

const props = defineProps<{
  cityName?: string
  activityId?: string
}>();
const { $firestore } = useNuxtApp();
const activitiesData = reactive<IActivityData[]>([]);

async function getActivities(): Promise<void>{
  let q;
  let querySnapshot;
  const citiesRef = collection($firestore, "activities");
  // якщо користувач обрав місто, то фільтрую активності:
  if(props.cityName !== '' && props.activityId !== ''){
    // todo: activityDates.start not work
    q = query(citiesRef, where("cityName", "==", props.cityName), where("activityEnd", ">", new Date().getTime()));

    const data = await getDocs(q);
    querySnapshot = data.docs.filter(doc => doc.id !== props.activityId);
  }else { // інакше показую всі активності
    q = query(citiesRef, where("activityEnd", ">", new Date().getTime()));
    querySnapshot = await getDocs(q);
  }

  querySnapshot.forEach((doc: any) => {
    const activity: IActivityData = {
      id: doc.id,
      mainPhotoRef: doc.data().mainPhotoRef,
      name: doc.data().name,
      cityAdmin: doc.data().cityAdmin,
      cityName: doc.data().cityName,
      streetName: doc.data().streetName,
      houseNumber:  doc.data().houseNumber,
      category: doc.data().category,
      activityDates: doc.data().activityDates,
      activityEnd: doc.data().activityEnd
    };
    activitiesData.push(activity);
  });
}

onBeforeMount(async () => {
  await getActivities();
})
</script>

<template>
  <div class="_container">
    <h2 class="other-activities-title" v-if="props.cityName !== '' && activitiesData.length > 0">Other activities in {{props.cityName}}</h2>
    <div class="cards-container" v-if="activitiesData.length > 0">
      <activity-component  v-for="activity in activitiesData" :key="activity.id"
          :activityId="activity.id"
          :mainPhotoRef="activity.mainPhotoRef"
          :name="activity.name"
          :cityAdmin="activity.cityAdmin"
          :cityName="activity.cityName"
          :streetName="activity.streetName"
          :houseNumber="activity.houseNumber"
          :category="activity.category"
          :activityDates="activity.activityDates"
      />
    </div>
    <div v-else>
      <page-loader-component></page-loader-component>
    </div>
  </div>
</template>

<style scoped>
.other-activities-title{
  margin-top: 5px;
  margin-bottom: -12px;
  display: flex;
  justify-content: center;
}

.cards-container{
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>