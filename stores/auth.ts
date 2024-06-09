// import { defineStore } from 'pinia';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { ref, watch, onMounted } from 'vue';
// import { useNuxtApp } from '#imports';
//
// export const useAuthStore = defineStore('auth', () => {
//     const auth = getAuth();
//     const { $firestore } = useNuxtApp();
//     const isUserLoggedIn = ref<boolean>();
//     const userUid = ref<string>();
//     const userData = ref();
//
//     async function getUserData(){
//         const docRef = doc($firestore, "users", userUid.value);
//         const docSnap = await getDoc(docRef);
//
//         if (docSnap.exists()) {
//             userData.value = docSnap.data();
//             console.log(userData.value.role)
//         } else {
//             console.log("User does`t exist");
//             userData.value = undefined;
//         }
//     }
//
//     // якщо користувач залогований, беру його дані з DB
//     watch(isUserLoggedIn, async (newIsUserLoggedIn: boolean | undefined): Promise<void> => {
//         if (newIsUserLoggedIn) {
//             // get user info from DB
//             await getUserData();
//         }
//     })
//
//     // перевіряю чи користувач залогований
//     onMounted(() => {
//         onAuthStateChanged(auth, async (user) => {
//             if (user && user.emailVerified) {
//                 isUserLoggedIn.value = true;
//                 userUid.value = user.uid;
//                 await getUserData();
//             } else {
//                 isUserLoggedIn.value = false;
//             }
//         });
//     })
//
//     return { isUserLoggedIn, userData };
// });
