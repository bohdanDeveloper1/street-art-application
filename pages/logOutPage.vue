<template>
<div>
</div>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { useAddCommentStore } from "~/stores/addComment";

const router = useRouter();
const addCommentStore = useAddCommentStore();

function logOut(){
  const auth = getAuth();
  resetCookies();
  signOut(auth).then(() => {
    addCommentStore.isUser = false;
    addCommentStore.showAddCommentComponent = false;
    router.push('/userComponent');
  }).catch((error) => {
    // An error happened.
    console.error('Sign out error:', error);
  });
}

function resetCookies(){
  const userUidCookie = useCookie('userUidCookie');
  const userEmailCookie = useCookie('userEmailCookie');
  const userNameCookie = useCookie('userNameCookie');
  const userRoleCookie = useCookie('userRoleCookie');
  userUidCookie.value = null;
  userEmailCookie.value = null;
  userNameCookie.value = null;
  userRoleCookie.value = null;
}

onBeforeMount(() => {
  logOut();
})
</script>

<style scoped>

</style>