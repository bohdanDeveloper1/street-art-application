<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import {useField, useForm} from "vee-validate";
import { doc, setDoc } from "firebase/firestore";


const auth = getAuth();
const { $firestore } = useNuxtApp();
const uppercaseRegex = /[A-Z]/; // Велика літера
const lowercaseRegex = /[a-z]/; // Мала літера
const digitRegex = /\d/; // Цифра
const isAccountCreatedSuccessfully = ref(false);

// validation rules
const { handleSubmit } = useForm({
  validationSchema: {
    name (value: string) {
      if (value?.length >= 3 && value?.length <= 20) return true

      return 'Name should be more than 3 and less than 20 characters.'
    },
    email (value: string) {
      if (/.+@.+\..+/.test(value)) return true

      return 'Please enter valid email.'
    },
    password(value: string) {
      if (value?.length >= 8 && uppercaseRegex.test(value) && lowercaseRegex.test(value) && digitRegex.test(value)){
        return true;
      }

      return 'Password must have: uppercase letter, lowercase letter, one digit, min 8 characters';
    }

  },
})
const name = useField('name');
const email = useField('email');
const password = useField('password');
const userRole = ref('user');
const errorMessage = ref('');
const isProblemWithAccountCreating = ref(false);
const submit = handleSubmit(async (values) =>{
  await createAccount();
})
const isLoading = ref(false);

async function createAccount() {
  try {
    isLoading.value = true;
    // Створення користувача з email та паролем
    const userCredential = await createUserWithEmailAndPassword(auth, email.value.value, password.value.value);

    // Відправлення листа для підтвердження email
    await sendEmailVerification(auth.currentUser);

    // Оновлення стану про успішне створення акаунту
    isProblemWithAccountCreating.value = false;
    isAccountCreatedSuccessfully.value = true;

    // Отримую користувача
    const user = userCredential.user;

    // Додаю користувача до бази даних
    await addUserToDataBase(user);
    isLoading.value = false;
  } catch (error) {
    isProblemWithAccountCreating.value = true;
    errorMessage.value = error.message;
    isLoading.value = false;
  }
}

async function addUserToDataBase(user) {
  await setDoc(doc($firestore, "users", user.uid), {
    name: name.value.value,
    role: userRole.value,
  });
}
</script>

<template>
  <div class="_container">
    <div class="form-container" v-if="!isAccountCreatedSuccessfully">
      <!--  Alert problem with account creating  -->
      <v-alert
          v-if="isProblemWithAccountCreating"
          title="Account was`t created"
          :text="errorMessage"
          type="error"
          class="alert-error"
      ></v-alert>
      <form>
        <!--  Name -->
        <div class="form-item-container">
          <v-text-field
              v-model="name.value.value"
              :counter="20"
              :error-messages="name.errorMessage.value"
              label="Name"
              variant="solo"
              density="compact"
          ></v-text-field>
        </div>

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

        <!-- Radio -->
        <v-radio-group v-model="userRole" inline>
          <v-radio label="user account" value="user"></v-radio>
          <v-radio label="artist account" value="artist"></v-radio>
        </v-radio-group>

        <!-- Submit -->
        <v-btn
            :loading="isLoading"
            class="me-4 submit-button"
            type="submit"
            @click="submit"
        >
          create an account
        </v-btn>
      </form>
    </div>
    <div class="account-created-container" v-else>
      <div class="account-created-img-container">
        <img class="email-icon" src="/images/emailIcon.png" alt="email verification">
      </div>
      <h2>Verify your e-mail to log in.</h2>
      <h5>We sent an e-mail with a confirmation link.</h5>
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

.account-created-container{
  margin: 25px auto 0 auto;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
}

.account-created-img-container{
  margin-bottom: 20px;
}

.email-icon{
  width: 150px;
  height: 150px;
}
</style>