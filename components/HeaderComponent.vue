<template>
<div>
  <div class="header">
    <div class="header__container _container">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <NuxtLink to="/" class="navbar-brand">Street art</NuxtLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav  w-100">
                <!--              <li class="nav-item" v-if="userRole">-->
                <!--                <NuxtLink to="/savedActivitiesPage" class="nav-link">Saved activities</NuxtLink>-->
                <!--              </li>-->
              <li class="nav-item dropdown" v-if="userRole === 'artist'">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Your activities
                </a>
                <ul class="dropdown-menu">
                  <li><NuxtLink to="/admin/myActivities" class="dropdown-item">My activities</NuxtLink></li>
                  <li><NuxtLink to="/admin/addActivity" class="dropdown-item">Add activity</NuxtLink></li>
                </ul>
              </li>
              <!--  PROFILE  -->
              <li class="nav-item max-right" v-if="userRole">
                <NuxtLink to="/userComponent" class="nav-link">
                <img src="/images/userIcon.svg" alt="user">
                </NuxtLink>
              </li>
              <li class="nav-item" v-if="!userRole">
                <NuxtLink to="/userComponent" class="nav-link">Log in</NuxtLink>
              </li>
              <li class="nav-item" v-if="userRole">
                <NuxtLink to="/logOutPage" class="nav-link">Log out</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const userRoleCookie = useCookie('userRoleCookie');
const userRole = ref(userRoleCookie.value);

watch(userRoleCookie, (newUserRoleCookie) => {
  userRole.value = newUserRoleCookie;
})
</script>

<style scoped>
.header{
  background-color: black;
}

.navbar{
  display: flex;
  align-items: center;
  min-height: 80px;
}

.navbar-nav .nav-link{
  color: lightgray;
  font-size: 20px;
}

.nav-link{
  margin-top: 3px;
}

.navbar-brand{
  color: white;
  font-size: 25px;
}

.navbar-nav .nav-link:hover{
  color: white;
}

.navbar-toggler {
  background-color: lightgray;
}

.max-right {
  margin-left: auto;
}@media (max-width: 993px) {
  .max-right{
    margin-left: 0;
  }
}
</style>