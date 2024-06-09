<template>
  <div>
    <!-- not auth user component  -->
    <div class="not-auth-user-info" v-if="!userRoleCookie">
      <auth-firebase-auth-component></auth-firebase-auth-component>
    </div>
    <!-- auth user component  -->
    <div v-if="userRoleCookie">
    <auth-signed-in-user-component></auth-signed-in-user-component>
    </div>
  </div>
</template>

<script setup lang="ts">
const userRoleCookie = useCookie('userRoleCookie');
</script>