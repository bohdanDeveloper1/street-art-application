<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import {useDateListStore} from "~/stores/datesList";

const props = defineProps<{
  dateStart: Date,
  dateEnd: Date,
  timeStart: object | null,
  timeEnd: object | null,
}>();
const dateListStore = useDateListStore();
const datesList = dateListStore.datesList;
const localTimeStart = ref();
const localTimeEnd = ref();
// emits
const emit = defineEmits<{
  (e: 'changeLocalTimeStart', dateStart: Date, dateEnd: Date, newLocalTimeStart: object): void;
  (e: 'changeLocalTimeEnd', dateStart: Date, dateEnd: Date, newLocalTimeStart: object ): void;
  (e: 'deleteActivityDay',  dateStart: Date, dateEnd: Date, timeStart: object | null, timeEnd: object | null ): void;
}>()

function deleteActivityDay(){
  emit('deleteActivityDay', props.dateStart, props.dateEnd, props.timeStart, props.timeEnd);
}

function setNewEndDate(){
  if (localTimeStart.value && localTimeEnd.value){
    if(
        (localTimeStart.value.hours > localTimeEnd.value.hours) ||
        (localTimeStart.value.hours === localTimeEnd.value.hours && localTimeStart.value.minutes >= localTimeEnd.value.minutes)
    ){
      if(props.dateStart.getDate() === props.dateEnd.getDate()){
        const index = datesList.findIndex(item => (item.dateStart === props.dateStart));

        const dateEnd: number = datesList[index].dateEnd.getDate();
        datesList[index].dateEnd = new Date(datesList[index].dateEnd.setDate(dateEnd + 1));
      }
    }else{
      if(props.dateEnd.getDate() - props.dateStart.getDate() === 1){
        const index = datesList.findIndex(item => (item.dateStart === props.dateStart));

        const dateEnd: number = datesList[index].dateEnd.getDate();
        datesList[index].dateEnd = new Date(datesList[index].dateEnd.setDate(dateEnd - 1));
      }
    }
  }
}

watch(() => props.timeStart, (newTimeStart) => {
  localTimeStart.value = newTimeStart;
});

watch(() => props.timeEnd, (newTimeEnd) => {
  localTimeEnd.value = newTimeEnd;
});

watch(localTimeStart, (newLocalTimeStart) => {
  emit('changeLocalTimeStart', props.dateStart, props.dateEnd, newLocalTimeStart)
  setNewEndDate();
})

watch(localTimeEnd, (newLocalTimeEnd) => {
  emit('changeLocalTimeEnd', props.dateStart, props.dateEnd, newLocalTimeEnd)
  setNewEndDate();
})
</script>

<template>
  <div class="chosen-day roboto-light">
    <div class="card-content">
      <div class="time-pickers">
        <div class="time-picker time-picker-start">
          {{props.dateStart.toDateString()}}
          <VueDatePicker placeholder="Start" v-model="localTimeStart" time-picker />
        </div>
        <div class="time-picker">
          {{props.dateEnd.toDateString()}}
          <VueDatePicker placeholder="End" v-model="localTimeEnd" time-picker />
        </div>
      </div>
    </div>
    <div class="close-icon" @click="deleteActivityDay">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
        <path fill="gray" d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.chosen-day{
  position: relative;
  margin-bottom: 8px;
  padding: 16px 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
}

.close-icon{
  position: absolute;
  top: 16px;
  right: 8px;
}

.time-pickers{
  display: flex;
}

.time-picker{
  max-width: 160px;
}

.time-picker-start{
  margin-right: 12px;
}
</style>