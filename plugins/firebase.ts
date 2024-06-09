import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from  "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp (додавання до цілого nuxtApp бібліотеки)
    const firebaseConfig = {
        apiKey: "AIzaSyCTuLA5ZGlb5pHU7EmwzOYtA4s7cqN7aow",
        authDomain: "street-art-app-af214.firebaseapp.com",
        projectId: "street-art-app-af214",
        storageBucket: "street-art-app-af214.appspot.com",
        messagingSenderId: "864039924855",
        appId: "1:864039924855:web:c8477dafeac0360ec8c272",
        measurementId: "G-M94Q8L2MLY"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const firestore = getFirestore(app);
    const storage = getStorage(app);

    nuxtApp. vueApp . provide ( 'auth' , auth)
    nuxtApp. provide ( 'auth' , auth )

    nuxtApp. vueApp . provide ( 'firestore' , firestore)
    nuxtApp. provide ( 'firestore' , firestore)

    nuxtApp. vueApp . provide ( 'storage' , storage)
    nuxtApp. provide ( 'storage' , storage)
})