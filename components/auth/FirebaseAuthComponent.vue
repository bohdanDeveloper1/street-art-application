<template>
  <div class="_container">
   <div class="auth-component-container">
     <div class="auth-options">
       <div class="log-in-option">
         <a href="#" class="log-in-link" :class="{ activeLink: ifLogInComponentActive }" @click="changeComponentToLogin"><p>Log in</p></a>
       </div>
       <div class="auth-option">
         <a href="#" class="auth-link" :class="{ activeLink: ifAuthComponentActive }" @click="changeComponentToAuth"><p>Create an account</p></a>
       </div>
     </div>
     <div class="current-component">
       <div class="log-in-component" v-if="ifLogInComponentActive">
         <auth-log-in-component></auth-log-in-component>
       </div>
       <div class="authorization-component"  v-if="ifAuthComponentActive">
         <auth-authorization-component></auth-authorization-component>
       </div>
     </div>
   </div>
  </div>
</template>

<script setup>
const ifLogInComponentActive = ref(true);
const ifAuthComponentActive = ref(false);

function changeComponentToAuth(){
  ifLogInComponentActive.value = false;
  ifAuthComponentActive.value = true;
}

function changeComponentToLogin(){
  ifLogInComponentActive.value = true;
  ifAuthComponentActive.value = false;
}
</script>

<style scoped>
.auth-component-container{
  margin: 60px auto 0;
  width: 700px;
  height: 400px;
  background-color: white;
  border-radius: 15px;
  padding: 35px 15px 15px 15px;

  -webkit-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 42px -20px rgba(66, 68, 90, 1);
}
@media (max-width: 780px) {
  .auth-component-container{
    width: 85vw;
  }
}
@media (max-width: 394px) {
  .auth-component-container{
    height: 450px;
  }
}

.auth-options{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

 .log-in-link, .auth-link{
   color: black;
 }

 .activeLink{
   font-weight: 700;
 }
</style>