<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {useDateListStore} from "~/stores/datesList";

// date contain only start date and end date
const date = ref<Date[] | null>([]);
// datesList - зберігає всі дані про активність:  IDateList
const dateListStore = useDateListStore();
const datesList = dateListStore.datesList;
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
// time variables
const timeStart = ref();
const timeEnd = ref();

function getDatesBetween(start: Date, end: Date){
  const currentDate = new Date(start);

  while (currentDate <= end) {
    datesList.push({
      dateStart: new Date(currentDate),
      dateEnd: new Date(currentDate),
      timeStart: null,
      timeEnd: null,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function deleteActivityDay(dateStart: Date, dateEnd: Date, timeStart: object | null, timeEnd: object | null) {
  const index = datesList.findIndex(item => (item.dateStart === dateStart && item.dateEnd === dateEnd && item.timeStart === timeStart && item.timeEnd === timeEnd));
  if (index !== -1) {
    datesList.splice(index, 1);
  }
}

function changeLocalTimeStart(dateStart: Date, dateEnd: Date, newLocalTimeStart: object) {
  datesList.forEach((item) => {
    if(item.dateStart === dateStart && item.dateEnd === dateEnd){
      item.timeStart = newLocalTimeStart;
    }
  })
}

function changeLocalTimeEnd(dateStart: Date, dateEnd: Date, newLocalTimeEnd: object) {
  datesList.forEach((item) => {
    if(item.dateStart === dateStart && item.dateEnd === dateEnd){
      item.timeEnd = newLocalTimeEnd;
    }
  })
}

watch(date, (newDate) => {
  if (!newDate) {
    startDate.value = null;
    endDate.value = null;

    timeStart.value = null;
    timeEnd.value = null;

    datesList.length = 0;

    return;
  }

  startDate.value = newDate[0];
  if(newDate[1]){
    endDate.value = newDate[1];
  }else{ // add only date and time start
    datesList.push({
      dateStart: new Date(newDate[0]),
      dateEnd: new Date(newDate[0]),
      timeStart: null,
      timeEnd: null
    });
  }

  if(startDate.value && endDate.value){
    getDatesBetween(newDate[0], newDate[1]);
  }
});

// change timeStart for each day
watch(timeStart, (newTimeStart) =>{
  datesList.forEach((item) => {
    item.timeStart = newTimeStart;
  })
})

// change timeEnd for each day
watch(timeEnd, (newTimeEnd) =>{
  datesList.forEach((item) => {
    item.timeEnd = newTimeEnd;
  })
})
</script>

<template>
  <div>
    <div>
      <VueDatePicker v-model="date" :min-date="new Date()" placeholder="Date start - date end" :range="{ partialRange: true }" :enable-time-picker="false" />
      <div class="time-pickers-container" v-if="date != null && date.length > 0">
        <div class="time-picker">
          <VueDatePicker placeholder="Start for each date" v-model="timeStart" time-picker />
        </div>
        <div class="time-picker">
          <VueDatePicker placeholder="End for each date" v-model="timeEnd" time-picker />
        </div>
      </div>
      <div>
        <ul class="chosen-days">
          <li v-for="item in datesList" :key="item.dateStart.toDateString()">
            <add-activity-picked-day-component
                @changeLocalTimeStart="changeLocalTimeStart"
                @changeLocalTimeEnd="changeLocalTimeEnd"
                @deleteActivityDay="deleteActivityDay"
                :date-start="item.dateStart"
                :date-end="item.dateEnd"
                :time-start="item.timeStart"
                :time-end="item.timeEnd"
            >
            </add-activity-picked-day-component>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chosen-days{
  padding: 0;
}

.time-pickers-container{
  margin: 8px 0 16px 0;
  display: flex;
  justify-content: space-between;
}

.time-picker{
  max-width: 44%;
}
</style>