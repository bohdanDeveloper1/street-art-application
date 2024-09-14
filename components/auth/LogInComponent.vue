<script setup>
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useField, useForm} from "vee-validate";
import {doc, getDoc} from "firebase/firestore";
import { useAddCommentStore } from "~/stores/addComment";

const { $firestore } = useNuxtApp();
const router = useRouter();
const addCommentStore = useAddCommentStore();

// regex validation
const uppercaseRegex = /[A-Z]/; // Велика літера
const lowercaseRegex = /[a-z]/; // Мала літера
const digitRegex = /\d/; // Цифра

// validation rules
const { handleSubmit } = useForm({
  validationSchema: {
    email (value) {
      if (/.+@.+\..+/.test(value)) return true

      return 'Please enter valid email.'
    },
    password(value) {
      if (value?.length < 8 || !uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value)){
        return 'Password must have: uppercase letter, lowercase letter, one digit, min 8 characters';
      }

      return true;
    }
  },
})
const email = useField('email');
const password = useField('password');
const loginErrorMessage = ref('');
const isProblemWithLogIn = ref(false);
const isLoading = ref(false);

const submit = handleSubmit(async (values) =>{
  await logIn();
})

async function logIn(){
  try{
    isLoading.value = true;
    const auth = getAuth();

    // sign in
    const userCredential = await signInWithEmailAndPassword(auth, email.value.value, password.value.value);
    const user = userCredential.user;

    // якщо користуач створив акаунт та підтвердив мейл
    if (user && user.emailVerified === true) {
      isProblemWithLogIn.value = false;
      loginErrorMessage.value = '';

      // отримую роль користувача
      const userData = await getUserData(user.uid);

      // set cookies
      const userUidCookie = useCookie('userUidCookie');
      const userEmailCookie = useCookie('userEmailCookie');
      const userNameCookie = useCookie('userNameCookie');
      const userRoleCookie = useCookie('userRoleCookie');
      userUidCookie.value = user.uid;
      userEmailCookie.value = user.email;
      userNameCookie.value = userData.name;
      userRoleCookie.value = userData.role;

      if(addCommentStore.logInDuringAddingComment){
        addCommentStore.showFirebaseAuthComponent = false;
        addCommentStore.showAddCommentComponent = true;
      }else {
        await router.push('/');
        isLoading.value = false;
      }
    }
    //  якщо користуач створив акаунт та не підтвердив мейл
    else if (user && user.emailVerified === false) {
      signOut(auth).then(() => {
        isProblemWithLogIn.value = true;
        loginErrorMessage.value = 'Please verify your e-mail to log in';
        isLoading.value = false;
      });
    }else{
      signOut(auth).then(() => {
        isProblemWithLogIn.value = true;
        loginErrorMessage.value = 'Invalid e-mail or password';
      }).catch((error) => {
        // An error happened.
        console.error('Sign out error:', error);
        isLoading.value = false;
      });
    }
  }catch (error){
    console.log(error);
    isProblemWithLogIn.value = true;
    loginErrorMessage.value = 'Invalid e-mail or password';
    isLoading.value = false;
  }
}

async function getUserData(userUid){
  const docRef = doc($firestore, "users", userUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log("User does`t exist");
    return null;
  }
}
</script>

<template>
  <div class="_container">
    <v-alert
        v-if="isProblemWithLogIn"
        title="Log in failed"
        :text="loginErrorMessage"
        type="error"
        class="alert-error"
    ></v-alert>
    <div class="form-container">
      <form>
        <!--  E-mail -->
        <div class="form-item-container">
          <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
              variant="solo"
              density="compact"
          ></v-text-field>
        </div>

        <!--  Password -->
        <div class="form-item-container">
          <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              type="password"
              label="Password"
              variant="solo"
              density="compact"
          ></v-text-field>
        </div>

        <!-- Submit -->
        <v-btn
            :loading="isLoading"
            class="me-4 submit-button"
            type="submit"
            @click="submit"
        >

          log in
        </v-btn>
      </form>
    </div>
  </div>
</template>

<style scoped>
.submit-button{
  background: #000;
  color: white;
}

.alert-error{
  margin-bottom: 18px;
}
</style>