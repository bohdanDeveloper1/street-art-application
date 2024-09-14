import { defineStore } from 'pinia';


interface IDateList{
    dateStart: Date,
    dateEnd: Date,
    timeStart: object | null,
    timeEnd: object | null,
}

export const useDateListStore = defineStore('dateList', () => {
    const datesList = reactive<IDateList[]>([]);

    return { datesList };
});
