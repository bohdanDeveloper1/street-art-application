// тут пишу функції, які потім хочу використовувати багато разів у різних компонентах
export const useUtils = () => {
    function sayHello(){
        console.log("Hello");
    }

    return {
        sayHello,
    }
}