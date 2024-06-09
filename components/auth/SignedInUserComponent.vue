<!-- Profile COMPONENT -->
<!-- todo: перевірити роль користувача. Якщо звичайний користувач: Welcome to street-art application ...  -->
<!-- якщо користувач має роль artist, то: показати форму з полями: artist foto, kategoria, miasto, informacja o sobie (co on robi, jak długo się tym zajmuje ...), dodatkowe foto (max 10)  -->
<template>
<div class="_container">
<div class="content">
  <h2>Hello {{userNameCookie}}!</h2>
</div>
</div>
</template>

<script setup lang="ts">
const userUidCookie = useCookie('userUidCookie');
const userEmailCookie = useCookie('userEmailCookie');
const userNameCookie = useCookie('userNameCookie');
const userRoleCookie = useCookie('userRoleCookie');
</script>

<style scoped>
.content{
  margin: 34px;
  display: flex;
  justify-content: center;
}
</style>